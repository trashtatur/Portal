import { DND5SpellImporter } from "./DND5SpellImporter";
import { sequelize } from "../db/connector";

const url = 'http://dnd5eapi.co/api/spells';
const db = require('../db/sync');

sequelize.options.logging = () => {return false};
db.dbSync(true);
const importer: DND5SpellImporter = new DND5SpellImporter();
importer.importSpellsByUrl(url);
sequelize.options.logging = console.log;