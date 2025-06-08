import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import influencerManagementService from "@/infrastructure/services/influencerManagement.service";
import repositoryContainer from "~/containers/repository.container";

class InfluencerSchedulerUtil {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly intervalTime: number = 60000;

  constructor() {}

  start() {
    if (!this.intervalId) {
      this.fetchAndStoreInfluencers();
      this.intervalId = setInterval(
        () => this.fetchAndStoreInfluencers(),
        this.intervalTime
      );
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async fetchAndStoreInfluencers() {
    try {
      const influencers = await influencerManagementService.fetchInfluencers();
      const repository = repositoryContainer.get<IInfluencerRepository>(
        "IInfluencerRepository"
      );

      for (const influencer of influencers) {
        const tempInfluencer = await repository.findByUsername(
          influencer.username
        );
        if (!tempInfluencer) {
          console.log("Guardando influencer:", influencer);
          await repository.create({
            username: influencer.username,
            profileName: influencer.profileName,
            profilePicture: influencer.profilePicture,
            profileUrl: influencer.profileUrl,
            averageLikes: influencer.averageLikes,
            averageComments: influencer.averageComments,
            averageShares: influencer.averageShares,
            averageSaves: influencer.averageSaves,
            averageViews: influencer.averageViews,
            followers: influencer.followers,
            city: influencer.city,
            featuredVideos: influencer.featuredVideos,
          });
        } else {
          console.log(
            "Influencer ya existe, actualizando...",
            influencer.username
          );
          await repository.update({
            id: tempInfluencer.id,
            username: influencer.username,
            profileName: influencer.profileName,
            profilePicture: influencer.profilePicture,
            profileUrl: influencer.profileUrl,
            averageLikes: influencer.averageLikes,
            averageComments: influencer.averageComments,
            averageShares: influencer.averageShares,
            averageSaves: influencer.averageSaves,
            averageViews: influencer.averageViews,
            followers: influencer.followers,
            city: tempInfluencer.city,
            featuredVideos: influencer.featuredVideos,
            status: tempInfluencer.status,
            createdAt: tempInfluencer.createdAt,
            updatedAt: new Date(),
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }
}

const influencerScheduler = new InfluencerSchedulerUtil();
export default influencerScheduler;
