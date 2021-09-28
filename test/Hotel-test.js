// import chai from 'chai';
// const expect = chai.expect;
import { assert } from 'chai';

import Hotel from '../src/classes/Customer';
// import Customer from '../src/Customer';
// import Hotel from '../src/Hotel';
// import sampleCustomerData from '../src/sample-data/sample-customer-data';
// import sampleRoomData from '../src/sample-data/sample-room-data';
// import sampleBookingData from '../src/sample-data/sample-booking-data';
describe('Hotel', () => {
  let customer;

  beforeEach(function () {
    customer = new Hotel({
      id: 1,
      name: 'Leatha Ullrich',
    });
  });

  it('Should be a function', () => {
    assert.isFunction(Hotel);
  });

  it('Should be an instance of hotel', () => {
    assert.instanceOf(hotel, Hotel);
  });

  it('Should have an ID', () => {
    assert.equal(customer.id, 1);
  });

  it('Should have a name', () => {
    assert.equal(customer.name, 'Leatha Ullrich');
  });
});
