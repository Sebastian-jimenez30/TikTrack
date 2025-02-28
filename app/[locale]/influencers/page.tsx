import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export default async function Index() {
  const influencers = await influencerController.index();

  return (
    <div>
      <h1>Influencers</h1>
      <ul>
        {influencers.map((influencer) => (
          <li key={influencer.id}>{influencer.profileName}</li>
        ))}
      </ul>
    </div>
  );
}
