// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { authController } from "@/interface-adapters/controllers/auth.controller";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Llama al controlador
    const { message, user, token } = await authController.signUp(email, password, name);

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, user, token }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error en el registro";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}