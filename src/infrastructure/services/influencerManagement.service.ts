import IInfluencerManagementService from "@/application/services/influencerManagement.service.interface";
import ROUTES from "~/constants/urls";

class InfluencerManagementService implements IInfluencerManagementService {
  async fetchInfluencers(): Promise<
    {
      username: string;
      profileName: string;
      profilePicture: string;
      profileUrl: string;
      averageLikes: number;
      averageComments: number;
      averageShares: number;
      averageSaves: number;
      averageViews: number;
      followers: number;
      city: string;
      featuredVideos: string[];
    }[]
  > {
    const endpoint = "influencers";
    const url = ROUTES.INFLUENCERS_MANAGEMENT + endpoint;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error al obtener influencers:", error);
      throw new Error(
        "No se pudo obtener la lista de influencers. Intenta nuevamente más tarde."
      );
    }
  }
}

const influencerManagementService = new InfluencerManagementService();
export default influencerManagementService;
