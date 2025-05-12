import { getTranslations } from "next-intl/server";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

export async function validatePasswordStrength(password: string, locale: string): Promise<void> {
  if (!PASSWORD_REGEX.test(password)) {
    const t = await getTranslations({ locale, namespace: "Validation" });
    throw new Error(t("passwordStrength"));
  }
}
