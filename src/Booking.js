class Booking {
	constructor(data) {
		this.id = data.id;
		this.userID = data.userID;
		this.date = data.date;
		this.roomNumber = data.roomNumber;
		this.roomServiceCharges = data.roomServiceCharges;
	}

}

export default Booking;