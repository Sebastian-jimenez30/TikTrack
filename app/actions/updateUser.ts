"use server";

import ROUTES_API from "~/constants/urls/api.urls";
import { cookies } from "next/headers";
import axios from "axios";
import { getLocale } from "next-intl/server";
export async function updateUser(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  const status = formData.get("status");

  const token = (await cookies()).get("authToken")?.value;

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
