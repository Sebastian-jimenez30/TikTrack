// app/api/users/update-profile/route.ts
import { NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function PUT(request: Request) {
  try {
    const { id, email, password, name } = await request.json();

    // Llama al controlador
    const { message, user } = await userController.updateProfile(Number(id), {
      email,
      password,
      name,
    });

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, user }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al actualizar el perfil";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}