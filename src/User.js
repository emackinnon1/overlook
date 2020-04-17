import './Booking'


class User {
	constructor(data) {
		this.id = data.id;
		this.username = `customer${this.id}`
		this.password = 'overlook2020'
		this.name = data.name;
		this.myBookings = [];
	}

	signIn(name, pword) {
		name === this.username && pword === this.password ? true : false;
	}

	bookRoom() {
		let booking = new Booking();
	}
}



export default User;