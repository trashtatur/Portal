export type monsterLocation = {
	index: string;
	name: string;
	url: string;
}

export type actionImport = {
	"name": string;
	"attack_bonus": string;
	"damage": damageImport[];
}

export type damageImport = {
	"damage_type": {
		"name": string;
	};
	"damage_dice": string;
	"damage_bonus": string;
}

export type proficiencyImport = {
	"name": string;
	"value": string;
}

export type monsterImport = {
	"name": string;
	"size": string;
	"type": string;
	"subtype": string;
	"alignment": string;
	"armor_class": string;
	"hit_points": string;
	"hit_dice": string;
	"speed": Map<string, string>;
	"strength": string;
	"dexterity": string;
	"constitution": string;
	"intelligence": string;
	"wisdom": string;
	"charisma": string;
	"proficiencies": proficiencyImport[];
	"damage_vulnerabilities": string[];
	"damage_resistances": string[];
	"damage_immunities": string[];
	"condition_immunities": string[];
	"senses": Map<string, string>;
	"languages": string;
	"challenge_rating": string;
	"actions": damageImport[];
}