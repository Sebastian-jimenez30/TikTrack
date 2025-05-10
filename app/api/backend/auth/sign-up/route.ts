import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/interface-adapters/controllers/auth.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const username = body?.username;
  const email = body?.email;
  const password = body?.password;
  const locale = body?.locale || "en";

  const data = await authController.signUp(email, password, username, locale);

  return NextResponse.json(data);
}
