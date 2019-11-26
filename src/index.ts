import {$log, ServerLoader} from "@tsed/common";
import {Server} from "./server/Server";

const db = require('./db/sync');


async function bootstrap() {
    try {
        $log.debug("Start server...");
        const server = await ServerLoader.bootstrap(Server);
        await server.listen();
        $log.debug("Server initialized");
    } catch (er) {
        $log.error(er);
    }
}

db.dbSync(true);
bootstrap();

