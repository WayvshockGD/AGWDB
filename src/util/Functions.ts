import Files from "node:fs/promises";
import GenericBot from "../GenericBot";
import { CommandBuilder } from "../structures/CommandBuilder";

export async function loadCommands(generic: GenericBot) {
    let path = "./build/src/commands";

    try {
        let dir = await Files.readdir(path);

        for (let file of dir) {
            let command: CommandBuilder = new (require(`../commands/${file}`))();

            for (let a of command.aliases) {
                generic.commands.set(a, command);
            }
        }
    } catch (e) {
        generic.logger.error.log(`Unable to load commands, ${e}`);
    }
}