import { NextRequest, NextResponse } from "next/server";
import influencerManagementService from "@/infrastructure/services/influencerManagement.service";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  if (!process.env.NEXT_PUBLIC_SEND_MESSAGE_MICROSERVICE_URL) {
    return NextResponse.json(
      { error: "The send-message service is not configured." },
      { status: 503 }
    );
  }

  const { username } = await params;
  const { message } = await req.json();

  const response = await influencerManagementService.sendMessageToInfluencer(
    username,
    message
  );

  return NextResponse.json(response);
}
