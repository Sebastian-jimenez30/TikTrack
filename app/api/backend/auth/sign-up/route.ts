import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/interface-adapters/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const username = body?.username;
    const email = body?.email;
    const password = body?.password;
    const locale = body?.locale || "en";

    const data = await authController.signUp(email, password, username, locale);

    return NextResponse.json({ pageData: data }, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        pageData: {
          token: null,
          message: errorMessage,
          is_success: false,
        },
      },
      { status: 200 }
    );
  }
}

