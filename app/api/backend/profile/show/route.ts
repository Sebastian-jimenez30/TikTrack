import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";
import jwtUtil from "@/shared/utils/jwt.util";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await jwtUtil.verifyToken(token); // decoded tendrá { userId, email, role }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.userId !== Number(id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  
  const data = await userController.show({ params: { id } });
  return NextResponse.json(data);
}
