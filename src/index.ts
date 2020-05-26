import {$log, ServerLoader} from "@tsed/common";
import {Server} from "./server/Server";
import { DND5SpellImporter } from "./importer/DND5SpellImporter";

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
const importer: DND5SpellImporter = new DND5SpellImporter();
// importer.importSpellByUrl('http://dnd5eapi.co/api/spells/acid-arrow');
importer.importSpellsByUrl('http://dnd5eapi.co/api/spells');

