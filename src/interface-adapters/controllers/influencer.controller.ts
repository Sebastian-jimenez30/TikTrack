import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { InfluencerOverviewPresenter } from "@/interface-adapters/presenters/influencer/influencer.overview.presenter";
import { InfluencerDetailPresenter } from "@/interface-adapters/presenters/influencer/influencer.detail.presenter";

interface IndexProps {
  searchParams: { page?: string };
}

interface ShowProps {
  params: { username: string };
}

interface DeactivateProps {
  params: { username: string | null };
}

class InfluencerController {
  async index({ searchParams }: IndexProps): Promise<{
    pageData: object;
  }> {
    const resolvedParams = await searchParams;

    const { page } = resolvedParams;
    const pageNumber = page ? Number(page) : 1;

    const limit = 8;

    const result = await influencerUseCases.listActive(pageNumber, limit);

    const influencers = result.influencers.map((influencer) =>
      InfluencerOverviewPresenter.toHttp(influencer)
    );

    const pageData = {
      influencers,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };

    return { pageData };
  }

  async show({ params }: ShowProps): Promise<{
    pageData: object;
  }> {
    const { username } = await params;
    const result = await influencerUseCases.detail(username);

    let influencer = null;

    if (result.influencer) {
      const tempInfluencer = result.influencer;
      influencer = InfluencerDetailPresenter.toHttp(tempInfluencer);
    }

    const pageData = {
      influencer,
      haveResults: result.haveResults,
    };

    return { pageData };
  }

  async deactivate({ params }: DeactivateProps): Promise<{
    pageData: object;
  }> {
    const { username } = await params;
    let result;
    let pageData;
    if (!username) {
      pageData = {
        isSuccess: false,
      };
      return { pageData };
    } else {
      result = await influencerUseCases.updateStatus(username);

      const pageData = {
        isSuccess: result.isSuccess,
      };

      return { pageData };
    }
  }
}

export const influencerController = new InfluencerController();
