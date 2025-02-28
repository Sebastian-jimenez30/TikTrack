import "reflect-metadata";
import { Container } from "inversify";
import InfluencerRepository from "@/infrastructure/repositories/influencer.repository";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";

const container = new Container();

container
  .bind<IInfluencerRepository>("IInfluencerRepository")
  .to(InfluencerRepository);

export default container;
