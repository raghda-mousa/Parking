import paypal from 'paypal-rest-sdk';

paypal.configure({
    mode: 'sandbox',
    client_id: 'AaMyxL1-n4jIQqKX_Re2oS7EbfRW2jcboEtXmOpllGB_rS3mYsLcKBLw_1b5y0To6oHr_EYozRNfA8dv',
    client_secret: 'EAGrMH901QhAsfLyQy6KpBrZn5pH2xGECYHZoo7dsg0frXldxdSvN6LA2q5GFgMSUxwhx-sggdWjFWjX',
});

export function createPayment(createPaymentJson: any): Promise<any> {
    return new Promise((resolve, reject) => {
        paypal.payment.create(createPaymentJson, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
}


export function executePayment(paymentId: string, executePaymentJson: any): Promise<void> {
    return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, executePaymentJson, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

export const verifyWebhookSignature = async (data: {
    auth_algo: string, cert_url: string, transmission_id: string, transmission_sig: string, transmission_time: string, webhook_id: string, webhook_event: any
}) => {
    try {
        // console.log({ data });
        // const response = await ParkingAxios.getPayPalAxiosInstance().post(EnvironementService.payPalConfigs.verifyWebHookEndPoint, data);
        // console.log({ response: response.data });
        // return response.data?.verification_status === 'SUCCESS';
        return true;
    }
    catch (error: any) {
        console.log({ error })
        return null;
    }
}
