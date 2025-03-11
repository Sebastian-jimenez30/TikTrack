import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import { getTranslations } from "next-intl/server";
import MetricCard from "~/app/components/cards/metric.card";
import CommentIcon from "~/app/components/icons/comment.icon";
import DiskIcon from "~/app/components/icons/disk.icon";
import EyeIcon from "~/app/components/icons/eye.icon";
import HeartIcon from "~/app/components/icons/heart.icon";
import ShareIcon from "~/app/components/icons/share.icon";
import Video from "~/app/components/video";
import Image from "next/image";
import MapPinIcon from "~/app/components/icons/location.icon";
import Button from "~/app/components/button";
import ROUTES from "~/constants/urls";
import { Link } from "~/i18n/routing";

interface ShowProps {
  params: Promise<{ username: string }>;
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
  const pageData = await influencerController.show({ params });

  if (!pageData.haveResults || !pageData.influencer) {
    return null;
  }

  const influencer = pageData.influencer;

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
                      src={influencer.getProfilePicture()}
                      alt={influencer.getUsername()}
                      width={100}
                      height={100}
                      className="w-24 h-24 mt-3 rounded-full shadow-lg"
                      priority={true}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <a className="text-black text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                      {influencer.getProfileName()}
                    </a>
                    <a
                      href={influencer.getProfileUrl()}
                      className="text-center border-b border-transparent hover:border-purple transition"
                    >
                      @{influencer.getUsername()}
                    </a>
                    <p className="text-black text-base font-normal leading-normal text-center">
                      <MapPinIcon className="text-lightPurple" />{" "}
                      {influencer.getCity()} |{" "}
                      {influencer.getFormattedTotalFollowers()} {t("followers")}
                    </p>
                  </div>
                </div>
                <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto items-center justify-center">
                <Link href={ROUTES["MESSAGES"]} legacyBehavior>
                  <Button href="" variant="primary">
                    <span className="truncate">{t("message")}</span>
                  </Button>
                </Link>
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
                value={influencer.getFormattedTotalLikes().toString()}
              />
              <MetricCard
                icon={<CommentIcon className="text-lightPurple text-2xl" />}
                title={t("comments")}
                value={influencer.getFormattedTotalComments().toString()}
              />
              <MetricCard
                icon={<ShareIcon className="text-lightPurple text-2xl" />}
                title={t("shares")}
                value={influencer.getFormattedTotalShares().toString()}
              />
              <MetricCard
                icon={<DiskIcon className="text-lightPurple text-2xl" />}
                title={t("saves")}
                value={influencer.getFormattedTotalSaves().toString()}
              />
              <MetricCard
                icon={<EyeIcon className="text-lightPurple text-2xl" />}
                title={t("views")}
                value={influencer.getFormattedTotalViews().toString()}
              />
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-black text-base font-medium leading-normal">
                  {t("engagementVisualizationRate")}
                </p>
                <p className="text-black text-sm font-normal leading-normal">
                  {influencer.getEngagementVisualizationRate()}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple h-2.5 rounded-full"
                  style={{
                    width: influencer.getEngagementVisualizationRate() + "%",
                  }}
                ></div>
              </div>
            </div>
            <h3 className="text-black text-lg font-bold leading-tight px-4 pb-2 pt-4">
              {t("videos")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-4 place-items-center">
              {influencer.getFeaturedVideos().map((videoId) => {
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