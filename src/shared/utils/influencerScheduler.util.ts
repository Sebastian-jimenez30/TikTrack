import influencerManagementService from "@/infrastructure/services/influencerManagement.service";

class InfluencerSchedulerUtil {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly intervalTime: number = 6000000;

  constructor() {
    this.start();
}

  start() {
    if (!this.intervalId) {
      console.log("🚀 Iniciando la tarea de actualización de influencers...");
      this.fetchAndStoreInfluencers();
      this.intervalId = setInterval(() => this.fetchAndStoreInfluencers(), this.intervalTime);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("⏹️ Se ha detenido la tarea de actualización de influencers.");
    }
  }

  private async fetchAndStoreInfluencers() {
    try {
      console.log("🔄 Obteniendo influencers...");
      const influencers = await influencerManagementService.addInfluencers();
      console.log("✅ Influencers obtenidos:", influencers);
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error al obtener influencers:", error.message);
      } else {
        console.error("❌ Error al obtener influencers:", error);
      }
    }
  }
}

const influencerScheduler = new InfluencerSchedulerUtil();
export default influencerScheduler;
