import axios from 'axios';

const port = 8080;

const httpGet = async (route) => {
    const result = await axios.get(route);
    return result.data;
}

export {
    httpGet,
};
