import { NextResponse } from "next/server";
import influencerScheduler from "@/shared/utils/influencerScheduler.util";

export async function GET() {
  influencerScheduler.start();
  return NextResponse.json({ message: "Job started successfully" });
}
