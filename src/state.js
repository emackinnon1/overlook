import $ from 'jquery';
import moment from 'moment';

const state = {
	currentUser: null,
	currentHotel: null,
	currentDate: null,

	updateState: (stateData) => {
		state.currentUser = stateData.currentUser;
		state.currentHotel = stateData.currentHotel;
		state.dateChoice = stateData.dateChoice;
		state.updateCurrentUserBookings();
		console.log(state);
	},

	updateCurrentUserBookings() {
		if (state.currentUser.id) {
			state.currentUser.findMyBookings(state.currentHotel.bookings, state.currentHotel.rooms);
		}
	},
}

export default state;