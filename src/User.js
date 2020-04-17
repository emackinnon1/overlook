import './Booking';
import dom from './dom';


class User {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.username = `customer${this.id}`
		this.password = 'overlook2020'
		this.myBookings = [];
	}

	signIn(usernameInput, passwordInput) {
		if (usernameInput === this.username && passwordInput === this.password) {
			dom.displayUserView();
			return true;
		} else {
			return false;
		}
	}

	bookRoom() {
		let booking = new Booking();
	}
}



export default User;