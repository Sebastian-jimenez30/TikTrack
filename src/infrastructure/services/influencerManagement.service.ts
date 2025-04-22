import IInfluencerManagementService from "@/application/services/influencerManagement.service.interface";
import ROUTES from "~/constants/urls/services.urls";
import { getTranslations } from "next-intl/server";

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
    const t = await getTranslations("InfluencerManagementService");
    const endpoint = "influencers";
    const url = ROUTES.TIKTRACK_SCRAPER_SYSTEM + endpoint;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(t("error.errorGettingInfluencers"), error);
      throw new Error(
        t("error.errorGettingInfluencerList")
      );
    }
  }

  async sendMessageToInfluencer(username: string, message: string): Promise<any> {
    const t = await getTranslations("InfluencerManagementService");
    const endpoint = 'messages/' + username;
    const url = ROUTES.TIKTRACK_SCRAPER_SYSTEM + endpoint;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), 
      });
  
      return response.json();
    } catch (error) {
      throw new Error(
        t("error.errorSendingMessage"), 
      );
    }
  }  
}

const influencerManagementService = new InfluencerManagementService();
export default influencerManagementService;
