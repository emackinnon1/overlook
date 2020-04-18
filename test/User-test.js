import chai from 'chai';
const expect = chai.expect;

import {roomServicesTestData, roomsTestData, bookingsTestData} from './test-data/hotel-test-data';
import userTestData from './test-data/user-test-data';

import Manager from '../src/Manager';
import Hotel from '../src/Hotel';



describe('User', function() {
	let manager;
	let hotel;

	beforeEach(() => {
		manager = new Manager(userTestData);
		hotel = new Hotel(bookingsTestData, roomServicesTestData, roomsTestData);
	});
	
  it('manager should be an instance of Manager class', function() {
    expect(manager).to.be.an.instanceOf(Manager);
	});
	
	it('should be able to sign in', function() {
		expect(manager.users[0].signIn('customer1', 'overlook2020')).to.equal(true);
	});

	it.only('should be able find total spent on rooms', function() {


		manager.users[0].findRoomTotal([1, 2, 3])
	});
});