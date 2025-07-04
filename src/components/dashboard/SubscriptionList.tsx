'use client';
import { EmailType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type EmailListProps = {
  data: EmailType[] | null;
  error: string | null;
};

const SubscriptionList: React.FC<EmailListProps> = ({ data, error }) => {
  const [emails, setEmails] = useState<EmailListProps['data']>(data);

  const handleDeleteEmail = async (_id: EmailType['_id']) => {
    try {
      const { status } = await axios.delete(
        `/api/email?_id=${encodeURIComponent(_id)}`
      );

      if (status === 200) {
        toast.success('Email deleted');
        setEmails(emails?.filter((email) => email._id !== _id) ?? null);
      } else {
        toast.error('Email not deleted');
      }
    } catch (err) {
      toast.error('Email not deleted');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);

  return (
    <>
      {emails ? (
        emails
          .sort(
            (emailA, emailB) =>
              new Date(emailB.date).getTime() - new Date(emailA.date).getTime()
          )
          .map((email) => (
            <SubscriptionTableItem
              key={email._id}
              handleDeleteEmail={handleDeleteEmail}
              {...email}
            />
          ))
      ) : (
        <tr className="">
          <td colSpan={4} className="text-center font-semibold">
            No subscriptions found
          </td>
        </tr>
      )}
    </>
  );
};

export const SubscriptionTableItem: React.FC<
  EmailType & { handleDeleteEmail: (_id: EmailType['_id']) => Promise<void> }
> = ({ email, date, handleDeleteEmail, _id }) => {
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email}
      </th>
      <td className="px-6 py-4 sm:block hidden">
        {new Date(date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </td>
      <td
        onClick={() => handleDeleteEmail(_id)}
        className="px-6 py-4 cursor-pointer"
      >
        x
      </td>
    </tr>
  );
};

export default SubscriptionList;
