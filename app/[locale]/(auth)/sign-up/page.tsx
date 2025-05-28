import ROUTES_API from "~/constants/urls/api.urls";
import AuthenticationCard from "~/app/components/cards/authentication.card";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import axios from "axios";
import Image from "next/image";
import NotificationSessionStorage from "~/app/components/notificationSessionStorage";

export async function generateMetadata() {
  const t = await getTranslations("SignUpPage");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function SignUpPage() {
  async function handleSignUp(
    formData: FormData
  ): Promise<{ error?: string; success?: string }> {
    "use server";

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const locale = await getLocale();

    const response = await axios.post(ROUTES_API.SIGN_UP, {
      email,
      password,
      username,
      locale,
    });

    const pageData = response.data.pageData;

    if (!pageData.is_success) {
      return { error: pageData.message };
    }

    if (pageData.token) {
      (await cookies()).set("authToken", pageData.token, {
        httpOnly: true,
        path: "/",
      });
    }

    return { success: pageData.message };
  }

  return (
    <div className="flex flex-wrap items-center justify-center mx-[30px]">
      <NotificationSessionStorage />
      <div className="w-full md:w-1/2 flex justify-center items-center md:my-0 my-5">
        <AuthenticationCard type="sign-up" onSubmit={handleSignUp} />
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/authentication/women.png"
          alt="sign-up"
          width={2581}
          height={2872}
          priority
          className="w-100 h-fit mask-fade-bottom max-w-full"
        />
      </div>
    </div>
  );
}
