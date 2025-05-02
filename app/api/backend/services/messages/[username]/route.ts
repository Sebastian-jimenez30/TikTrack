import { NextRequest, NextResponse } from "next/server";
import influencerManagementService from "@/infrastructure/services/influencerManagement.service";

export async function POST(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  const { message } = await req.json();

  const response = await influencerManagementService.sendMessageToInfluencer(
    username,
    message
  );

  return NextResponse.json(response);
}
