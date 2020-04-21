import chai from 'chai';
const expect = chai.expect;

import {
	roomServicesTestData,
	roomsTestData,
	bookingsTestData
} from './test-data/hotel-test-data';
import userTestData from './test-data/user-test-data';

import Manager from '../src/Manager';
import Hotel from '../src/Hotel';

describe('Hotel', function () {
	let manager;
	let hotel;

	beforeEach(() => {
		manager = new Manager(userTestData);
		hotel = new Hotel(bookingsTestData, roomServicesTestData, roomsTestData);
	});

	it('should be an instance of Manager class', function () {
		expect(hotel).to.be.an.instanceOf(Hotel);
	});

	it('should find total rooms available for today\'s date', function () {
		expect(hotel.findAvailabilityToday('2020/01/20')).to.equal(4);
	});

	it('should find total revenue from todays date', function () {
		expect(hotel.findRevenueToday('2020/01/20')).to.equal(841.45);
	});

	it('should find the percentage of rooms occupied today', function () {
		expect(hotel.findOccupiedToday('2020/01/20')).to.equal(33.33)
	});

	it('should find available rooms for a date', function() {
		expect(hotel.findAvailableRooms('2020/01/20').length).to.equal(4);
		expect(hotel.findAvailableRooms('2020/01/20')[0]).to.deep.equal(hotel.rooms[0]);
		expect(hotel.findAvailableRooms('2020/01/20')[1]).to.deep.equal(hotel.rooms[1]);
		expect(hotel.findAvailableRooms('2020/01/20')[2]).to.deep.equal(hotel.rooms[3]);
		expect(hotel.findAvailableRooms('2020/01/20')[3]).to.deep.equal(hotel.rooms[4]);
	});

	it('should pick a room number from the available rooms according to the user\'s choice', function() {
		let availableRoomsList = hotel.findAvailableRooms('2020/01/20');

		expect(hotel.pickRoomNumber(availableRoomsList, 'single room')).to.equal(12);
	});

});