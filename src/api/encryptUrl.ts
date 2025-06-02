// 对指定请求链接进行加密

import { AxiosRequestConfig } from "axios";





export const handleUrl = async (config: (AxiosRequestConfig & {unEncrypt?: boolean})) => {
    return config;
}