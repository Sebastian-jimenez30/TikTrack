import {
  IInfluencerManagementService,
  SendMessageResponse,
} from "@/application/services/influencerManagement.service.interface";
import ROUTES from "~/constants/urls/services.urls";

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
    try {
      const response = await fetch(ROUTES.GET_INFLUENCERS);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting influencers", error);
      throw new Error("Error getting influencer list");
    }
  }

  async sendMessageToInfluencer(
    username: string,
    message: string
  ): Promise<SendMessageResponse> {
    try {
      const response = await fetch(ROUTES.SEND_MESSAGE(username), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      return response.json();
    } catch {
      throw new Error("Error sending message");
    }
  }
}

const influencerManagementService = new InfluencerManagementService();
export default influencerManagementService;
