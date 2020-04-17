import $ from 'jquery';

import './css/base.scss';
import './images/door.jpg';
import './images/breakfast.jpg';
import './images/lunch.jpg';
import './images/dinner.jpg';
import './images/dessert.jpg';
import './images/pool.jpg';
import './images/residential.jpg';
import './images/junior.jpg';
import './images/suite.jpg';
import './images/single.jpg';
import './images/hallway.jpg';
import './images/gym.jpg';

import User from './User';
import Manager from './Manager';
import { manager, currentUser } from './index'



const dom = {

	userLogin() {
		 manager.users.find(user => {
			return user.signIn($('.username').val(), $('.password').val());

		})
		// console.log(manager.users[0].signIn('customer1', 'overlook2020'))
		
		// currentUser = correct;
	},

	displayUserView() {
		$('.login-box').addClass('hide');
		$('.user-view').removeClass('hide');
	},
	
	displayManagerView() {
		
	}

}

export default dom;