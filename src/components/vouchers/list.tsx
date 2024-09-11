"use client";

import React from "react";
import useSWR from "swr";

type VoucherProps = {
  id: string;
  description: string;
  amount: number;
  kind: string;
  issuer: {
    id: string;
    email: string;
    name: string;
    surname: string;
  };
  createdAt: Date;
};

// import { Container } from './styles';

const VoucherList: React.FC = () => {
  const { data, error, isLoading } = useSWR<VoucherProps[]>(
    "/api/vouchers",
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data?.map((voucher) => (
        <li key={voucher.id}>{voucher.description}</li>
      ))}
    </ul>
  );
};

export default VoucherList;
