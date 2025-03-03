import "reflect-metadata";

import { Container } from "inversify";

import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import InfluencerRepository from "@/infrastructure/repositories/influencer.repository";

const container = new Container();

container
  .bind<IInfluencerRepository>("IInfluencerRepository")
  .to(InfluencerRepository);

export default container;
