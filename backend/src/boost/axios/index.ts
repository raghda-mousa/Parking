import { tryJsonParse } from '@boost';
import { EnvironementService } from '@services';
import Axios, { AxiosInstance } from 'axios';

export class ParkingAxios {
    private static payPalAxiosInstance: AxiosInstance;
    private static getInstance = (baseUrl: string, headers?: { [key in string]: any }) => {
        return Axios.create({
            baseURL: baseUrl,
            headers,
            transformResponse: [
                (res: any) => {
                    let response = null;
                    try {
                        if (headers?.isTransformResponse) {
                            response = tryJsonParse(res).data;
                        } else {
                            response = tryJsonParse(res);
                        }
                        return response;
                    } catch (error) {
                        console.error(error);
                    }
                },
            ],
        });
    }
    public static getPayPalAxiosInstance = () => {
        if (this.payPalAxiosInstance)
            return this.payPalAxiosInstance;
        this.payPalAxiosInstance = this.getInstance(EnvironementService.payPalConfigs.baseUrl, {
            Authorization: `Bearer A21AAJZAZktqgezSjIoAQS4RGxetGuazvSM7AzzuaD6XMeSVVgR7GpUOkVRHT7vLJltazw0yDlHVRP1MpQRR5sBc7Bb5e1Isw`
        });
        return this.payPalAxiosInstance
    }
}