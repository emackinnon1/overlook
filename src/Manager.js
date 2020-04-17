import User from './User'
import dom from './dom';


class Manager {
	constructor(data) {
		this.username = 'manager';
		this.password = 'overlook2020';
		this.allBookings = [];
		this.makeUsers(data);
	}

	makeUsers(userData) {
		let array = userData.map(currentUser => {
			let user = new User(currentUser);
			return user;
		})
		this.users = array;
	}

	signIn(usernameInput, passwordInput) {
		if (usernameInput === this.username && passwordInput === this.password) {
			dom.displayManagerView();
			return true;
		} else {
			return false;
		}
	}
}


	export default Manager;