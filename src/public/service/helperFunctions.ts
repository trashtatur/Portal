import axios, {AxiosResponse} from "axios";
import {CreatureViewModel} from "../model/CreatureViewModel";

export const uuidv4 = function (): string {
    let d = new Date().getTime();//Timestamp
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

export const uploadImage = (data: File | string, creatureName: string, creatureChallenge: number): AxiosResponse | boolean => {
    if (data == null) return true;
    if (typeof data != "string") {
        const fileExtension = data.name.substring(data.name.lastIndexOf('.'));
        const filename = creatureName + '-' + creatureChallenge + fileExtension;
        const formattedFile = new File([data], filename, {type: data.type});
        const form = new FormData();
        form.append('file', formattedFile);
        axios.put(
            '/V1/creature/image', form
        ).then(
            function (result) {
                console.log(result);
                return result.data
            }
        ).catch(function (error) {
            console.log(error);
            return false
        });
    }
};

export const setCreatureImageName = (creatureName: string, creatureChallenge: number, image: File): string => {
   return `images/creatureImages/${creatureName}-${creatureChallenge}/${creatureName}-${creatureChallenge}${image.name.substring(image.name.lastIndexOf('.'))}`;
};
