export const setCreatureImagePath = (creatureName: string, creatureChallenge: number, image: File): string => {
    return `images/creatureImages/${creatureName}-${creatureChallenge}/${creatureName}-${creatureChallenge}${image.name.substring(image.name.lastIndexOf('.'))}`;
};