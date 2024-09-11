"use client";

import React, { PropsWithChildren } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
