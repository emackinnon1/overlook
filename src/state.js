import $ from 'jquery';

const state = {
	currentUser: null,
	currentHotel: null,

	updateState: (stateData) => {
		state.currentUser = stateData.currentUser || state.currentUser;
		state.currentHotel = stateData.currentHotel || state.currentHotel;
		state.updateCurrentUserBookings()
		console.log(state)
	},

	updateCurrentUserBookings() {
		state.currentUser.findMyBookings(state.currentHotel.bookings, state.currentHotel.rooms);
	},
}

export default state;