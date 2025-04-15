import { userController } from "@/interface-adapters/controllers/user.controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const userId = searchParams.get("userId") || undefined;
  let data;

  if (userId){
    data = await userController.show(parseFloat(userId));
  }
  
  return NextResponse.json(data);
}
