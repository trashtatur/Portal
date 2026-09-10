export interface PathfinderSkillViewModel {
    id: string;
    name: string;
    level: number;
}

export const createPathfinderSkillViewModel = (id: string, name: string, level: number): PathfinderSkillViewModel => ({id: id, name: name, level: level});
