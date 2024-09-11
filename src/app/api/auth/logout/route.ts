import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  const LOGOUT_URL = `${process.env.NEXTAUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;

  if (session) {
    // this will log out the user on Keycloak side
    const url = `${LOGOUT_URL}?id_token_hint=${
      session.id_token
    }&post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL ?? ""
    )}`;

    try {
      await fetch(url, { method: "GET" });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ status: 500 });
    }
  }
  return NextResponse.json({ status: 200 });
}
