import "reflect-metadata";

import { Container } from "inversify";

import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import InfluencerRepository from "@/infrastructure/repositories/influencer.repository";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import MessageRepository from "@/infrastructure/repositories/message.repository";

const container = new Container();

container
  .bind<IInfluencerRepository>("IInfluencerRepository")
  .to(InfluencerRepository);

container
  .bind<IMessageRepository>("IMessageRepository")
  .to(MessageRepository);

export default container;
