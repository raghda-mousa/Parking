import { apiRequest } from '../utils'
const useAxios = () => {
    const getApiRequest = async (endpoint: string, data?: any) => {
        return apiRequest('GET', endpoint, data)
    }
    const patchApiRequest = async (endpoint: string, data: any) => {
        return apiRequest('PATCH', endpoint, data)
    }
    const postApiRequest = async (endpoint: string, data: any) => {
        return apiRequest('POST', endpoint, data);
    };
    return { getApiRequest, postApiRequest, patchApiRequest }
}

export { useAxios }