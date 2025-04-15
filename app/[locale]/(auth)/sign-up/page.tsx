import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import AuthCard from "~/app/components/cards/authentication.card";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

export default function SignUpPage() {
  async function handleSignUp(formData: FormData): Promise<{ error?: string }> {
    "use server";

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const pageData = (
      await axios.post(ROUTES_API.SIGN_UP, {
        email: email,
        password: password,
        username: username,
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

  return <AuthCard type="sign-up" onSubmit={handleSignUp} />;
}
