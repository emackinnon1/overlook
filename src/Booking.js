class Booking {
	constructor(data) {
		this.id = data.id || this.makeBookingId();
		this.userID = data.userID;
		this.date = data.date;
		this.roomNumber = data.roomNumber;
		this.roomServiceCharges = data.roomServiceCharges;
	}

	makeBookingId() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

}

export default Booking;