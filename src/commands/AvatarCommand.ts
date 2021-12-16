import { GuildMember, Message, MessagePayload } from "discord.js";
import { CommandBuilder } from "../structures/CommandBuilder";
import { CommandBuilderArgs, CommandBuilderExecuteData } from "../Types";

type FunReturn = { out: GuildMember } | "NO_USER";

interface AvatarGeneric extends CommandBuilderArgs {
    opt: "user",
    replOpt(message: Message): GuildMember | "NO_USER";
}

export = class AvatarCommand extends CommandBuilder<[AvatarGeneric]> {
    public constructor() {
        super({ 
            aliases: ["av", "avatar"], 
            args: [{
                opt: "user",
                has: true,
                replOpt: (message) => {
                    let user = message.mentions.members?.first();

                    if (typeof user === "undefined") {
                        return message.member!;
                    }

                    return user;
                }
            }],
            descriptions: []
        });
    }

    public run(message: Message, { args, generic }: CommandBuilderExecuteData<FunReturn, [AvatarGeneric]>) {
        if (typeof args.parsed.user === "string" && args.parsed.user === "NO_USER") {
            return message.channel.send("The user requested could not be found.");
        };

        if (typeof args.parsed.user === "object") {

            let { parsed: { user }} = args;

            message.reply(user.out.displayAvatarURL(generic.getAvatarSettings()));
        }
    }
}