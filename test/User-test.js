import chai from 'chai';
const expect = chai.expect;

import userTestData from './test-data/user-test-data';
import Manager from '../src/Manager';


describe('See if the tests are running', function() {
	let manager;
	console.log(userTestData)

	beforeEach(() => {
		manager = new Manager(userTestData);
		console.log(manager)
	});
	
  it.only('should return true', function() {
    expect(true).to.equal(true);
  });
});