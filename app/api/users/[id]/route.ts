import { NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Asegúrate de que `params.id` esté disponible
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
    }

    // Llama al controlador
    const { message, user } = await userController.getUserById(Number(id));

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Devuelve la respuesta usando NextResponse
    return NextResponse.json({ message, user }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al obtener el usuario";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}