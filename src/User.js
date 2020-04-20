import Booking from './Booking';

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

	findMyBookings(bookingsData, roomsData) {
		this.myBookings = bookingsData.filter(booking => booking.userID === this.id);
		this.findBookingRoomType(roomsData);
	}

	findBookingRoomType(roomsList) {
		this.myBookings.forEach(booking => {
			roomsList.forEach(room => {
				if (room.number === booking.roomNumber) {
					booking.roomType = room.roomType;
				}
			});
		});
	}

	bookRoom(data) {
		let booking = new Booking(data);
		this.myBookings.push(booking);
		return booking;
	}

}



export default User;