import chai from 'chai';
const expect = chai.expect;

import {roomServicesTestData, roomsTestData, bookingsTestData} from './test-data/hotel-test-data';
import userTestData from './test-data/user-test-data';

import Manager from '../src/Manager';
import Hotel from '../src/Hotel';
import User from '../src/User';
import moment from 'moment';



describe('User', function() {
	let manager;
	let hotel;

	beforeEach(() => {
		manager = new Manager(userTestData);
		hotel = new Hotel(bookingsTestData, roomServicesTestData, roomsTestData);
	});
	
  it('manager should be an instance of User class', function() {
    expect(manager.users[0]).to.be.an.instanceOf(User);
	});
	
	it('should be able to sign in', function() {
		expect(manager.users[0].signIn('customer1', 'overlook2020')).to.equal(true);
	});

	it('should be able find total spent on rooms', function() {
		manager.users[0].findMyBookings(hotel.bookings, hotel.rooms);
		expect(manager.users[0].findRoomTotal(hotel.rooms)).to.equal(866.35);
	});

	it('should find all bookings made', function() {
		manager.users[0].findMyBookings(hotel.bookings, hotel.rooms);
		expect(manager.users[0].myBookings).to.deep.equal([hotel.bookings[0], hotel.bookings[1], hotel.bookings[2]])
	});

	it('should be able to book a room', function() {
		manager.users[0].bookRoom({
			userID: manager.users[0].id, 
			date: `${moment().format('YYYY/MM/DD')}`, 
			roomNumber: 1, 
			roomServiceCharges: []
		});
		expect(manager.users[0].myBookings[0].roomNumber).to.equal(1);
		expect(manager.users[0].myBookings[0].date).to.equal(moment().format('YYYY/MM/DD'));
		expect(manager.users[0].myBookings[0].roomServiceCharges).to.deep.equal([]);
	});
});