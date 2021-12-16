import LogBuilder from "./LogBuilder"

export = class Log {
    get success() {
        return new LogBuilder({ logLevel: "Success" });
    }

    get warn() {
        return new LogBuilder({ logLevel: "Warn" });
    }

    get error() {
        return new LogBuilder({ logLevel: "Error" });
    }

    get info() {
        return new LogBuilder({ logLevel: "Info" });
    }
}