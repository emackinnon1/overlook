import Booking from '../src/Booking';
import RoomService from '../src/RoomService';
import Room from '../src/Room';

class Hotel {
	constructor(bookings, roomServices, rooms) {
		this.bookings = this.makeBookings(bookings);
		this.roomServices = this.makeRoomServices(roomServices);
		this.rooms = this.makeRooms(rooms);
	}

	makeBookings(bookingsData) {
		return bookingsData.map(currentBooking => {
			let booking = new Booking(currentBooking);
			return booking;
		});
	}

	makeRoomServices(roomServicesData) {
		return roomServicesData.map(currentService => {
			let roomService = new RoomService(currentService);
			return roomService;
		});
	}

	makeRooms(roomsData) {
		return roomsData.map(currentRoom => {
			let room = new Room(currentRoom);
			return room;
		});
	}

	getBookingsByDate(date) {
		return this.bookings.reduce((acc, booking) => {
			if (booking.date === date) {
				acc.push(booking);
			}
			return acc;
		}, []);
	}

	findAvailabilityToday(date) {
		return (this.rooms.length - this.getBookingsByDate(date).length)
	}

	findRevenueToday(date) {
		let total = this.getBookingsByDate(date).reduce((acc, booking) => {
			this.rooms.forEach(room => {
				if (booking.roomNumber === room.number) {
					acc += room.costPerNight;
				}
			})
			return acc;
		}, 0)

		return Number(total.toFixed(2));
	}

	findOccupiedToday(date) {
		let percent = (this.getBookingsByDate(date).length / this.rooms.length) * 100;
		return Number(percent.toFixed(2));
	}

	findAvailableRooms(date) {
		let bookedRooms = this.rooms.filter(room => {
			return this.getBookingsByDate(date).find(booking => {
				return room.number === booking.roomNumber;
			});
		});

		return this.rooms.filter(room => {
			return !bookedRooms.find(booked => room.number === booked.number);
		});
	}

	pickRoomNumber(availableRooms, chosenRoomType) {
		let pickedRoom = availableRooms.find(room => room.roomType === chosenRoomType);
		return pickedRoom.number;
	}

	findBookingByID(id) {
		return this.bookings.find(booking => booking.id == id)
	}

}

export default Hotel;