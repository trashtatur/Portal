import axios, {AxiosResponse} from 'axios';

export const httpGet = async(route: string): Promise<any> => {
    try {
        const response = await axios.get(route)
        return response.data;
    } catch (e) {

    }
}
export const httpPost = async(route: string, data): Promise<any> => {
    try {
        const response = await axios.post(route, data);
        return response.data
    } catch (e) {

    }
}
export const httpPut = async(route: string, data): Promise<any> => {
    try {
        const response = await axios.put(route, data);
        return response.data;
    } catch (e) {

    }
}
export const httpDelete = async(route: string): Promise<number> => {
    try {
        const response = await axios.delete(route)
        return response.status
    } catch (e) {

    }
}

export const uploadCreatureImage = (data: File | string, creatureName: string, creatureChallenge: number): AxiosResponse | boolean => {
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