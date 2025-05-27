import ROUTES_API from "~/constants/urls/api.urls";
import { cookies } from "next/headers";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface ShowProps {
  params: { id: string; locale: string };
}

export async function generateMetadata() {
  const t = await getTranslations("ProfilePage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Show({ params }: ShowProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const t = await getTranslations("ProfilePage");

  const pathParams = await params;

  try {
    const response = await axios.get(ROUTES_API.PROFILE_SHOW, {
      params: { id: pathParams.id },
      headers: { Cookie: `authToken=${token}` },
    });

    const pageData = response.data.pageData;

    if (!pageData.user) {
      notFound();
    }

    const user = pageData.user;
    const favorites = pageData.favorites || [];

    return (
      <div className="flex justify-center flex-col items-center pb-5 md:flex-row">
        <div className="flex-[0.75] flex items-center justify-center flex-col min-h-[700px] flex-col">
          <Image
            src="/profile/influencer-animation.png"
            alt="influencer"
            width={400}
            height={400}
            priority={true}
            className="mb-5"
          />
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">{user.name}</h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t("email")}
              </label>
              <h3 className="text-base md:text-lg text-gray-800">
                {user.email}
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t("role")}
              </label>

              <h3 className="text-base md:text-lg text-gray-800">
                {user.role == "admin" ? t("roles.admin") : t("roles.user")}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="mx-auto mb-5 text-center text-lg font-semibold relative w-fit after:content-[''] after:block after:w-16 after:h-[3px] after:bg-black after:mx-auto after:mt-1">
            {t("favoritesTitle")}
          </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500">{t("noFavorites")}</p>
          ) : (
            <div className="grid gap-4 w-full max-w-5xl px-4 mx-auto">
              {favorites.map(
                (influencer: {
                  id: number;
                  username: string;
                  profileName: string;
                  profilePicture: string;
                }) => (
                  <div
                    key={influencer.id}
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded shadow-sm hover:bg-gray-200 transition"
                  >
                    <Image
                      src={influencer.profilePicture}
                      alt={influencer.username}
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-full shadow-lg"
                      priority
                    />
                    <div>
                      <Link
                        href={`/${pathParams.locale}/influencers/${influencer.username}`}
                        className="font-semibold text-purple-700 hover:underline"
                      >
                        {influencer.profileName}
                      </Link>
                      <div className="text-sm text-gray-600">
                        @{influencer.username}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
