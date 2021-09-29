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
  dateErrorArrival,
  dateErrorDeparture,
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
  setMinimumCalendarDate();
}

function instantiateData() {
  let customers = customerData.map((customer) => {
    return new Customer(customer);
  });
  hotel = new Hotel(roomData, bookingData, customers);
}

function setMinimumCalendarDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('arrival').setAttribute('min', today);
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
  if (!arrivalDate.value) {
    hide(customerInfoDisplay);
    show(dateErrorArrival);
    checkRatesDropDownDisplay.classList.add('show');
  }
  if (!departureDate.value) {
    hide(customerInfoDisplay);
    show(dateErrorDeparture);
    checkRatesDropDownDisplay.classList.add('show');
  }
  if (departureDate.value && arrivalDate.value) {
    filterBookings();
  }
}

function filterBookings() {
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
  if (roomData.length > 0) {
    renderAvailableBookings();
  } else {
    console.log(roomType.value);
    show(customerInfoDisplay);
    checkRatesDropDownDisplay.classList.remove('show');
    customerInfoDisplay.innerHTML = '';
    customerInfoDisplay.innerHTML = `
    <h2> We're sorry, there are no ${roomType.value}'s available for the dates you have requested </h2>
    <h4> If your dates are flexible, please contact our Worldwide Reservations Office or speak to a hotel reservation agent at 1 (800) 201-9580</h4>
    `;
  }
}

function renderAvailableBookings() {
  show(customerInfoDisplay);
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
}

function displayErrorMessage(error, customerInfoDisplay) {
  show(customerInfoDisplay);
  customerInfoDisplay.innerHTML = `<h2> We are sorry, our server is currently on vacation. </h2>`;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
