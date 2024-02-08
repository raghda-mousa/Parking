export interface IReservation {
	cost: number;
	qrCode:string,
	parkingId: string;
	createdBy: string;
	sartTime?: Date;
}
