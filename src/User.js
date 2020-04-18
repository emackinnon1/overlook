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
		// iterate over bookings
		// find bookings that match currentUser.id
		// iterate over rooms and pull costPerNight
		// sum costs
		console.log(this.myBookings)
		this.myBookings.reduce((acc, booking) => {
			console.log(booking);
			acc += booking
			// rooms.forEach(room => {
			// 	if (booking.roomNumber === room.number) {
			// 		acc += room.costPerNight;
			// 	}
			// })
			return acc;
		}, 0);
	}

	bookRoom() {
		let booking = new Booking();
	}
}



export default User;