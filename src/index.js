import $ from 'jquery';
import dom from './dom.js';
import User from './User';
import Manager from './Manager';


/* 
Iteration Uno------------
set up promise.all
make userRepo function
login welcome window

manager login: check for values using strictly equals
customer login: check for numbers at the end and match up to userId of user. 
will be hard to test for all potential wrong usernames, but passwords will be easy with same strategy as manager credentials.

Iteration Dos------------


class structure:
manager
	-array todaysBookings that is updated with a method
users
	-myBookings 
	rooms
	roomServices
	bookings
	calculator?
	
	moment.js?
	
	*/
	$(window).on('load', retrieveAllData)
	$('.guest-sign-in').on('click', dom.userLogin)

export let manager, roomsData, bookingsData, roomServicesData, usersData, currentUser;


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
	roomsData = rooms;
	bookingsData = bookings;
	roomServicesData = roomServices;
	usersData = users;
}

setTimeout(print, 9000)

function print() {
	let types = roomsData.reduce((acc, room) => {
		//DELETE LATER
		if (!acc[room.roomType]) {
			acc[room.roomType] = 0;
		}
			acc[room.roomType]++;
			return acc;
	}, {})

	// console.log(types)
	// console.log(roomsData)
	// console.log(bookingsData)
	// console.log(roomServicesData)
	manager = new Manager(usersData);
	console.log(manager)
	console.log(currentUser)
}

