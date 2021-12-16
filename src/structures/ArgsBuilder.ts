import { Message } from "discord.js";
import { CommandBuilderArgs, CommandBuilderArgsOptions } from "../Types";
import { CommandBuilder } from "./CommandBuilder";

export class ArgsBuilder {
    public con: string[];
    public command: CommandBuilder;
    public message: Message;

    public constructor(con: string[], command: CommandBuilder, message: Message) {
        this.con = con;
        this.command = command;
        this.message = message;
    }

    public parse(): CommandArgsObject {
        let json: CommandArgsObject = {};
        
        if (typeof this.command.args === "undefined") {
            return {};
        } else {
            for (let [_, value] of Object.entries(this.command.args as CommandBuilderArgs[])) {
                let fun = value.replOpt(this.message);

                if (typeof fun === "boolean" && fun === false) {
                    return {};
                } else {
                    json[value.opt] = {
                        out: fun
                    };
                }
            }
            return json;
        }
    }
}

type CommandArgsObject = { [key: string]: CommandBuilderArgsOptions<any> }; 