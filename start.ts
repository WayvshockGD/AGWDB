import dotenv from "dotenv";
import GenericBot from "./src/GenericBot";
import { loadCommands } from "./src/util/Functions";

let client = new GenericBot();
dotenv.config();

loadCommands(client);
client.connect(process.env.BOT_TOKEN as string)();