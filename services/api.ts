import configs from "@/configs";
import axios from "axios";

export const api = axios.create({
    baseURL: configs.API_BASE_URL,
    timeout: 10 * 1000,
});
