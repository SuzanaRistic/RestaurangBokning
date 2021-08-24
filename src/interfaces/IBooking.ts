export default interface IBooking {
	firstname: string;
	lastname: string;
	phonenumber: string;
	email: string;
	guests: number;
	time: Date;
	date: Date;
	booking_reference: string;
	message: string;
}