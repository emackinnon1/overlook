import $ from 'jquery';
import dom from './dom.js';
import Manager from './Manager';
import Hotel from './Hotel';
import state from './state.js';

export let manager, hotel, roomsData;

function retrieveAllData() {
	Promise.all([
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json())
		])
		.then(data => makeHotel(data[0].rooms, data[1].bookings, data[2].roomServices, data[3].users))
		.then(dom.bindEventListeners())
		.catch(error => console.log(error));
}

function makeHotel(rooms, bookings, roomServices, users) {
	manager = new Manager(users)
	hotel = new Hotel(bookings, roomServices, rooms);
	state.updateState({currentHotel: hotel});
}

export function postBooking(post) {
	fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(post)
	})
	.then(response => response.json())
	// .then(setTimeout(updateHotelBookings, 300))
	.catch(err => console.error(err))
}

export function updateHotelBookings() {
	fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
	.then(response => response.json())
	.then(data => state.currentHotel.bookings = data.bookings)
	.then(state.updateCurrentUserBookings())
	.catch(err => console.error(err))
}

export function deleteBooking(post) {
		fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(post)
		})
		.then(response => response.json())
		.then(setTimeout(updateHotelBookings, 300))
		.catch(err => console.error(err))

}

retrieveAllData();

