export enum EPaymentStatus {
	PROCESSING = 'PROCESSING',
	SUCCESS = "SUCCESS",
	FAILED = "FAILED"
}

export enum EPaymentType {
	CASH ="CASH",
	CREDITCARD ="CREDIT_CARD",
	EWALLET = "E-WALLET"
}

export enum EPaymentGateway {
	JAWWAL_PAY="JAWWAL_PAY",
	PAY_PAL="PAY_PAL",
	PAL_PAY="PAL_PAY"
}