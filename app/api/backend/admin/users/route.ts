import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const userId = body?.userId;
  const { name, email, password, role } = body;

  if (!userId) {
    return NextResponse.json(
      { message: "Missing user ID", is_success: false },
      { status: 400 }
    );
  }

  // Llamamos al controlador para actualizar el usuario
  const data = await userController.updateUser(userId, { name, email, password, role });

  return NextResponse.json(data);
}
