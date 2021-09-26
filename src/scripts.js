// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turks-beach.png';
import './images/transparent-starfish.png';
import './images/resort-room.png';

// import APIRequests from './apiCalls';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// fetch calls & data variables
import { fetchData, postData } from './apiCalls';
// import domUpdates from './domUpdates';
const checkRatesBtn = document.querySelector('.check-rates-button');
const reservationBtn = document.querySelector('.reservation-button');
const rewardsBtn = document.querySelector('.yearly-expense-button');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-form-submit');
const signInBtn = document.getElementById('sign-in-button');
const loginErrorMsg = document.getElementById('login-error-msg');
const beachImage = document.querySelector('.beach-image');
const loginHolder = document.getElementById('login-holder');
const customerInfoDisplay = document.querySelector('.customer-info-display');

window.addEventListener('load', returnData);
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
let customerData, roomData, bookingData, currentCustomer, customer, hotel;

function getData() {
  return Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ]);
}

function returnData() {
  getData().then((promiseArray) => {
    customerData = promiseArray[0].customers;
    roomData = promiseArray[1].rooms;
    bookingData = promiseArray[2].bookings;
    instantiateData();
  });
}

function instantiateData() {
  let customers = customerData.map((customer) => {
    return new Customer(customer);
  });
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
  console.log('this is booking page');
  customerInfoDisplay.innerHTML = '';
  customerInfoDisplay.innerHTML += `
  <p>book hotel page</p>`;
}

function renderSignInForm() {
  hide(signInBtn);
  hide(beachImage);
  show(loginHolder);
}

function renderReservationsPage() {
  hotel.returnCustomerBookings();
  show(customerInfoDisplay);
  customerInfoDisplay.innerHTML = '';
  hotel.currentCustomerBooking.forEach((booking) => {
    let reservedRoom = hotel.rooms.find((room) => {
      return room.number === booking.roomNumber;
    });
    customerInfoDisplay.innerHTML += `
        <section class="hotel-room-card">
        <img class="hotel-room-image" src="./images/resort-room.png" alt"beach-front-hotel-room"
          <article class="resort-room-info"
            <p>OCEANVIEW ${reservedRoom.roomType.toUpperCase()}</p>
            <p>BED OPTIONS</p> 
            <p>${reservedRoom.numBeds}</p> 
            <p>${reservedRoom.bedSize}</p>
            <p>AMENITIES</p> 
            <p>Generously stocked refrigerated private bar</p>
            <p>Bidet: ${reservedRoom.bidet}</p>
            <p>Twice-daily housekeeping service and evening ice delivery</p>
            <p>ROOM # ${booking.roomNumber}</p>
            <p>RESERVED</p> 
            <p>${booking.date}</p>
            <p>from $${reservedRoom.costPerNight.toFixed(2)}</p>
            <p>average per night <p>
          </article>
        </section>`;
  });
  show(customerInfoDisplay);
  console.log('this is reservation page');
}

function renderRewardsPage() {
  customerInfoDisplay.innerHTML = `
    <p>You have spent $${hotel.calculateCustomerBookingsTotals()} this year.</p>
    <p>You have ${hotel.calculateCustomerBookingsTotals()} points to redeem for future stays</p>`;
  show(customerInfoDisplay);
}
