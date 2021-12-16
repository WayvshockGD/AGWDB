import { Message } from "discord.js";
import GenericBot from "./GenericBot";

export interface CommandBuilderOptions<A extends CommandBuilderArgs[] = []> {
    aliases: string[];
    descriptions: string[];
    enabled?: CommandBuilderEnabledLevels;
    args: A;
}

export interface CommandBuilderExecuteData<T, A extends CommandBuilderArgs[] = []> {
    args: CommandBuilderArgsBuilder<T, A>;
    generic: GenericBot;
}

export interface CommandBuilderArgsBuilder<T, A extends CommandBuilderArgs[] = []> {
    parsed: { [key: string]: T };
    command: string[];
}

export interface CommandBuilderArgs {
    opt: string;
    replOpt: (message: Message) => any;
    has: boolean;
}

export interface CommandBuilderArgsOptions<T> {
    out: T;
}

export type CommandBuilderEnabledLevels = "ENABLED" | "DISABLED";