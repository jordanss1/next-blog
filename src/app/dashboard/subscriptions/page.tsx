import SubscriptionList from '@/components/dashboard/SubscriptionList';
import { EmailType, FetchResponse } from '@/types';
import React from 'react';

const page = async () => {
  let error: null | string = null;
  let emails: null | EmailType[] = null;

  const res = await fetch('http://web1:3000/api/email', {
    next: { tags: ['emails'] } as any,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    error = data.error ?? 'Could not fetch subscriptions';
  } else {
    const data = ((await res.json()) ?? null) as FetchResponse<EmailType[]>;

    if ('error' in data) {
      error = data.error;
    } else {
      emails = data.emails;
    }
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-13">
      <h1 className="text-2xl font-semibold">Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full  text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                x
              </th>
            </tr>
          </thead>
          <tbody>
            <SubscriptionList data={emails} error={error} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
