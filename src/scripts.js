import './css/main.scss';
import './images/turks-beach.png';
import './images/transparent-starfish.png';
import './images/resort-room.png';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { addBooking, fetchData } from './apiCalls';
import domUpdates from './domUpdates';

const {
  checkAvailabilityBtn,
  checkRatesBtn,
  reservationBtn,
  rewardsBtn,
  loginForm,
  loginBtn,
  signInBtn,
  loginErrorMsg,
  beachImage,
  loginHolder,
  customerInfoDisplay,
  checkRatesDropDownDisplay,
  arrivalDate,
  departureDate,
  roomType,
} = domUpdates;

let customerData, roomData, currentCustomer, hotel;
export let bookingData = null;

window.addEventListener('load', returnData);
customerInfoDisplay.addEventListener('click', function (event) {
  if (event.target.className === 'book-now-button') {
    bookRoom(event);
  }
});
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

export function getData() {
  return Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ]);
}

export function returnData() {
  getData()
    .then((promiseArray) => {
      customerData = promiseArray[0].customers;
      roomData = promiseArray[1].rooms;
      bookingData = promiseArray[2].bookings;
      instantiateData();
    })
    .catch((error) => displayErrorMessage(error, customerInfoDisplay));
}

function instantiateData() {
  let customers = customerData.map((customer) => {
    return new Customer(customer);
  });
  hotel = new Hotel(roomData, bookingData, customers);
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
    domUpdates.renderAvailableRoomCards(reservedRoom, booking);
  });
}

function renderRewardsPage() {
  checkRatesDropDownDisplay.classList.remove('show');
  domUpdates.renderAvailableRewards(hotel);
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
    domUpdates.renderAvailableBookingCards(room);
  });
}

function bookRoom(event) {
  event.preventDefault();
  hide(customerInfoDisplay);
  let bookingDate = arrivalDate.value.split('-').join('/');
  let bookingRoomNumber = Number(event.target.closest('section').id);
  addBooking(bookingRoomNumber, currentCustomer.id, bookingDate)
    .then(hotel.returnCustomerBookings())
    .then(hotel.calculateCustomerBookingsTotals())
    .catch((error) => displayErrorMessage(error, customerInfoDisplay));
  show(customerInfoDisplay);
}

function displayErrorMessage(error, container) {
  show(customerInfoDisplay);
  container.innerHTML = `<h2> We are sorry, our server is currently on vacation. </h2>`;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
