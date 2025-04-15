import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { InfluencerOverviewPresenter } from "@/interface-adapters/presenters/influencer/influencer.overview.presenter";

class HomeController {
  async index(): Promise<{
    pageData: Object;
  }> {
    const result = await influencerUseCases.list(1, 4);
    const influencers = result.influencers.map((influencer) => (
      InfluencerOverviewPresenter.toHttp(influencer)
    ))

    const pageData = {influencers: influencers};
    return { pageData };
  }
}

export const homeController = new HomeController();
