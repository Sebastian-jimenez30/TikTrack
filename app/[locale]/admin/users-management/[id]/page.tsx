import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import UserForm from "~/app/components/forms/UserForm";

interface ShowProps {
  params: { id: string };
}

export async function generateMetadata() {
  const t = await getTranslations("UserManagementShowPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Show({ params }: ShowProps) {
  const t = await getTranslations("UserManagementShowPage");

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const pathParams = await params;

  const pageData = (
    await axios.get(ROUTES_API.USER_MANAGEMENT_SHOW, {
      params: { id: pathParams.id },
      headers: {
        Cookie: `authToken=${token}`,
      },
    })
  ).data.pageData;

  if (!pageData.haveResults || !pageData.user) {
    notFound();
  }

  const user = pageData.user;

  async function handleUpdateUser(
    formData: FormData
  ): Promise<{ error?: string; success?: string }> {
    "use server";

    const id = formData.get("id");
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    const status = formData.get("status");

    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    const locale = await getLocale();

    const response = await axios.patch(
      ROUTES_API.USER_MANAGEMENT_UPDATE,
      {
        id,
        name,
        email,
        password,
        role,
        status,
        locale,
      },
      {
        headers: {
          Cookie: `authToken=${token}`,
        },
      }
    );

    const pageData = response.data.pageData;

    if (!pageData.isSuccess) {
      return { error: pageData.message };
    }

    return { success: pageData.message };
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold text-purple text-center mb-4">
        {t("editTitle")}
      </h1>
      <UserForm user={user} onSubmit={handleUpdateUser} />
      <div className="text-center mt-6 flex flex-col gap-4 items-center">
        <a
          href={ROUTES.USER_MANAGEMENT_INDEX}
          className="text-gray-500 hover:text-purple transition"
        >
          {t("cancel")}
        </a>
      </div>
    </div>
  );
}
