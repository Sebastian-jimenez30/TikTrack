import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import InfluencerCard from "~/app/components/cards/influencer.card";
export default async function Index() {
  const influencers = await influencerController.index();

  return (
    <div>
      <div>
        <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
          {influencers.map((influencer) => (
            <div key={influencer.getUsername()}>
              <InfluencerCard
                username={influencer.getUsername()}
                profilePicture={influencer.getProfilePicture()}
                city={influencer.getCity()}
                engagementVisualizationRate={influencer.getEngagementVisualizationRate()}
                totalFollowers={influencer.getFormattedTotalFollowers()}
                updatedAt={influencer.getUpdatedAt()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
