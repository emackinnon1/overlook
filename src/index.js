import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'

/* 
Iteration Uno
set up promise.all
make userRepo function
login welcome window



class structure
users

	

*/
$('window').on('load', retrieveAllData)

let roomsData;
let bookingsData;
let roomServicesData;
let usersData;

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

setTimeout(print, 300)

function print() {
	console.log(roomsData)
	console.log(bookingsData)
	console.log(roomServicesData)
	console.log(usersData)
}