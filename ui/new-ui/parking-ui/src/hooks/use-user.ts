import { useAsyncStorage } from './use-async-storage'
const useUser = () => {
    const { getItem, setItem } = useAsyncStorage();
    const getUserId = async () => {
        return getItem('userId');
    }
    const setUserId = async (userId: string) => {
        await setItem('userId', userId);
    }

    const getUserToken = async () => {
        return getItem('token');
    }
    const setUserToken = async (token: string) => {
        await setItem('token', token);
    }

    return { getUserId, setUserId, getUserToken, setUserToken }
}

export { useUser }