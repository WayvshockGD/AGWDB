import { Message } from "discord.js";
import GenericBot from "../GenericBot";
import dotenv from "dotenv";
import { ArgsBuilder } from "../structures/ArgsBuilder";
dotenv.config();

export = function(message: Message, generic: GenericBot) {
    let prefix = process.env.PREFIX as string;

    if (!meets(message, prefix)) {
        return;
    }

    let args = message.content.slice(prefix.length).trim().split(" ");

    let command = generic.commands.get(args[0]);

    if (!command) return;

    let builder = new ArgsBuilder(args, command, message);

    args = args.slice(1);

    command.run(message, {
        args: {
            command: args,
            parsed: builder.parse()
        },
        generic
    })
}

function meets(message: Message, prefix: string) {
    if (message.author.bot) {
        return false;
    }

    if (!message.content.startsWith(prefix)) {
        return false;
    }

    return true;
}