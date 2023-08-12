import axios from "axios";

const baseUrl = "https://api-test.innoloft.com/";
const appId = import.meta.env.VITE_APP_ID

export const getAppConfig = async () => {
    return await axios.get(`${baseUrl}/configuration/${appId || 1}/`);
}; 


export const getProduct = async (id : string) => {
    return await axios.get(`${baseUrl}/product/${id}/`);
}

export const updateProduct = async (id: string, body : any) => {
    return await axios.put(`${baseUrl}/product/${id}/`, body);
}

