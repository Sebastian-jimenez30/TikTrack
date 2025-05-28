import { influencerComparisonUseCases } from "@/application/use-cases/influencer.comparison.use-case";
import { InfluencerComparisonPresenter } from "../presenters/influencer/influencer.comparison.presenter";
import { getTranslations } from "next-intl/server";
import { Status } from "@/domain/entities/influencer";
interface CompareProps {
  searchParams: { usernames: string[] };
}

class InfluencerComparisonController {
  async compare({ searchParams }: CompareProps): Promise<{
    pageData: {
      isSuccess: boolean;
      influencers:
        | {
            username: string;
            profilePicture: string;
            averageLikes: string;
            averageComments: string;
            averageShares: string;
            averageSaves: string;
            averageViews: string;
            followers: string;
            status: Status;
            engagementVisualizationRate: number;
          }[]
        | null;
      error: string | undefined;
    };
  }> {
    const t = await getTranslations("InfluencerComparison");

    const { usernames } = searchParams;

    if (
      !Array.isArray(usernames) ||
      usernames.length < 2 ||
      usernames.length > 5
    ) {
      return {
        pageData: {
          isSuccess: false,
          influencers: null,
          error: t("selectRange"),
        },
      };
    }

    const result =
      await influencerComparisonUseCases.compareInfluencers(usernames);

    const influencers = result.influencers.map((influencer) =>
      InfluencerComparisonPresenter.toHttp(influencer)
    );

    return {
      pageData: {
        isSuccess: result.isSuccess,
        influencers: influencers,
        error: result.error,
      },
    };
  }
}

export const influencerComparisonController =
  new InfluencerComparisonController();
