import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token && verifyToken(token);
}