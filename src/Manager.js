import './User'


class Manager {
	constructor(data) {
		this.username = 'manager';
		this.password = 'overlook';
		this.users = [];
		this.bookings = [];
	}

	makeUsers(userData) {
		userData.map(currentUser => {
			let user = new User(currentUser);
			return user;
		});
	}
}



export default Manager;