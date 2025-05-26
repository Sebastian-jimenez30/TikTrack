import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import MetricCard from "~/app/components/cards/metric.card";
import RedirectButton from "~/app/components/buttons/redirect.button";
import Button from "~/app/components/buttons/button";
import Video from "~/app/components/video";
import CommentIcon from "~/app/components/icons/comment.icon";
import DiskIcon from "~/app/components/icons/disk.icon";
import EyeIcon from "~/app/components/icons/eye.icon";
import HeartIcon from "~/app/components/icons/heart.icon";
import ShareIcon from "~/app/components/icons/share.icon";
import MapPinIcon from "~/app/components/icons/location.icon";
import jwtUtil from "@/shared/utils/jwt.util";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import axios from "axios";
import { Link } from "~/i18n/routing";
import AddToFavoritesButton from "~/app/components/buttons/AddToFavoritesButton";
import InfluencerActionsClient from "~/app/components/buttons/InfluencerActionsClient";

interface ShowProps {
  params: { username: string };
}

export async function generateMetadata() {
  const t = await getTranslations("InfluencersShowPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Show({ params }: ShowProps) {
  const t = await getTranslations("InfluencersShowPage");

  const cookiesData = await cookies();
  const token = cookiesData.get("authToken")?.value;

  let isAdmin = false;
  let isAuthenticated = false;
  if (token && !(await jwtUtil.isTokenExpired(token))) {
    isAdmin = await jwtUtil.isAdmin(token);
    isAuthenticated = true;
  }

  const pathParams = await params;
  const pageData = (
    await axios.get(ROUTES_API.INFLUENCER_SHOW, {
      params: { username: pathParams.username },
      headers: { Cookie: `authToken=${token}` },
    })
  ).data.pageData;

  if (!pageData.haveResults || !pageData.influencer) {
    notFound();
  }

  const influencer = pageData.influencer;
  const isInfluencerActive = influencer.status === "active";
  const isInfluencerReported = influencer.status === "reported";
  const isInfluencerDeactivated = influencer.status === "inactive";

  const favorites = pageData.favorites || []; 
  const isFavorite = favorites.some((fav: {id: number}) => fav.id === influencer.id);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 flex items-center justify-center">
                    <Image
                      src={influencer.profilePicture}
                      alt={influencer.username}
                      width={100}
                      height={100}
                      className="w-24 h-24 mt-3 rounded-full shadow-lg"
                      priority={true}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <a className="text-black text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                      {influencer.profileName}
                    </a>
                    <a
                      href={influencer.profileUrl}
                      className="text-center border-b border-transparent hover:border-purple transition"
                    >
                      @{influencer.username}
                    </a>
                    <p className="text-black text-base font-normal leading-normal text-center">
                      <MapPinIcon className="text-lightPurple" />{" "}
                      {influencer.city} | {influencer.followers}{" "}
                      {t("followers")}
                    </p>
                  </div>
                </div>
                <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto items-center justify-center">
                  {isAuthenticated && (
                  <Link
                    href={{
                      pathname: ROUTES.MESSAGES,
                      params: { username: influencer.username },
                    }}
                    className="px-4 py-2 rounded-md font-semibold transition-all hover:bg-darkPurple bg-purple text-white cursor-pointer"
                  >
                    {t("message")}
                  </Link>
                  )}
                  {isAuthenticated && !isFavorite &&(
                  <AddToFavoritesButton
                    variant="primary"
                      redirect={ROUTES.INFLUENCERS}
                      actionUrl={ ROUTES_API.INFLUENCER_LIKE}
                      influencerId={influencer.id}
                      isFavorite={isFavorite}
                      messages={{
                        success: t("success"),
                        error: t("error"),
                        alreadyFavorite: t("alreadyFavorite"), 
                        adding: t("adding"),
                        add: t("addToFavorites"),
                      }}
                      httpMethod="post"
                  />
                  )}
                  {isAuthenticated && isFavorite && (
                     <InfluencerActionsClient
                      influencerId={influencer.id}
                      isFavorite={isFavorite}
                      messages={{
                        success: t("success"),
                        error: t("error"),
                        removing: t("removing"),
                        remove: t("removeFromFavorites"),
                      }}
                      variant="danger"
                      redirect={ROUTES.INFLUENCERS}
                      actionUrl={ROUTES_API.INFLUENCER_UNLIKE}
                    />
                  )}
                </div>
                <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto items-center justify-center">  
                  {isInfluencerActive && (
                  <>
                    {isAuthenticated && !isAdmin &&(
                      <RedirectButton
                        variant="secondary"
                        redirect={ROUTES.INFLUENCERS}
                        actionUrl={
                          ROUTES_API.INFLUENCER_REPORT + "?username=" + influencer.username
                        }
                        value={t("report")}
                        messages={{
                          success: t("success"),
                          error: t("error"),
                        }}
                      />
                    )}
                    {isAdmin && (
                      <RedirectButton
                        variant="secondary"
                        redirect={ROUTES.INFLUENCERS}
                        actionUrl={
                          ROUTES_API.INFLUENCER_DEACTIVATE + "?username=" + influencer.username
                        }
                        value={t("deactivate")}
                        messages={{
                          success: t("success"),
                          error: t("error"),
                        }}
                      />
                    )}
                  </>
                )}
                {isInfluencerReported && (
                  <>
                    {isAuthenticated && !isAdmin && (
                      <RedirectButton
                          variant="secondary"
                          redirect={ROUTES.INFLUENCERS}
                          actionUrl={
                            ROUTES_API.INFLUENCER_REMOVE_REPORT + "?username=" + influencer.username
                          }
                          value={t("removeReport")}
                          messages={{
                            success: t("success"),
                            error: t("error"),
                          }}
                        />
                    )}
                    
                    {isAdmin && (
                      <>
                        <RedirectButton
                          variant="secondary"
                          redirect={ROUTES.INFLUENCERS}
                          actionUrl={
                            ROUTES_API.INFLUENCER_ACTIVATE + "?username=" + influencer.username
                          }
                          value={t("activate")}
                          messages={{
                            success: t("success"),
                            error: t("error"),
                          }}
                        />
                        <RedirectButton
                          variant="secondary"
                          redirect={ROUTES.INFLUENCERS}
                          actionUrl={
                            ROUTES_API.INFLUENCER_DEACTIVATE + "?username=" + influencer.username
                          }
                          value={t("deactivate")}
                          messages={{
                            success: t("success"),
                            error: t("error"),
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {isInfluencerDeactivated && isAdmin && (
                  <>
                    <RedirectButton
                      variant="secondary"
                      redirect={ROUTES.INFLUENCERS}
                      actionUrl={
                        ROUTES_API.INFLUENCER_ACTIVATE + "?username=" + influencer.username
                      }
                      value={t("activate")}
                      messages={{
                        success: t("success"),
                        error: t("error"),
                      }}
                    />
                  </>
                )}

                </div>
              </div>
            </div>
            <h3 className="text-black text-lg font-bold leading-tight px-4 pb-2 pt-4">
              {t("metrics")}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <MetricCard
                icon={<HeartIcon className="text-lightPurple text-2xl" />}
                title={t("likes")}
                value={influencer.averageLikes.toString()}
              />
              <MetricCard
                icon={<CommentIcon className="text-lightPurple text-2xl" />}
                title={t("comments")}
                value={influencer.averageComments.toString()}
              />
              <MetricCard
                icon={<ShareIcon className="text-lightPurple text-2xl" />}
                title={t("shares")}
                value={influencer.averageShares.toString()}
              />
              <MetricCard
                icon={<DiskIcon className="text-lightPurple text-2xl" />}
                title={t("saves")}
                value={influencer.averageSaves.toString()}
              />
              <MetricCard
                icon={<EyeIcon className="text-lightPurple text-2xl" />}
                title={t("views")}
                value={influencer.averageViews.toString()}
              />
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-black text-base font-medium leading-normal">
                  {t("engagementVisualizationRate")}
                </p>
                <p className="text-black text-sm font-normal leading-normal">
                  {influencer.engagementVisualizationRate}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple h-2.5 rounded-full"
                  style={{
                    width: influencer.engagementVisualizationRate + "%",
                  }}
                ></div>
              </div>
            </div>
            <h3 className="text-black text-lg font-bold leading-tight px-4 pb-2 pt-4">
              {t("videos")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 p-4 place-items-center">
              {influencer.featuredVideos.map((videoId: string) => {
                return (
                  <div key={videoId}>
                    <Video id={videoId} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
