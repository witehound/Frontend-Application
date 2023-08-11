import axios from "axios";

const baseUrl = "https://api-test.innoloft.com/";
const appId = import.meta.env.VITE_APP_ID

export const getAppConfig = async () => {
    return await axios.get(`${baseUrl}/configuration/${appId || 1}/`);
};
