import { Message } from "discord.js";
import ms from "ms";
import { CommandBuilder } from "../structures/CommandBuilder";

export = class PingCommand extends CommandBuilder {
    public constructor() {
        super({ 
            aliases: ["ping"], 
            args: [],
            descriptions: [] 
        });
    }

    public run(message: Message) {

        message.channel.send({
            embeds: [{ description: "Ping?", color: "RED" }]
        }).then((mes) => {
            setTimeout(() => {
                mes.edit({
                    embeds: [{
                        description: `Pong! \`${message.guild?.shard.ping}ms\``,
                        color: "GREEN"
                    }]
                });
            }, this.time("3s"));
        });
    }
}