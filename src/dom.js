import $ from 'jquery';

import './css/base.scss';
import './images/door.jpg';
import './images/breakfast.jpg';
import './images/lunch.jpg';
import './images/dinner.jpg';
import './images/dessert.jpg';
import './images/pool.jpg';
import './images/residential.jpg';
import './images/junior.jpg';
import './images/suite.jpg';
import './images/single.jpg';
import './images/hallway.jpg';
import './images/gym.jpg';

var moment = require('moment');

import {
	manager,
	hotel
} from './index'
import state from './state';


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

	displayUserView() {
		$('.login-box').addClass('hide');
		$('.user-view').removeClass('hide');
		$('.customer-welcome').text(`Welcome ${state.currentUser.name}`);
		dom.displayMyBookings();
	},

	displayManagerView() {
		$('.login-box').addClass('hide');
		$('.manager-view').removeClass('hide');
		dom.displayManagerDashboard();
	},

	displayMyBookings() {
		$('.my-bookings').append('<h3>My Bookings:</h3>');
		$('.my-bookings').append(`<h3>Total spent: $${state.currentUser.findRoomTotal(state.currentHotel.rooms)}</h3>`);
		state.currentUser.myBookings.forEach(booking => {
			$('.my-bookings').append(`
				<p>Date: ${booking.date}, Room Type: ${booking.roomType}</p>
			`);
		});
	},
	
	displayManagerDashboard() {
		$('.manager-dashboard').append(`
		<h3>${moment().format('MMMM Do YYYY')}</h3>
			<p>Total rooms available today: ${state.currentHotel.findAvailabilityToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Total revenue for today: $${state.currentHotel.findRevenueToday(moment().format('YYYY/MM/DD'))}</p>
			<p>Percentage of rooms occupied today: ${state.currentHotel.findOccupiedToday(moment().format('YYYY/MM/DD'))}%</p>
		`);
		let a = moment().format('YYYY/MM/DD');

	}

}

export default dom;