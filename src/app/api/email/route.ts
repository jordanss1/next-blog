import { ConnectDB } from '@/lib/config/db';
import EmailModel, { EmailType } from '@/lib/models/EmailModel';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import writeToLog from '../utils/writeToLog';

export const GET = async (req: NextRequest) => {
  await ConnectDB();

  try {
    const emails = await EmailModel.find({});

    return NextResponse.json({ emails }, { status: 200 });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json(
      { error: "Couldn't find emails" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await ConnectDB();

  const email = (await req.formData()).get('email') as string;

  if (!email)
    return NextResponse.json({ error: 'Email not valid' }, { status: 400 });

  try {
    await EmailModel.create<EmailType>({ email });

    revalidateTag('emails');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json(
      { error: "Couldn't add email address" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  await ConnectDB();

  const _id = req.nextUrl.searchParams.get('_id');

  if (!_id) {
    return NextResponse.json(
      { error: 'Request must include email ID' },
      { status: 400 }
    );
  }

  try {
    const deleted = await EmailModel.findByIdAndDelete(_id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog not found or already deleted' },
        {
          status: 404,
        }
      );
    }

    revalidateTag('emails');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    let logError = JSON.stringify(err);

    if (err instanceof Error) {
      logError = `${err.stack} ${err.message}`;
    }

    writeToLog(logError, true);

    return NextResponse.json(
      { error: 'Failed to delete email - error' },
      { status: 500 }
    );
  }
};
