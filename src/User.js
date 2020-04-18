import booking from './Booking';
// import 


class User {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.username = `customer${this.id}`;
		this.password = 'overlook2020';
		this.myBookings = [];
	}

	signIn(usernameInput, passwordInput) {
		if (usernameInput === this.username && passwordInput === this.password) {
			return true;
		}
	}

	findRoomTotal(rooms) {
		let roomTotal = this.myBookings.reduce((acc, booking) => {
			rooms.forEach(room => {
				if (booking.roomNumber === room.number) {
					acc += room.costPerNight;
				}
			})
			return acc;
		}, 0);

		return Number(roomTotal.toFixed(2));
	}

	findMyBookings(bookingsData) {
		this.myBookings = bookingsData.filter(booking => booking.userID === this.id);
	}

	bookRoom() {
		let booking = new Booking();
	}
}



export default User;