import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, name, email, password, role, status, locale } = body;

  const data = await userController.update({
    params: {
      userId: id,
      userData: {
        name,
        email,
        password,
        role,
        status,
      },
      locale,
    },
  });

  return NextResponse.json(data);
}
