import { influencerComparisonUseCases } from "@/application/use-cases/influencer.comparison.use-case";
import { InfluencerComparisonPresenter } from "../presenters/influencer/influencer.comparison.presenter";

interface CompareProps {
  searchParams: { usernames: string[]};
}

class InfluencerComparisonController {
  async compare({ searchParams }: CompareProps): Promise<{
    pageData: {
      isSuccess: boolean;
      influencers: any;
      error?: string;
    };
  }> {
    const { usernames } = searchParams;

    if (!Array.isArray(usernames) || usernames.length < 2 || usernames.length > 5) {
      return {
        pageData: {
          isSuccess: false,
          influencers: null,
          error: "Please select between 2 and 5 influencers to compare."
        }
      };
    }

    const result = await influencerComparisonUseCases.compareInfluencers(usernames);
    
    const influencers = result.influencers.map((influencer) =>
      InfluencerComparisonPresenter.toHttp(influencer)
    );

    return {
      pageData: {
        isSuccess: result.isSuccess,
        influencers: influencers,
        error: result.error
      }
    };
  }
}

export const influencerComparisonController = new InfluencerComparisonController(); 