// app/api/users/update-status/route.ts
import { NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    // Llama al controlador
    const { message, user } = await userController.updateUserStatus(Number(id), status);

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, user }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al actualizar el estado";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}