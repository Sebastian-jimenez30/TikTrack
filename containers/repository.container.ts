import "reflect-metadata";

import { Container } from "inversify";

import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import InfluencerRepository from "@/infrastructure/repositories/influencer.repository";

import IUserRepository from "@/application/repositories/user.repository.interface";
import UserRepository from "@/infrastructure/repositories/user.repository";

const container = new Container();

container
  .bind<IInfluencerRepository>("IInfluencerRepository")
  .to(InfluencerRepository);

container.bind<IUserRepository>("IUserRepository").to(UserRepository);

export default container;
