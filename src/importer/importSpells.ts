import { DND5SpellImporter } from "./DND5SpellImporter";

const url = 'http://dnd5eapi.co/api/spells';
const db = require('../db/sync');

db.dbSync(true);
const importer: DND5SpellImporter = new DND5SpellImporter();
importer.importSpellsByUrl(url);