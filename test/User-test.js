import chai from 'chai';
const expect = chai.expect;

import userTestData from './test-data/user-test-data';
import User from '../src/User';


describe('See if the tests are running', function () {
	let user = new User(userTestData[0]);
	console.log(user)

	beforeEach(() => {
		// manager = new Manager(userTestData);
	});

	it.only('should return true', function () {
		expect(true).to.equal(true);
	});
});