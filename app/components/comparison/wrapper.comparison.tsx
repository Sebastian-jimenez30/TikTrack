"use client";

import { useState } from "react";
import InfluencerCard from "../cards/influencer.card";
import ComparisonModal from "./modal.comparison";
import { toast } from "sonner";
import ROUTES_API from "~/constants/urls/api.urls";
import { useTranslations } from "next-intl";

interface InfluencerOverview {
  username: string;
  profilePicture: string;
  city: string;
  engagementVisualizationRate: number;
  followers: string;
  updatedAt: string;
}

export default function ComparisonWrapper({
  influencers,
}: {
  influencers: InfluencerOverview[];
}) {
  const t = useTranslations("InfluencerComparison");
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [influencerComparisonData, setInfluencerComparisonData] =
    useState(null);

  const handleInfluencerSelect = (username: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const handleCompare = async () => {
    if (selectedInfluencers.length < 2) {
      toast.error(t("selectMinimum"));
      return;
    }
    if (selectedInfluencers.length > 5) {
      toast.error(t("selectMaximum"));
      return;
    }

    try {
      const response = await fetch(
        `${ROUTES_API.INFLUENCER_COMPARE}?usernames=${selectedInfluencers.join(",")}`
      );
      const result = await response.json();

      if (result.pageData.isSuccess) {
        setInfluencerComparisonData(result.pageData.influencers);
        setShowModal(true);
      } else {
        toast.error(result.pageData.error || t("error"));
      }
    } catch {
      toast.error(t("error"));
    }
  };

  const handleComparisonModeToggle = () => {
    if (comparisonMode) {
      setSelectedInfluencers([]);
    }
    setComparisonMode(!comparisonMode);
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={handleComparisonModeToggle}
          className="mb-6 px-4 py-2 rounded bg-white text-purple border border-purple font-semibold transition-all hover:bg-gray-200"
        >
          {comparisonMode ? t("cancel") : t("compareInfluencers")}
        </button>

        {comparisonMode && selectedInfluencers.length >= 2 && (
          <button
            onClick={handleCompare}
            className="ml-2 mb-6 px-4 py-2 bg-purple text-white font-semibold rounded hover:bg-darkPurple transition"
          >
            {t("compare")}
          </button>
        )}
      </div>

      <div className="grid w-full justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-center">
        {influencers.map((influencer) => (
          <InfluencerCard
            key={influencer.username}
            {...influencer}
            comparison={comparisonMode}
            selected={selectedInfluencers.includes(influencer.username)}
            onSelect={handleInfluencerSelect}
          />
        ))}
      </div>

      {showModal && influencerComparisonData && (
        <ComparisonModal
          influencers={influencerComparisonData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
