import ROUTES_API from "~/constants/urls/api.urls";
import UserCard from "~/app/components/cards/user.card";
import { cookies } from "next/headers";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ShowProps {
  params: { id: string, locale: string };
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
      <div className="flex flex-col items-center justify-center h-screen">
        <UserCard name={user.name} email={user.email} role={user.role} />
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{t("favoritesTitle")}</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500">{t("noFavorites")}</p>
          ) : (
            <ul className="space-y-4">
              {favorites.map((inf : {
                id: number;
                username: string;
                profileName: string;
                profilePicture: string;
              }) => (
                <li key={inf.id} className="flex items-center gap-4 bg-gray-100 p-3 rounded">
                  <img src={inf.profilePicture} alt={inf.username} className="w-10 h-10 rounded-full" />
                  <div>
                    <Link
                      href={`/${pathParams.locale}/influencers/${inf.username}`}
                      className="font-semibold text-purple-700 hover:underline"
                    >
                        {inf.profileName}
                      </Link>
                    <div className="text-sm text-gray-600">@{inf.username}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
