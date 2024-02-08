import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAxios = () => {
    const base_url = 'http://127.0.0.1:3000'
    const get = async (endpoint, params) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log({ token, ee: `${base_url}/${endpoint}` });
            const response = await axios.get(`${base_url}/${endpoint}` , {
                headers: {
                    Authorization: token
                }
            });
            console.log({ response });
            return response;
        } catch (error) {
            console.log({ error });
            return null;
        }
    }
    // const get = async (endpoint,body) => {
    //     try {
    //         const response = await axios.get(`${base_url}/${endpoint}`,body ,{
    //             headers: {
    //                 Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnIiLCJlbWFpbCI6IlJyMUBnbWFpbC5jb20iLCJ0eXBlIjoiVVNFUiIsImlkIjoiNjVhYmI2Y2MxN2I4MmI3MmMwMWNlN2JkIiwiaWF0IjoxNzA1NzU1NTU4fQ.vGQYIOxJRnsxWDAYqD0mt7vLp6G0bGp30o5WW1_cFT0'
    //             }
    //         });
    //         console.log({ response })
    //     }
    //     catch (error) {
    //         console.log({ error })
    //         return null
    //     }
    // }
    const patch = async (endpoint, body) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log({ token, ee: `${base_url}/${endpoint}` });
            const response = await axios.patch(`${base_url}/${endpoint}`, body, {
                headers: {
                    Authorization: token
                }
            }).catch(error => {
                console.log("pathc error", { error })
            });
            return response.data;
        }
        catch (error) {
            console.log({ error })
            return null
        }
    }
    const post = async (endpoint, body) => {
        try {
            const response = await axios.post(`${base_url}/${endpoint}`, body, {
                // headers: {
                //     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY5OTc0MjQ2NH0.AeaN2CCIwPjwvfcHAsOgXZQuveCVb8LG4EapuKY4P7A',
                // }
            });
            console.log({ response });
            return response.data;
        } catch (error) {
            console.log("post error", { error });
            return null;
        }
    };
    return { get, patch, post }

}

export default useAxios;