import AuthenticationCard from "~/app/components/cards/authentication.card";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ROUTES from "~/constants/urls/urls";
import axios from "axios";
import ROUTES_API from "~/constants/urls/api.urls";
export default function SignInPage() {
  async function handleLogin(formData: FormData): Promise<{ error?: string }> {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const pageData = (await axios.post(ROUTES_API.LOGIN, {email: email, password: password})).data.pageData;
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

  return <AuthenticationCard type="sign-in" onSubmit={handleLogin} />;
}
