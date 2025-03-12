import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { Influencer } from "@/domain/entities/influencer";

class HomeController {
  async index(): Promise<{
    influencers: Influencer[];
  }> {
    const pageData = await influencerUseCases.list(1, 4);
    return pageData;
  }
}

export const homeController = new HomeController();
