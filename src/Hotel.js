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

	getTodaysBookings(date) {
    return this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
				acc.push(booking);
			}
      return acc;
    }, []);
  }

}

export default Hotel;