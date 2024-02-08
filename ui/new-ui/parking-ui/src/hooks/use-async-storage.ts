import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
    const getItem = async (key: string) => {
        return AsyncStorage.getItem(key);
    }
    const setItem = async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value);
    }

    return { getItem, setItem }
}
export { useAsyncStorage }