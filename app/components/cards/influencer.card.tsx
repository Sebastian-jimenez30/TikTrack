"use client";

import { JSX } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "~/i18n/routing";
import MapPinIcon from "~/app/components/icons/location.icon";
import ROUTES from "~/constants/urls/urls";
import clsx from "clsx";

interface InfluencerCardProps {
  username: string;
  profilePicture: string;
  city: string;
  engagementVisualizationRate: number;
  followers: string;
  updatedAt: string;
  comparison?: boolean;
  selected?: boolean;
  onSelect?: (username: string) => void;
}

export default function InfluencerCard({
  username,
  profilePicture,
  city,
  engagementVisualizationRate,
  followers,
  updatedAt,
  comparison = false,
  selected = false,
  onSelect,
}: InfluencerCardProps): JSX.Element {
  const t = useTranslations("Cards");

  const handleCardClick = (e: React.MouseEvent) => {
    if (comparison) {
      e.preventDefault();
      onSelect?.(username);
    }
  };

  return (
    <div
      className={clsx(
        "relative w-full bg-white border shadow-sm transform transition duration-300 hover:scale-105 mx-2 my-2",
        selected ? "border-purple ring-2 ring-purple" : "border-gray-200"
      )}
    >
      {comparison && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onSelect?.(username);
          }}
          className={clsx(
            "absolute top-2 left-2 rounded-full w-6 h-6 border border-gray-300 flex items-center justify-center text-xs font-bold z-10",
            selected ? "bg-purple text-white" : "bg-white text-gray-300"
          )}
        >
          ✓
        </button>
      )}

      <Link
        onClick={handleCardClick}
        href={{
          pathname: `${ROUTES["INFLUENCERS_DETAIL"]}`,
          params: { username },
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
              priority
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
                {followers}
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
