import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { Influencer } from "@/domain/entities/influencer";
class InfluencerController {
  async index(): Promise<Influencer[]> {
    const influencers = await influencerUseCases.findAll();
    return influencers;
  }
}

export const influencerController = new InfluencerController();
