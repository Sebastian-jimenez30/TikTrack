import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/interface-adapters/controllers/auth.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email = body?.email;
  const password = body?.password;

  const data = await authController.logIn(email, password);

  return NextResponse.json(data);
}
