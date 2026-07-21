import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
}