export interface DND5SkillModel {
    id: string;
    name: string;
    skillLevel?: number;
}

export const createDND5SkillModel = (id: string, name: string, skillLevel?: number): DND5SkillModel => ({id: id, name: name, skillLevel: skillLevel});
