"use server";

import { cookies } from "next/headers";
import { redirect } from "~/i18n/routing"; 
import ROUTES from "~/constants/urls";

export async function logout(locale: string) {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");

  redirect({ href: ROUTES.SIGN_IN, locale }); // Pasar un objeto con href y locale
}