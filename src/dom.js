import $ from 'jquery';
import moment from 'moment';
import datepicker from 'js-datepicker';
import { capitalize } from './util';

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
	hotel,
	postBooking,
	deleteBooking,
	updateHotelBookings
} from './index'
import state from './state';


const dom = {

	bindEventListeners() {
		$('.sign-in').on('click', dom.handleUserLogin);
		$('.book-room-button').on('click', dom.displayMakeBookingDashboard);
		$('.search-rooms-button').on('click', dom.displayAvailableRoomsByDate);
		$('.make-booking-dashboard').on('click', dom.submitBooking);
		$('.searchbar').on('keyup', dom.filterByRoomType);
		$('.view-bookings-button').on('click', dom.displayMyBookings);
		$('.search-users-button').on('click', dom.findUser);
		$('.manager-dashboard-main').on('click', dom.cancelBooking);

	},

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

	displayUserView(e) {
		$('.login-box').addClass('hide');
		$('.user-view').removeClass('hide');
		$('.customer-main-dashboard').removeClass('hide');
		$('.make-booking-dashboard').addClass('hide');
		$('.customer-welcome').text(`Welcome ${state.currentUser.name}`);
	},

	displayMyBookings() {
		$('.my-bookings').empty();
		$('.make-booking-dashboard').addClass('hide');
		$('.customer-main-dashboard').removeClass('hide');
		state.updateCurrentUserBookings();
		$('.my-bookings').append('<h3>My Bookings:</h3>');
		$('.my-bookings').append(`<h3>Total spent: $${state.currentUser.findRoomTotal(state.currentHotel.rooms)}</h3>`);
		state.currentUser.myBookings.forEach(booking => {
			$('.my-bookings').append(`
				<p>Date: ${booking.date}, Room Type: ${booking.roomType}</p>
				<button class="cancel-booking-button" id=${booking.id}>Cancel</button>
			`);
		});
	},

	displayMakeBookingDashboard(e) {
		$('.customer-main-dashboard').addClass('hide');
		$('.make-booking-dashboard').removeClass('hide');
		dom.setDateFromNow();
	},

	setDateFromNow() {
		let searchDate = datepicker('#booking-date-input', {
			formatter: (input, date, minDate) => {
				minDate = new Date();
				const value = moment(date).format('YYYY/MM/DD');
				// const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
				input.value = value;
				console.log(value)
			},
			minDate: new Date()
		});
	},

	displayAvailableRoomsByDate(e) {
		if ($('#booking-date-input').val() === '') {
			alert('Please pick a date');
			return;
		}
		dom.clearRoomSearchResults(e);
		state.updateCurrentUserBookings();
		let totalAvailableRooms = state.currentHotel.findAvailableRooms(state.dateChoice);

		state.updateState({
			dateChoice: $('#booking-date-input').val()
		});
		if (!totalAvailableRooms) {
			$('.room-search-results').append(`
				<p>Unfortunately, we have no rooms available for this date. To make up for it, our janitor,
					Rory "Two-toes" Jenkins, will give you a foot massage free of charge! Please call to schedule it at your 
					earliest convenience and show up to the appointed meeting spot behind the dumpster</p>
			`);
		}
		$('.room-search-results').append(`
			<p class="description">All bullet holes have been filled recently, so no more drafts at night!
			If the windows aren't boarded up, they give a lovely view of the local landfill!</p>
			<p>Click an image to choose one of our lovely rooms:</p>
		`);
		dom.findAvailableRoomTypes(totalAvailableRooms).forEach(type => {
			$('.room-search-results').append(`
				<label id="${type.split(' ').join('-')}" class="image-radio">
					<input type="radio" name="room" value="${type}">
					<img class="${type}" src="./images/${type}.jpg" alt=""/>
					<p>${capitalize(type)}</p>
				</label>
			`);
		});
		$('.room-search-results').append(`
		<button type="button" class="submit-booking-button">Submit with these choices</button>
	`);
	},

	filterByRoomType() {
		if ($('.searchbar').val() == '') {
			$('.image-radio').removeClass('hide');
		}
		if ($('.searchbar').val() !== '') {
			let searchString = $('.searchbar').val().toLowerCase().split(' ').join('-');
			$('.image-radio').addClass('hide');
			$(`#${searchString}`).removeClass('hide');
		}
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
		let totalAvailableRooms = state.currentHotel.findAvailableRooms(state.dateChoice);
		let roomType = $(`form input[type="radio"]:checked`).val();

		if ($(e.target).attr('class') === 'submit-booking-button') {
			if (roomType) {
				let booking = state.currentUser.bookRoom({
					userID: state.currentUser.id,
					date: `${state.dateChoice}`,
					roomNumber: state.currentHotel.pickRoomNumber(totalAvailableRooms, roomType)
				});
				dom.displayUserView(e);
				dom.clearRoomSearchResults(e);
				postBooking(booking);
				setTimeout(updateHotelBookings, 300);
				$('.my-bookings').empty();
			} else {
				alert('Please click a room picture to make a choice');
			}
		}
	},

	clearRoomSearchResults() {
		$('.room-search-results').empty();
		$('#booking-date-input').val() === '';
	},

	// manager view functions (move to separate file?)

	displayManagerView(e) {
		$('.login-box').addClass('hide');
		$('.manager-view').removeClass('hide');
		dom.displayManagerDashboard();
	},

	displayManagerDashboard(e) {
		$('.manager-dashboard-info').append(`
		<h3>${moment().format('MMMM Do YYYY')}</h3>
			<p>Total rooms available today: ${state.currentHotel.findAvailabilityToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Total revenue for today: $${state.currentHotel.findRevenueToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Percentage of rooms occupied today: ${state.currentHotel.findOccupiedToday(moment().format('YYYY/MM/DD'))}%</p>
			<h4>To do today:</h4>
			<ul>
				<li>Tell Pete to stop being so sweaty around the customers</li>
				<li>Inform Linda that she needs to fight with her boyfriend off company grounds</li>
				<li>Tell the guests in room 23 to stop watching Sesame Street at 4am and singing along so loudly</li>
			</ul>
			`);
	},

	findUser(e) {
		let searchInput = $('.search-users').val();
		let searchedUser = state.currentUser.findUserByName(searchInput);
		searchedUser.findMyBookings(state.currentHotel.bookings, state.currentHotel.rooms);
		dom.displaySearchedUsersBookings(searchedUser)
	},

	displaySearchedUsersBookings(user) {
		$('.manager-dashboard-main').append(`<h3>${user.name}'s bookings:</h3>`);
		$('.manager-dashboard-main').append(`<h3>Total spent: $${user.findRoomTotal(state.currentHotel.rooms)}</h3>`);
		console.log(user)
		user.myBookings.forEach(booking => {
			$('.manager-dashboard-main').append(`
				<p>Date: ${booking.date}, Room Type: ${booking.roomType}</p>
				<button class="cancel-booking-button" id=${booking.id} data-date="${booking.date}">Cancel Booking</button>
			`);
		});
	},

	addUpcomingBookingForUser() {

	},

	cancelBooking(e) {
		if ($(e.target).hasClass('cancel-booking-button')) {
			let cancelDate = $(e.target).data('date').split('/').join('-');
			if (moment(cancelDate).diff(moment()) > 0) {
				let bookingId = $(e.target).attr('id');
				let bookingToCancel = state.currentHotel.findBookingByID(bookingId);
				deleteBooking(bookingToCancel);
			}
		}
	}

}

export default dom;