import { getTranslations } from "next-intl/server";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

export async function validatePasswordStrength(
  password: string,
  locale: string
): Promise<{ isValid: boolean; message?: string }> {
  if (!PASSWORD_REGEX.test(password)) {
    const t = await getTranslations({ locale, namespace: "Validation" });
    return { isValid: false, message: t("passwordStrength") };
  }

  return { isValid: true };
}
