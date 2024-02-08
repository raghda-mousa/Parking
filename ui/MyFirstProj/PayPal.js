// import React from 'react';
// import { View } from 'react-native';
// import WebView from 'react-native-webview';

// const PayPalIntegration = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <WebView
//                 source={{
//                     html: `
//             <!DOCTYPE html>
//             <html lang="en">
//               <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>PayPal JS SDK Standard Integration</title>
//               </head>
//               <body>
//                 <div id="paypal-button-container"></div>
//                 <p id="result-message"></p>
//                 <!-- Replace the "test" client-id value with your client-id -->
//                 <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>
//                 <script src="app.js"></script>
//               </body>
//             </html>
//           `,
//                 }}
//             />
//         </View>
//     );
// };

// export default PayPalIntegration;
import React from 'react';
import { View } from 'react-native';
import { PayPalButton } from 'react-native-paypal';

const PayPalScreen = () => {
    const onSuccess = (payment) => {
        console.log('Payment success:', payment);
    };

    const onCancel = (data) => {
        console.log('Payment cancelled:', data);
    };

    const onError = (error) => {
        console.error('Payment error:', error);
    };

    return (
        <View>
            <PayPalButton
                amount="10.00"
                currency="USD"
                onSuccess={onSuccess}
                onCancel={onCancel}
                onError={onError}
            />
        </View>
    );
};

export default PayPalScreen;
