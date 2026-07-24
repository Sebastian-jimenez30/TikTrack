import { NextResponse } from "next/server";
import influencerScheduler from "@/shared/utils/influencerScheduler.util";

export async function GET() {
  if (process.env.SCRAPER_COMMANDS_ENABLED !== "true") {
    return NextResponse.json(
      { message: "Local scraper commands are disabled." },
      { status: 503 }
    );
  }

  influencerScheduler.start();
  return NextResponse.json({ message: "Job started successfully" });
}
