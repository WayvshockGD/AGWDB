import chalk from "chalk";

export = class LogBuilder {
    public options: LogBuilderOptions;
    public levels: LogBuilderLevels;

    public constructor(options: LogBuilderOptions) {
        this.options = options;

        this.levels = {
            Success: chalk.green,
            Warn: chalk.yellow,
            Error: chalk.red,
            Info: chalk.blue
        };
    }

    log(content: string) {
        let color = this.levels[this.options.logLevel];

        console.log(this.formatTime(this.options.logLevel, (color(content))));
    }

    throw(content: string) {
        throw new TypeError(this.levels.Error(content));
    }

    private formatTime(level: LogBuilderLevelTypes, content: string, useUptime?: boolean) {
        let time = new Date().toISOString();

        if (useUptime) {
            time = process.uptime().toString();
        }

        return `[${level}][${time}] >> ${content}`;
    }
}

interface LogBuilderOptions {
    logLevel: LogBuilderLevelTypes;
}

type LogBuilderLevelTypes = "Success" | "Warn" | "Error" | "Info";

interface LogBuilderLevels {
    Success: chalk.Chalk["green"];
    Warn: chalk.Chalk["yellow"];
    Error: chalk.Chalk["red"];
    Info: chalk.Chalk["blue"];
}