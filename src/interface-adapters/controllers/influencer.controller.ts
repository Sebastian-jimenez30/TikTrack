import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { Influencer } from "@/domain/entities/influencer";
import PaginationUtil from "@/interface-adapters/utils/pagination";

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
    let pageData = {
      influencers: [] as Influencer[],
      count: 0,
      start: 0,
      end: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    const { page } = await searchParams;
    const pageNumber = page ? Number(page) : 1;
    const limit = 8;

    const count = await influencerUseCases.count();
    const influencers = await influencerUseCases.list(pageNumber, limit);

    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    const hasNextPage = end < count;
    const hasPreviousPage = start > 1;

    pageData = {
      influencers,
      count,
      start,
      end,
      hasNextPage,
      hasPreviousPage,
    };

    return pageData;
  }
}

export const influencerController = new InfluencerController();
