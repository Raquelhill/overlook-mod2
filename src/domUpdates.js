const checkAvailabilityBtn = document.querySelector(
  '.check-availability-button'
);
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
const checkRatesDropDownDisplay = document.querySelector('.dropdown-content');
const arrivalDate = document.getElementById('arrival');
const departureDate = document.getElementById('departure');
const roomType = document.getElementById('room-type');

const domUpdates = {
  renderAvailableRoomCards(reservedRoom, booking) {
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
  },

  renderAvailableRewards(hotel) {
    customerInfoDisplay.innerHTML = `
    <p>You have spent $${hotel.calculateCustomerBookingsTotals()} this year.</p>
    <p>You have ${hotel.calculateCustomerBookingsTotals()} points to redeem for future stays</p>`;
  },

  renderAvailableBookingCards(room) {
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
  },

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
};

export default domUpdates;
