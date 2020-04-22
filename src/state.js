import $ from 'jquery';
import moment from 'moment';

const state = {
	currentUser: null,
	currentHotel: null,
	currentDate: null,

	updateState: (stateData) => {
		state.currentUser = stateData.currentUser || state.currentUser;
		state.currentHotel = stateData.currentHotel || state.currentHotel;
		state.dateChoice = stateData.dateChoice || state.dateChoice;
		state.updateCurrentUserBookings();
	},

	updateCurrentUserBookings() {
		if (state.currentUser === null || state.currentUser.username === 'manager') {
			return;
		}
		if (state.currentUser.id) {
			state.currentUser.findMyBookings(state.currentHotel.bookings, state.currentHotel.rooms);
		}
	},
}

export default state;