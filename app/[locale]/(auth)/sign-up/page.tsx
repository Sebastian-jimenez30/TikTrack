import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import AuthenticationCard from "~/app/components/cards/authentication.card";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import axios from "axios";
import Image from "next/image";
export default function SignUpPage() {
  async function handleSignUp(formData: FormData): Promise<{ error?: string }> {
    "use server";

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const locale = await getLocale();

    const pageData = (
      await axios.post(ROUTES_API.SIGN_UP, {
        email: email,
        password: password,
        username: username,
        locale,
      })
    ).data.pageData;

    if (!pageData.is_success) {
      return { error: pageData.message };
    } else {
      if (pageData.token) {
        (await cookies()).set("authToken", pageData.token, {
          httpOnly: true,
          path: "/",
        });
      }
      redirect(ROUTES.HOME);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center mx-[30px]">
      <div className="w-full md:w-1/2 flex justify-center items-center md:my-0 my-5">
        <AuthenticationCard type="sign-up" onSubmit={handleSignUp} />
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/authentication/women.png"
          alt="home"
          width={2581}
          height={2872}
          priority={true}
          className="w-100 h-fit mask-fade-bottom max-w-full"
        />
      </div>
    </div>
  );
}
