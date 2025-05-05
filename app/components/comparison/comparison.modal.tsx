"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface Influencer {
  profilePicture: string;
  username: string;
  status: string;
  followers: string;
  engagementVisualizationRate: number;
  averageComments: string;
  averageLikes: string;
  averageSaves: string;
  averageShares: string;
  averageViews: string;
}

interface ComparisonModalProps {
  influencers: Influencer[];
  onClose: () => void;
}

export default function ComparisonModal({
  influencers,
  onClose,
}: ComparisonModalProps) {
  const t = useTranslations("InfluencerComparison");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="relative mb-6">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-500 hover:text-purple text-2xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-center leading-none tracking-tight md:text-4xl lg:text-4xl">
              {t("title")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead className="bg-lightPurple">
                <tr className="border-b">
                  <th className="p-3 text-lg text-white font-semibold">
                    {t("influencer")}
                  </th>
                  {influencers.map((influencer) => (
                    <th key={influencer.username} className="p-3 font-semibold">
                      <div className="flex flex-col items-center">
                        <Image
                          src={influencer.profilePicture}
                          alt={influencer.username}
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full mb-1"
                          priority
                        />
                        <div className="text-white text-center">
                          @{influencer.username}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("status")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      <span
                        className={`mr-1 w-3 h-3 rounded-full inline-block ${
                          influencer.status === "active"
                            ? "bg-purple-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {influencer.status}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("followers")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.followers}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("engagementRate")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.engagementVisualizationRate}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("averageComments")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageComments}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("averageLikes")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageLikes}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("averageSaves")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageSaves}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("averageShares")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageShares}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="p-3">{t("averageViews")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageViews}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
