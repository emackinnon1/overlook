import $ from 'jquery';
import dom from './dom.js';
import User from './User';
import Manager from './Manager';
import state from './state';




$(window).on('load', retrieveAllData)
// $('.guest-sign-in').on('click', dom.handleUserLogin);
$('.sign-in').on('click', dom.handleUserLogin)

export let manager, hotel, roomsData, bookingsData, roomServicesData, usersData;

function retrieveAllData() {
	Promise.all([
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json())
		])
		.then(data => makeHotel(data[0].rooms, data[1].bookings, data[2].roomServices, data[3].users))
		.catch(error => console.log(error));
}

function makeHotel(rooms, bookings, roomServices, users) {
	manager = new Manager(users)
	// hotel = new Hotel();
	roomsData = rooms;
	bookingsData = bookings;
	roomServicesData = roomServices;
	usersData = users;
	console.log(manager)
	let types = roomsData.reduce((acc, room) => {
		if (!acc[room.roomType]) {
			acc[room.roomType] = 0;
		}
		acc[room.roomType]++;
		return acc;
	}, {})
	console.log(types)

}