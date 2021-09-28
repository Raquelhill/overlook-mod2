// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/main.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turks-beach.png';
import './images/transparent-starfish.png';
import './images/resort-room.png';

// import APIRequests from './apiCalls';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
let dayjs = require('dayjs');

// fetch calls & data variables
import { addBooking, fetchData, updateBookings } from './apiCalls';
// import domUpdates from './domUpdates';
const checkAvailabilityBtn = document.querySelector(
  '.check-availability-button'
);
const checkRatesBtn = document.querySelector('.check-rates-button');
const reservationBtn = document.querySelector('.reservation-button');
const rewardsBtn = document.querySelector('.yearly-expense-button');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-form-submit');
const signInBtn = document.getElementById('sign-in-button');
// const bookNowButton = document.getElementById('book-now-button');
const loginErrorMsg = document.getElementById('login-error-msg');
const beachImage = document.querySelector('.beach-image');
const loginHolder = document.getElementById('login-holder');
const customerInfoDisplay = document.querySelector('.customer-info-display');
const checkRatesDropDownDisplay = document.querySelector('.dropdown-content');
const arrivalDate = document.getElementById('arrival');
const departureDate = document.getElementById('departure');
const roomType = document.getElementById('room-type');
const availableRoomsCards = document.querySelector('#availableRoomsCards');
//create variables for checkin and checkout
//add query slectore for each calendar checkInDate.value and set it to a varaibles in your check date function
//use a split and a join to make the values look like API

window.addEventListener('load', returnData);
customerInfoDisplay.addEventListener('click', function (event) {
  if (event.target.className === 'book-now-button') {
    bookRoom(event);
  }
});
// bookNowButton.addEventListener('click', hello);
checkAvailabilityBtn.addEventListener('click', checkAvailability);
checkRatesBtn.addEventListener('click', renderBookingPage);
rewardsBtn.addEventListener('click', renderRewardsPage);
reservationBtn.addEventListener('click', renderReservationsPage);
signInBtn.addEventListener('click', renderSignInForm);
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  let inputId = username.substring(8);
  hotel.findCurrentCustomer(inputId);
  if (hotel.currentCustomer && password === 'overlook2021') {
    currentCustomer = hotel.currentCustomer;
    show(beachImage);
    hide(loginHolder);
    show(reservationBtn);
    show(rewardsBtn);
    show(checkRatesBtn);
  } else {
    loginErrorMsg.style.opacity = 1;
  }
});

//Global variables
let customerData, roomData, currentCustomer, bookingDate, hotel;
export let bookingData = null;

export function getData() {
  return Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ]);
}

export function returnData() {
  getData().then((promiseArray) => {
    customerData = promiseArray[0].customers;
    roomData = promiseArray[1].rooms;
    bookingData = promiseArray[2].bookings;
    // customerId = promiseArray[3];
    instantiateData();
  });
}

function instantiateData() {
  let customers = customerData.map((customer) => {
    return new Customer(customer);
  });

  console.log(customers);
  hotel = new Hotel(roomData, bookingData, customers);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function renderBookingPage() {
  show(customerInfoDisplay);
  show(checkRatesBtn);
  checkRatesDropDownDisplay.classList.add('show');
}

function renderSignInForm() {
  hide(signInBtn);
  hide(beachImage);
  show(loginHolder);
}

function renderReservationsPage() {
  checkRatesDropDownDisplay.classList.remove('show');
  show(customerInfoDisplay);
  customerInfoDisplay.innerHTML = '';
  hotel.returnCustomerBookings();
  hotel.currentCustomerBooking.forEach((booking) => {
    let reservedRoom = hotel.rooms.find((room) => {
      return room.number === booking.roomNumber;
    });

    customerInfoDisplay.innerHTML += `
        <section class="hotel-room-cards">
        <img class="hotel-room-image" src="./images/resort-room.png" alt"beach-front-hotel-room">
          <article class="resort-room-info">
            <p class="room-title">OCEANVIEW ${reservedRoom.roomType.toUpperCase()}</p>
            <p>BED OPTIONS</p> 
            <p>${reservedRoom.numBeds} ${reservedRoom.bedSize}</p>
            <p>AMENITIES</p> 
            <ul>
              <li>Generously stocked refrigerated private bar</li>
              <li>Bidet: ${reservedRoom.bidet}</li>
              <li>Twice-daily housekeeping service and evening ice delivery</li>
            </ul> 
            <p>ROOM # ${booking.roomNumber}</p>
            <p>RESERVED</p> 
            <p>${booking.date}</p>
            <p>from $${reservedRoom.costPerNight.toFixed(2)} per night</p>
          </article>
        </section>`;
  });
}

function renderRewardsPage() {
  checkRatesDropDownDisplay.classList.remove('show');
  customerInfoDisplay.innerHTML = `
    <p>You have spent $${hotel.calculateCustomerBookingsTotals()} this year.</p>
    <p>You have ${hotel.calculateCustomerBookingsTotals()} points to redeem for future stays</p>`;
  show(customerInfoDisplay);
}

function checkAvailability() {
  event.preventDefault();
  let arrivalDateInput = arrivalDate.value.split('-').join('/');
  let departureDateInput = departureDate.value.split('-').join('/');
  let selectedRoomType = roomType.value;
  roomData = hotel.returnAvailableRoomsByDate(
    arrivalDateInput,
    departureDateInput
  );
  roomData = hotel.filterRoomsByType(
    selectedRoomType,
    arrivalDateInput,
    departureDateInput
  );
  renderAvailableBookings();
}

function renderAvailableBookings() {
  checkRatesDropDownDisplay.classList.remove('show');
  customerInfoDisplay.innerHTML = '';
  roomData.forEach((room) => {
    customerInfoDisplay.innerHTML += `
        <section class="hotel-room-cards" id="${room.number}">
        <img class="hotel-room-image" src="./images/resort-room.png" alt"beach-front-hotel-room">
          <article class="resort-room-info">
            <p class="room-title"> OCEANVIEW ${room.roomType.toUpperCase()}</p>
            <p>BED OPTIONS</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>AMENITIES</p> 
            <ul>
              <li>Generously stocked refrigerated private bar</li>
              <li>Bidet: ${room.bidet}</li>
              <li>Twice-daily housekeeping service and evening ice delivery</li>
            </ul> 
            <p>ROOM # ${room.number}</p>
            <p>$${room.costPerNight.toFixed(2)} per night </p>
          </article>
          <button class="book-now-button" id="book-now-button">BOOK NOW</button>
        </section>`;
  });
}

function bookRoom(event) {
  event.preventDefault();
  hide(customerInfoDisplay);
  let bookingDate = arrivalDate.value.split('-').join('/');
  let bookingRoomNumber = Number(event.target.closest('section').id);
  addBooking(bookingRoomNumber, currentCustomer.id, bookingDate)
    .then(hotel.returnCustomerBookings())
    .then(hotel.calculateCustomerBookingsTotals());
}
