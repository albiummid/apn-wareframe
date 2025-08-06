import configs from "@/configs";
import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: configs.API_BASE_URL,
    timeout: 10 * 1000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err instanceof AxiosError) {
            let message =
                err.response?.data.message ||
                err.message ||
                "Something went wrong";
            throw new Error(message);
        }
        throw err;
    }
);
