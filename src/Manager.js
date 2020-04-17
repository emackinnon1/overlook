import './User.js'


class Manager {
	constructor(data) {
		this.username = 'manager';
		this.password = 'overlook';
		this.users = ;
	}

	makeUsers(userData) {
		userData.map(currentUser => {
			let user = new User(currentUser);
			return user;
		});
	}
}



export default Manager;