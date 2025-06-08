import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import IRedisRepository from "@/application/repositories/redis.repository.interface";
import influencerManagementService from "@/infrastructure/services/influencerManagement.service";
import repositoryContainer from "~/containers/repository.container";
import cities from "@/infrastructure/database/cities.json";
import cron, { ScheduledTask } from "node-cron";
import moment from "moment-timezone";

class InfluencerSchedulerUtil {
  private intervalIdStoreInfluencer: NodeJS.Timeout | null = null;
  private readonly intervalTimeStoreInfluencers: number = 60000;

  private notifyCitiesTask: ScheduledTask | null = null;

  constructor() {}

  start() {
    if (!this.intervalIdStoreInfluencer) {
      this.storeInfluencersInformation();
      this.intervalIdStoreInfluencer = setInterval(
        () => this.storeInfluencersInformation(),
        this.intervalTimeStoreInfluencers
      );
    }
    if (!this.notifyCitiesTask) {
      this.notifyCitiesTask = cron.schedule(
        "*/15 1-5 * * *",
        () => {
          const now = moment().tz("America/Bogota");
          console.log("Ejecutando notifyCities a las", now.format());
          this.notifyCities();
        },
        {
          timezone: "America/Bogota",
        }
      );
      console.log("Tarea de cron registrada");
    }
  }

  stop() {
    if (this.intervalIdStoreInfluencer) {
      clearInterval(this.intervalIdStoreInfluencer);
      this.intervalIdStoreInfluencer = null;
    }
    if (this.notifyCitiesTask) {
      this.notifyCitiesTask.stop();
      this.notifyCitiesTask = null;
    }
  }

  private async storeInfluencersInformation() {
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
        }
        else {
          console.log("Actualizando influencer:", influencer);
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

  public async notifyCities() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];
    const repository =
      repositoryContainer.get<IRedisRepository>("IRedisRepository");

    await repository.publish("tasks", `fetch_influencers:${randomCity}`);
  }
}

const influencerScheduler = new InfluencerSchedulerUtil();
export default influencerScheduler;