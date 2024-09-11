import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const url = `${process.env.BACKEND_URL}/vouchers`;

    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.access_token,
      },
    });

    if (resp.ok) {
      const data = await resp.json();
      return NextResponse.json(data, { status: resp.status });
    }

    return NextResponse.json(
      { error: await resp.text() },
      { status: resp.status }
    );
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
