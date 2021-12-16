import { Message } from "discord.js";
import ms from "ms";
import { EventEmitter } from "typed-event-emitter";
import { CommandBuilderArgs, CommandBuilderExecuteData, CommandBuilderOptions } from "../Types";

export class CommandBuilder<A extends CommandBuilderArgs[] = []> extends EventEmitter implements CommandBuilderOptions<A> {
    private data: CommandBuilderOptions<A>;

    public onEvent = this.registerEvent<[Message]>();

    constructor(data: CommandBuilderOptions<A>) {
        super();
        
        this.data = data;
    }

    public run(message: Message, { args, generic }: CommandBuilderExecuteData<any>) {}

    public time(t: string) {
        return ms(t);
    }

    get args() {
        return this.data.args;
    }

    get aliases() {
        return this.data.aliases ?? [];
    }

    get enabled() {
        return this.data.enabled ?? "ENABLED";
    }

    get descriptions() {
        return this.data.descriptions ?? [];
    }
}