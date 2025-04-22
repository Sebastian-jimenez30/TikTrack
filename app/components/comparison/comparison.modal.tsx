"use client";

import { useTranslations } from "next-intl";

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

export default function ComparisonModal({ influencers, onClose }: ComparisonModalProps) {
  const t = useTranslations("InfluencerComparison");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t("title")}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-3 font-semibold">{t("influencer")}</th>
                  {influencers.map((influencer) => (
                    <th key={influencer.username} className="p-3 font-semibold">
                      <div className="flex items-center">
                        <img src={influencer.profilePicture} alt={influencer.username} className="w-6 h-6 rounded-full mr-2" />
                        <div className="text-sm text-gray-500">
                          @{influencer.username}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">{t("status")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.status}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("followers")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.followers}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("engagementRate")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.engagementVisualizationRate}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageComments")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageComments}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageLikes")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageLikes}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageSaves")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageSaves}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageShares")}</td>
                  {influencers.map((influencer) => (
                    <td key={influencer.username} className="p-3">
                      {influencer.averageShares}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
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