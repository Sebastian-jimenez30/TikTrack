// app/api/users/list/route.ts
import { NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // Llama al controlador
    const { message, users, total } = await userController.listUsers(page, limit);

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, users, total }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al listar usuarios";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}