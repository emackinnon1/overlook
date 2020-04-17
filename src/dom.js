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
import { manager, currentUser, usersData } from './index'
import state from './state';



const dom = {

	handleUserLogin(e) {
		if (manager.signIn($('.username').val(), $('.password').val())) {
			state.currentUser = manager;
		} else if (manager.users.find(user => user.signIn($('.username').val(), $('.password').val()))) {
			state.currentUser = manager.users.find(user => user.signIn($('.username').val(), $('.password').val()))
		} else {
			alert('Your username or password is incorrect!');
		}
	},

	displayUserView() {
		$('.login-box').addClass('hide');
		$('.user-view').removeClass('hide');
	},
	
	displayManagerView() {
		$('.login-box').addClass('hide');
		$('.manager-view').removeClass('hide');
	}

}

export default dom;