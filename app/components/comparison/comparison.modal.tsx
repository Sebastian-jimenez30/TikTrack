"use client";

import { useTranslations } from "next-intl";

interface ComparisonData {
  username: string;
  profileName: string;
  followers: string;
  engagementRate: number;
  averageLikes: string;
  averageComments: string;
  averageShares: string;
  averageViews: string;
}

interface ComparisonModalProps {
  data: ComparisonData[];
  onClose: () => void;
}

export default function ComparisonModal({ data, onClose }: ComparisonModalProps) {
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
                  <th className="p-3 font-semibold">{t("metric")}</th>
                  {data.map((influencer) => (
                    <th key={influencer.username} className="p-3 font-semibold">
                      {influencer.profileName}
                      <div className="text-sm text-gray-500">
                        @{influencer.username}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">{t("followers")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.followers}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("engagementRate")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.engagementRate}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageLikes")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.averageLikes}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageComments")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.averageComments}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageShares")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.averageShares}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3">{t("averageViews")}</td>
                  {data.map((inf) => (
                    <td key={inf.username} className="p-3">
                      {inf.averageViews}
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