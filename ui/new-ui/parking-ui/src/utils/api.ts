import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiRequest = async (method = 'GET', url: string, data = {}) => {
    try {
        const SERVER = 'https://test-api-m4btbx3m6q-uc.a.run.app';

        let token = await AsyncStorage.getItem('token') || '';
        // if (url === '/v1/auth/login' || url === '/v1/auth/') {
        //     token = null;
        // }
        const options: any = {
            method,
            url: SERVER,
            data,
            responseType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(token?.length > 50 && {
                    'Authorization': `Bearer ${token}`
                }),
            }
        };
        if (method === 'GET') {
            delete options['data'];
            options.params = {
                ...data
            };
        }
        const response = await axios(options);
        if (response) {
            if (method === 'GET') {
                delete options['data'];
                options.params = {
                    ...data
                };
            }

            // console.warn("result", response?.data)
            return {
                success: true,
                status: response?.status,
                message: response?.data?.message,
                data: response?.data
            };
        }
    } catch (err: any) {
        return {
            success: false,
            status: err?.response?.status,
            message: err?.response?.data?.message,
            errors: err?.response?.data?.errors,
            msg: err?.response?.data?.msg
        };
    }
};

export const getApiRequest = async (url: string, data: any) => {
    return await apiRequest('GET', url, data);
};
export const postApiRequest = async (url: string, data: any) => {
    return await apiRequest('POST', url, data);
};
export const putApiRequest = async (url: string, data: any) => {
    return await apiRequest('PUT', url, data);
};
export const patchApiRequest = async (url: string, data: any) => {
    return await apiRequest('PATCH', url, data);
};
export const deleteApiRequest = async (url: string, data: any = {}) => {
    return await apiRequest('DELETE', url, data);
};

export { apiRequest };
