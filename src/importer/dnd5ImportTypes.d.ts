export type entityLocation = {
	index: string;
	name: string;
	url: string;
}

export type actionImport = {
	name: string;
	attack_bonus: string;
	damage: damageImport[];
}

export type damageImport = {
	damage_type: {
		name: string;
	};
	damage_dice: string;
	damage_bonus: string;
}

export type proficiencyImport = {
	name: string;
	value: string;
}

export type speed = {
	walk?: string;
	fly?: string;
	swim?: string;
	burrow?: string;
	climb?: string;
	hover?: string;
}

export type senses = {
	blindsight?: string;
	darkvision?: string;
	passive_perception?: string;
	tremorsense?: string;
	truesight?: string;
}

export type monsterImport = {
	name: string;
	size: string;
	type: string;
	subtype: string;
	alignment: string;
	armor_class: number;
	hit_points: number;
	hit_dice: string;
	speed: speed;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	proficiencies: proficiencyImport[];
	damage_vulnerabilities: string[];
	damage_resistances: string[];
	damage_immunities: string[];
	condition_immunities: string[];
	senses: senses;
	languages: string;
	challenge_rating: string;
	actions: damageImport[];
}

export type multiSpellImport = {
	count: number;
	results: entityLocation[];
}

export type spellImport = {
	name: string;
	desc: string[];
	higher_level: string[];
	range: string;
	components: string[];
	ritual: boolean;
	duration: string;
	concentration: boolean;
	casting_time: string;
	school: { name: string };
	material: string;
	level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export type spellData = {

	name: string;
	description: string;
	higherLevelsDescription: string;
	range: string;
	components: string;
	ritual: boolean;
	duration: string;
	concentration: boolean;
	castingTime: string;
	school: string;
	materials: string;
	level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

}
