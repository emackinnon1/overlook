import chai from 'chai';
const expect = chai.expect;

import {roomServicesTestData, roomsTestData, bookingsTestData} from './test-data/hotel-test-data';
import userTestData from './test-data/user-test-data';

import Manager from '../src/Manager';
import Hotel from '../src/Hotel';

describe('Manager', function() {
	let manager;
	let hotel;

	beforeEach(() => {
		manager = new Manager(userTestData);
		hotel = new Hotel(bookingsTestData, roomServicesTestData, roomsTestData);
	});

  it('should be an instance of Manager class', function() {
		expect(manager).to.be.an.instanceOf(Manager);
	});
	
	it('should find a user by name', function() {
		expect(manager.findUserByName('Rocio Schuster')).to.deep.equal(manager.users[1]);
		expect(manager.findUserByName('rocio schuster')).to.deep.equal(manager.users[1]);
	});

});
