import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { Influencer } from "@/domain/entities/influencer";

interface IndexProps {
  searchParams: { page?: string };
}

interface ShowProps {
  params: Promise<{ username: string }>;
}

class InfluencerController {
  async index({ searchParams }: IndexProps): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const resolvedParams = await searchParams;

    const { page } = resolvedParams;
    const pageNumber = page ? Number(page) : 1;

    const limit = 8;

    const pageData = await influencerUseCases.list(pageNumber, limit);

    return pageData;
  }

  async show({ params }: ShowProps): Promise<{
    influencer: Influencer | null;
    haveResults: boolean;
  }> {
    const { username } = await params;
    const pageData = await influencerUseCases.detail(username);
    return pageData;
  }
}

export const influencerController = new InfluencerController();
