import { AxiosRequestConfig } from './../../node_modules/axios/index.d';
import axois from 'axios';
import auth from './auth';

console.log('API-HOST:::', process.env.NEXT_PUBLIC_API_HOST);

const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_HOST || 'https://order-backend-api.herokuapp.com/api/v1',
};

// update instance
const instance = axois.create(defaultOptions);

//set the auth token if there's any for any request
instance.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
        if (config && config.headers){
            config.headers.Authorization = `Bearer ${auth.getUserSession()}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error.response);
    }
);

export default instance;

export const createAPIRequest = (config: any) => instance(config);
