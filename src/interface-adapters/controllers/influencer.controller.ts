import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { Influencer } from "@/domain/entities/influencer";

interface IndexProps {
  searchParams: Promise<{ page?: string }>;
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
    const { page } = await searchParams;
    const pageNumber = page ? Number(page) : 1;
    const limit = 8;

    const pageData = await influencerUseCases.listWithPagination(
      pageNumber,
      limit
    );

    return pageData;
  }
}

export const influencerController = new InfluencerController();
