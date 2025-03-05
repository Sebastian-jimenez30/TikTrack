import { JSX } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "~/i18n/routing";
import MapPinIcon from "~/app/components/icons/location.icon";
import ROUTES from "~/constants/urls";

interface InfluencerCardProps {
  username: string;
  profilePicture: string;
  city: string;
  engagementVisualizationRate: number;
  totalFollowers: string;
  updatedAt: string;
}

export default function InfluencerCard({
  username,
  profilePicture,
  city,
  engagementVisualizationRate,
  totalFollowers,
  updatedAt,
}: InfluencerCardProps): JSX.Element {
  const t = useTranslations("Cards");
  return (
    <div className="w-80 bg-white border border-gray-200 shadow-sm transform transition duration-300 hover:scale-105 mx-2 my-2">
      <Link
        href={{
          pathname: `${ROUTES["INFLUENCERS_DETAIL"]}`,
          params: { username: username },
        }}
      >
        <div className="flex flex-col items-center pb-10">
          <div className="bg-purple w-full flex justify-center items-center flex-col mb-5">
            <Image
              src={profilePicture}
              alt={username}
              width={100}
              height={100}
              className="w-24 h-24 mt-3 rounded-full shadow-lg"
              priority={true}
            />
            <b>
              <h5 className="mb-1 text-xl text-white mb-4">@{username}</h5>
            </b>
          </div>
          <div className="mb-3">
            <MapPinIcon className="text-lightPurple" /> {city}
          </div>
          <div className="w-full flex">
            <div className="flex flex-col w-1/2 items-center">
              <div className="mb-1 text-center font-bold">
                {t("influencer.EVR")}
              </div>
              <p className="bg-black p-2 sm:p-4 rounded-lg text-white w-3/4 text-center">
                {engagementVisualizationRate}%
              </p>
            </div>
            <div className="flex flex-col w-1/2 items-center">
              <div className="mb-1 text-center font-bold">
                {t("influencer.followers")}
              </div>
              <p className="bg-black p-2 sm:p-4 rounded-lg text-white w-3/4 text-center">
                {totalFollowers}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pb-3 pt-2 px-1 flex justify-center">
          <span className="text-sm text-slate-600 font-medium text-center">
            {t("influencer.lastUpdate")}: {updatedAt}
          </span>
        </div>
      </Link>
    </div>
  );
}
