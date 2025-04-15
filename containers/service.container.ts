import "reflect-metadata";

import { Container } from "inversify";

import { IOpenAIService } from "@/application/services/openai.service.interface";
import { OpenAIService } from "@/infrastructure/services/openai.service";

const container = new Container();

container.bind<IOpenAIService>("IOpenAIService").to(OpenAIService);

export default container;
