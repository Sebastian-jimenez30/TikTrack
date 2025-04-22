import { NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET() {
  try {
    const data = await userController.getAllUsers(); // Llamamos al controlador para obtener los usuarios
    return NextResponse.json(data.pageData); // Asegúrate de devolver solo pageData
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      users: null,
      message: "Error al obtener los usuarios",
      is_success: false,
    });
  }
}
