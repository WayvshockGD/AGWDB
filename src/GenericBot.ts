import { AllowedImageSize, Client, ImageURLOptions } from "discord.js"
import MessageCreate from "./events/MessageCreate";
import Ready from "./events/Ready";
import Log from "./logger/Log";
import { CommandBuilder } from "./structures/CommandBuilder";
import dotenv from "dotenv";
dotenv.config();

export = class GenericBot {
    public client: Client;
    public logger: Log;
    public commands: Map<string, CommandBuilder>;

    public constructor() {
        this.client = new Client({
            intents: [
                "GUILDS",
                "GUILD_MESSAGES",
                "GUILD_MEMBERS", 
                "DIRECT_MESSAGES"
            ],
            allowedMentions: {
                parse: ["users"]
            },
        });

        this.logger = new Log();

        this.commands = new Map();

        this.runEvents();
    }

    private getDefaultSize(): AllowedImageSize {
        return parseInt(process.env.SIZE as string) as AllowedImageSize;
    }

    public getAvatarSettings(): ImageURLOptions {
        return {
            dynamic: true,
            size: this.getDefaultSize()
        };
    }

    public runEvents() {
        this.client.on("ready", () => Ready(this));
        this.client.on("messageCreate", (message) => MessageCreate(message, this));
    }

    public connect(token: string) {
        return async () => {
            return await this.client.login(token).catch((reas) => {
                this.logger.warn.log(reas);
            });
        };
    }
}