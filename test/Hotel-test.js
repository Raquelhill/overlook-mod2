// import chai from 'chai';
// const expect = chai.expect;
import { assert } from 'chai';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import sampleCustomerData from '../src/sample-data/sample-customer-data';
import sampleRoomData from '../src/sample-data/sample-room-data';
import sampleBookingData from '../src/sample-data/sample-booking-data';

describe('Hotel', () => {
  let hotel;

  beforeEach(function () {
    hotel = new Hotel(sampleRoomData, sampleBookingData, sampleCustomerData);
  });

  it('Should be a function', () => {
    assert.isFunction(Hotel);
  });

  it('Should be an instance of hotel', () => {
    assert.instanceOf(hotel, Hotel);
  });

  it('Should be able to hold rooms data', () => {
    assert.deepEqual(hotel.rooms, sampleRoomData);
  });

  it('Should be able to hold bookings data', () => {
    assert.deepEqual(hotel.bookings, sampleBookingData);
  });

  it('Should be able to hold customer data', () => {
    assert.deepEqual(hotel.customers, sampleCustomerData);
  });

  it('Should be able to find and store current customer', () => {
    hotel.findCurrentCustomer(1);
    assert.isFunction(hotel.findCurrentCustomer);
    assert.equal(hotel.currentCustomer.name, 'Leatha Ullrich');
  });

  it('Should be able to find and store a current customers bookings', () => {
    hotel.findCurrentCustomer(1);
    hotel.returnCustomerBookings();
    assert.isFunction(hotel.returnCustomerBookings);
    assert.deepEqual(hotel.currentCustomerBooking, [
      {
        date: '2020/02/05',
        id: '5fwrgu4i7k55hl6t8',
        roomNumber: 3,
        roomServiceCharges: [],
        userID: 1,
      },
    ]);
  });

  it('Should store available rooms in an array', () => {
    assert.deepEqual(hotel.availableRooms, []);
  });

  it('Should be able to calculate a customer booking total', () => {
    hotel.findCurrentCustomer(1);
    hotel.returnCustomerBookings();
    assert.equal(hotel.calculateCustomerBookingsTotals(), 491.14);
  });

  it('Should be able to return available rooms by date', () => {
    assert.deepEqual(
      hotel.returnAvailableRoomsByDate('2020/01/10', '2020/02/16'),
      [
        {
          bedSize: 'queen',
          bidet: true,
          costPerNight: 358.4,
          numBeds: 1,
          number: 1,
          roomType: 'residential suite',
        },
        {
          bedSize: 'full',
          bidet: false,
          costPerNight: 477.38,
          numBeds: 2,
          number: 2,
          roomType: 'suite',
        },
        {
          bedSize: 'queen',
          bidet: false,
          costPerNight: 429.44,
          numBeds: 1,
          number: 4,
          roomType: 'single room',
        },
        {
          bedSize: 'queen',
          bidet: true,
          costPerNight: 340.17,
          numBeds: 2,
          number: 5,
          roomType: 'single room',
        },
      ]
    );
  });

  it('Should be able to filter available rooms by room type', () => {
    hotel.returnAvailableRoomsByDate('2020/01/10', '2020/02/16');
    assert.deepEqual(
      hotel.filterRoomsByType('suite', '2020/01/10', '2020/02/16'),
      [
        {
          bedSize: 'full',
          bidet: false,
          costPerNight: 477.38,
          numBeds: 2,
          number: 2,
          roomType: 'suite',
        },
      ]
    );
  });
});
