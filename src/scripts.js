// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turks-beach.png';
import './images/star-fish.png';

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
const totalSpent = document.querySelector('.total-spent');

window.addEventListener('load', returnData);
checkRatesBtn.addEventListener('click', renderCheckInPage);
rewardsBtn.addEventListener('click', renderRewardsPage);
reservationBtn.addEventListener('click', renderReservationsPage);
signInBtn.addEventListener('click', renderSignInForm);
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  // if (username === 'customer50' && password === 'overlook2021') {
  currentCustomer = new Customer(customerData);
  show(beachImage);
  hide(loginHolder);
  show(reservationBtn);
  show(rewardsBtn);
  show(checkRatesBtn);
  // } else {
  //   loginErrorMsg.style.opacity = 1;
  // }
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
    // user = promiseArray[3];
    // console.log(customerData);
    // console.log(roomData);
    // console.log(bookingData);
    console.log(promiseArray);
    // customer = new Customer();
    // hotel = new Hotel();
    instantiateData();
    // displayDestinationList();
  });
}

function instantiateData() {
  let allCustomers = customerData.map((customer) => {
    return new Customer(customerData);
  });
  hotel = new Hotel(roomData, bookingData, allCustomers);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function renderCheckInPage() {
  hide(totalSpent);
  console.log('this is checkin page');
}

function renderSignInForm() {
  hide(signInBtn);
  hide(beachImage);
  show(loginHolder);
}
console.log('This is the JavaScript entry file - your code begins here.');

function renderReservationsPage() {
  hide(totalSpent);
  console.log('this is reservation page');
}

function renderRewardsPage(hotel) {
  totalSpent.innerHTML = `
    <p>You have spent ${hotel.calculateCustomerTripTotals} this year.</p>
    <p>You have ${hotel.calculateCustomerTripTotals} points to redeem for future stays</p>`;
  console.log(hotel.calculateCustomerTripTotals);
  show(beachImage);
  show(totalSpent);
  console.log('this is rewards page');
}
