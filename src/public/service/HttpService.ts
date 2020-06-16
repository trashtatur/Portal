import axios from 'axios';

export class HttpService {

    get = async(route: string): Promise<any> => {
        try {
            const response = await axios.get(route)
            return response.data;
        } catch (e) {

        }
    }

    post = async(route: string, data): Promise<any> => {
        try {
            const response = await axios.post(route, data);
            return response.data
        } catch (e) {

        }
    }

    put = async(route: string, data): Promise<any> => {
        try {
            const response = await axios.put(route, data);
            return response.data;
        } catch (e) {

        }
    }

    delete = async(route: string): Promise<number> => {
        try {
            const response = await axios.delete(route)
            return response.status
        } catch (e) {

        }
    }
}