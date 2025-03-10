// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { authController } from "@/interface-adapters/controllers/auth.controller";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Llama al controlador
    const { message, user, token } = await authController.logIn(email, password);

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, user, token }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error en el inicio de sesión";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}