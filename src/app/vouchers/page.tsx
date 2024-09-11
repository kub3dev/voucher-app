import AuthStatus from "@/components/auth-status";
import VoucherList from "@/components/vouchers/list";
import React from "react";

const Vouchers: React.FC = () => {
  return (
    <div>
      <AuthStatus />
      <h1>Vouchers</h1>
      <VoucherList />
    </div>
  );
};

export default Vouchers;
