import User from './User';
import {
	capitalize
} from './util';

class Manager {
	constructor(data) {
		this.username = 'manager';
		this.password = 'overlook2020';
		this.users = this.makeUsers(data);
	}

	makeUsers(userData) {
		return userData.map(currentUser => {
			let user = new User(currentUser);
			return user;
		})
	}

	signIn(usernameInput, passwordInput) {
		if (usernameInput === this.username && passwordInput === this.password) {
			return true;
		}
	}

	findUserByName(name) {
		let searchTerm = capitalize(name.toLowerCase());
		return this.users.find(user => {
			return user.name === searchTerm;
		});
	}

}



export default Manager;