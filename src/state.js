import $ from 'jquery';
import moment from 'moment';

const state = {
	currentUser: null,
	currentHotel: null,
	currentDate: null,

	updateState: (stateData) => {
		state.currentUser = stateData.currentUser || state.currentUser;
		state.currentHotel = stateData.currentHotel || state.currentHotel;
		state.currentDate = moment().format('YYYY/MM/DD');
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