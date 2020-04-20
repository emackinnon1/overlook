import $ from 'jquery';
import moment from 'moment';
import datepicker from 'js-datepicker';

import './css/base.scss';
import './images/door.jpg';
import './images/breakfast.jpg';
import './images/lunch.jpg';
import './images/dinner.jpg';
import './images/dessert.jpg';
import './images/pool.jpg';
import './images/hallway.jpg';
import './images/gym.jpg';
import './images/junior suite.jpg';
import './images/suite.jpg';
import './images/single room.jpg';
import './images/residential suite.jpg';


import {
	manager,
	hotel
} from './index'
import state from './state';

const searchDate = datepicker('#booking-date-input', {
	formatter: (input, date, instance) => {
		const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
		input.value = value;
	}
});


const dom = {

	handleUserLogin(e) {
		if (manager.signIn($('.username').val(), $('.password').val())) {
			state.updateState({
				currentUser: manager,
				currentHotel: hotel
			})
			dom.displayManagerView();
		} else if (manager.users.find(user => user.signIn($('.username').val(), $('.password').val()))) {
			let signedInUser = manager.users.find(user => user.signIn($('.username').val(), $('.password').val()));
			state.updateState({
				currentUser: signedInUser,
				currentHotel: hotel
			});
			dom.displayUserView();
		} else {
			alert('Your username or password is incorrect!');
		}
	},

	updateState(stateData) {
		state.currentUser = stateData.currentUser || state.currentUser;
		state.currentHotel = stateData.currentHotel || state.currentHotel;
	},

	displayUserView(e) {
		$('.login-box').addClass('hide');
		$('.user-view').removeClass('hide');
		$('.customer-welcome').text(`Welcome ${state.currentUser.name}`);
		dom.displayMyBookings();
	},

	displayMakeBookingDashboard(e) {
		$('.customer-main-dashboard').addClass('hide');
		$('.make-booking-dashboard').removeClass('hide');
	},

	displayAvailableRoomsByDate(e) {
		state.dateChoice = $('#booking-date-input').val();
		let totalAvailableRooms = state.currentHotel.findAvailableRooms(state.dateChoice);
		if (!totalAvailableRooms) {
			$('.make-booking-dashboard').append(`
				<p>Unfortunately, we have no rooms available for this date. To make up for it, our janitor,
					Rory "Two-toes" Jenkins will give you a foot massage free of charge! Please call to schedule it at your 
					earliest convenience and show up to the appointed meeting spot behind the dumpster</p>
			`);
		}

		$('.make-booking-dashboard').append(`
			<p class="description">All bullet holes have been filled recently, so no more drafts at night!
			If the windows aren't boarded up, they give a lovely view of the local landfill!</p>
			<p>Click an image to choose one of our lovely rooms:</p>
		`);

		dom.findAvailableRoomTypes(totalAvailableRooms).forEach(type => {
			$('.make-booking-dashboard').append(`
				<label class="image-radio">
					<input type="radio" name="room" value="${type}">
					<img id="${type}" src="./images/${type}.jpg" alt="" />
				</label>
				<p>${dom.capitalize(type)}</p>
			`);
		});

		$('.make-booking-dashboard').append(`
		<button type="button" class="submit-booking-button">Submit with these choices</button>
	`);
	},

	capitalize(str) {
		str = str.split(" ");
		for (var i = 0, x = str.length; i < x; i++) {
			str[i] = str[i][0].toUpperCase() + str[i].substr(1);
		}
		return str.join(" ");
	},

	findAvailableRoomTypes(listOfRooms) {
		return listOfRooms.reduce((acc, room) => {
			if (!acc.includes(room.roomType)) {
				acc.push(room.roomType);
			}
			return acc;
		}, []);
	},

	submitBooking(e) {
		let availableRooms = state.hotel.findAvailableRooms(state.dateChoice);
		let roomType;
		if ($(e.target).attr('class') === 'submit-booking-button') {
			state.currentUser.bookRoom({
				userID: `${state.currentUser.id}`,
				date: `${state.currentDate}`,
				roomNumber: `${state.hotel}`
			});
		}
	},

	displayManagerView(e) {
		$('.login-box').addClass('hide');
		$('.manager-view').removeClass('hide');
		dom.displayManagerDashboard();
	},

	displayMyBookings(e) {
		$('.my-bookings').append('<h3>My Bookings:</h3>');
		$('.my-bookings').append(`<h3>Total spent: $${state.currentUser.findRoomTotal(state.currentHotel.rooms)}</h3>`);
		state.currentUser.myBookings.forEach(booking => {
			$('.my-bookings').append(`
				<p>Date: ${booking.date}, Room Type: ${booking.roomType}</p>
				<button class="cancel-booking-button" id=${booking.id}>Cancel</button>
			`);
		});
	},

	displayManagerDashboard(e) {
		$('.manager-dashboard').append(`
		<h3>${moment().format('MMMM Do YYYY')}</h3>
			<p>Total rooms available today: ${state.currentHotel.findAvailabilityToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Total revenue for today: $${state.currentHotel.findRevenueToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Percentage of rooms occupied today: ${state.currentHotel.findOccupiedToday(moment().format('YYYY/MM/DD'))}%</p>
		`);
	},


}

export default dom;