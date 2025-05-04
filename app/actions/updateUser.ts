"use server";

import { redirect } from "next/navigation";
import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import { cookies } from "next/headers";
import axios from "axios";

export async function updateUser(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  const status = formData.get("status");

  const token = (await cookies()).get("authToken")?.value;

  await axios.patch(
    ROUTES_API.USER_MANAGEMENT_UPDATE,
    {
      id,
      name,
      email,
      password,
      role,
      status,
    },
    {
      headers: {
        Cookie: `authToken=${token}`,
      },
    }
  );

  redirect(ROUTES.USER_MANAGEMENT_INDEX);
}
