import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import InfluencerCard from "~/app/components/cards/influencer.card";
import Pagination from "~/app/components/pagination";
import { JSX } from "react";

interface IndexProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Index({
  searchParams,
}: IndexProps): Promise<JSX.Element> {
  const pageData = await influencerController.index({ searchParams });
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;

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
        <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          totalElements={count}
          start={start}
          end={end}
        />
      </div>
    </div>
  );
}
