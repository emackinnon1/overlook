import $ from 'jquery';

const state = {
	currentUser: null,
	currentHotel: null,

	updateState: (stateData) => {
		state.currentUser = stateData.currentUser || state.currentUser;
		state.currentHotel = stateData.currentHotel || state.currentHotel;
		state.updateCurrentUserBookings()
	},

	updateCurrentUserBookings() {
		state.currentUser.findMyBookings(state.currentHotel.bookings);
	},
}

export default state;