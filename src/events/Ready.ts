import GenericBot from "../GenericBot";

export = function(generic: GenericBot) {
    generic.logger.info.log(`Client has logged in as ${generic.client.user?.username}`);

    generic.client.user?.setPresence({
        activities: [{
            name: `${generic.client.guilds.cache.size} guilds`,
            type: "WATCHING"
        }],
        status: "idle"
    });
}