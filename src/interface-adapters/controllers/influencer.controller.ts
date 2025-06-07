import { influencerUseCases } from "@/application/use-cases/influencer.use-case";
import { InfluencerOverviewPresenter } from "@/interface-adapters/presenters/influencer/influencer.overview.presenter";
import { InfluencerDetailPresenter } from "@/interface-adapters/presenters/influencer/influencer.detail.presenter";
import { Influencer, Status } from "@/domain/entities/influencer";

interface IndexProps {
  searchParams: {
    page?: string;
    city?: string;
    followers?: string;
    engagementVisualizationRate?: string;
    updatedAt?: string;
    search?: string;
  };
}

interface ShowProps {
  params: { username: string; userId?: number | null };
}

interface DisabledProps {
  searchParams: {
    page?: string;
    city?: string;
    followers?: string;
    engagementVisualizationRate?: string;
    updatedAt?: string;
    search?: string;
  };
}

interface DeactivateProps {
  params: { username: string | null };
}

interface ActivateProps {
  params: { username: string | null };
}

interface ReportProps {
  params: { username: string | null };
}

interface ReportedProps {
  searchParams: {
    page?: string;
    city?: string;
    followers?: string;
    engagementVisualizationRate?: string;
    updatedAt?: string;
    search?: string;
  };
}

interface LikeProps {
  request: { userId: number; influencerId: number };
}

interface UnlikeProps {
  request: { userId: number; influencerId: number };
}

class InfluencerController {
  async index({ searchParams }: IndexProps): Promise<{
    pageData: object;
  }> {
    const resolvedParams = await searchParams;

    const {
      page,
      city,
      followers,
      engagementVisualizationRate,
      updatedAt,
      search,
    } = resolvedParams;
    const pageNumber = page ? Number(page) : 1;

    const limit = 8;
    let result;

    if (search)
      result = await influencerUseCases.search(
        search,
        pageNumber,
        limit,
        "active"
      );
    else if (city || followers || engagementVisualizationRate || updatedAt) {
      const filters = {
        city,
        followers,
        engagementVisualizationRate,
        updatedAt,
        status: "active" as Status,
      };
      result = await influencerUseCases.filter(filters, pageNumber, limit);
    } else {
      result = await influencerUseCases.listActive(pageNumber, limit);
    }

    const influencers = result.influencers.map((influencer) =>
      InfluencerOverviewPresenter.toHttp(influencer)
    );

    const filters = Influencer.getFilters();

    const pageData = {
      influencers,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      filters,
      search,
    };

    return { pageData };
  }

  async show({ params }: ShowProps): Promise<{
    pageData: object;
  }> {
    const { username, userId } = await params;
    const result = await influencerUseCases.detail(username);

    let influencer = null;

    if (result.influencer) {
      const tempInfluencer = result.influencer;
      influencer = InfluencerDetailPresenter.toHttp(tempInfluencer);
    }

    let isFavorite = false;
    if (userId) {
      const userLikesInfluencer = await influencerUseCases.isLikedByUser(
        userId,
        result.influencer?.id || -1
      );
      isFavorite = userLikesInfluencer;
    }

    const pageData = {
      influencer,
      haveResults: result.haveResults,
      isFavorite: isFavorite,
    };

    return { pageData };
  }

  async disabled({ searchParams }: DisabledProps): Promise<{
    pageData: object;
  }> {
    const resolvedParams = await searchParams;
    const {
      page,
      city,
      followers,
      engagementVisualizationRate,
      updatedAt,
      search,
    } = resolvedParams;

    const pageNumber = page ? Number(page) : 1;

    const limit = 8;
    let result;

    if (search)
      result = await influencerUseCases.search(
        search,
        pageNumber,
        limit,
        "inactive"
      );
    else if (city || followers || engagementVisualizationRate || updatedAt) {
      const filters = {
        city,
        followers,
        engagementVisualizationRate,
        updatedAt,
        status: "inactive" as Status,
      };
      result = await influencerUseCases.filter(filters, pageNumber, limit);
    } else {
      result = await influencerUseCases.listInactive(pageNumber, limit);
    }

    const influencers = result.influencers.map((influencer) =>
      InfluencerOverviewPresenter.toHttp(influencer)
    );

    const filters = Influencer.getFilters();

    const pageData = {
      influencers,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      filters,
      search,
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
      result = await influencerUseCases.updateStatus(
        username,
        "inactive" as Status
      );

      const pageData = {
        isSuccess: result.isSuccess,
      };

      return { pageData };
    }
  }

  async activate({ params }: ActivateProps): Promise<{
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
      result = await influencerUseCases.updateStatus(
        username,
        "active" as Status
      );

      const pageData = {
        isSuccess: result.isSuccess,
      };

      return { pageData };
    }
  }

  async report({ params }: ReportProps): Promise<{
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
      result = await influencerUseCases.updateStatus(
        username,
        "reported" as Status
      );

      pageData = {
        isSuccess: result.isSuccess,
      };

      return { pageData };
    }
  }

  async reported({ searchParams }: ReportedProps): Promise<{
    pageData: object;
  }> {
    const resolvedParams = await searchParams;
    const {
      page,
      city,
      followers,
      engagementVisualizationRate,
      updatedAt,
      search,
    } = resolvedParams;

    const pageNumber = page ? Number(page) : 1;

    const limit = 8;
    let result;

    if (search)
      result = await influencerUseCases.search(
        search,
        pageNumber,
        limit,
        "reported"
      );
    else if (city || followers || engagementVisualizationRate || updatedAt) {
      const filters = {
        city,
        followers,
        engagementVisualizationRate,
        updatedAt,
        status: "reported" as Status,
      };
      result = await influencerUseCases.filter(filters, pageNumber, limit);
    } else {
      result = await influencerUseCases.listReported(pageNumber, limit);
    }

    const influencers = result.influencers.map((influencer) =>
      InfluencerOverviewPresenter.toHttp(influencer)
    );

    const filters = Influencer.getFilters();

    const pageData = {
      influencers,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      filters,
      search,
    };

    return { pageData };
  }

  async like({ request }: LikeProps): Promise<{ pageData: object }> {
    const { userId, influencerId } = request;

    if (!userId || !influencerId) {
      return { pageData: { isSuccess: false } };
    }

    const result = await influencerUseCases.like(userId, influencerId);

    return { pageData: { isSuccess: result.isSuccess } };
  }

  async unlike({ request }: UnlikeProps): Promise<{ pageData: object }> {
    const { userId, influencerId } = request;

    if (!userId || !influencerId) {
      return { pageData: { isSuccess: false } };
    }

    const result = await influencerUseCases.unlike(userId, influencerId);

    return { pageData: { isSuccess: result.isSuccess } };
  }
}

export const influencerController = new InfluencerController();
