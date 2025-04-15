import { NextResponse } from "next/server";
import { homeController } from "@/interface-adapters/controllers/home.controller";

export async function GET() {
  const data = await homeController.index();
  return NextResponse.json(data);
}
