import { getData } from './scripts.js';
import { bookingData } from './scripts.js';

function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then((response) =>
    response.json()
  );
}

function addBooking(room, customer, date) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID: customer,
      date: date,
      roomNumber: room,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => bookingData.push(response.newBooking));
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status} StatusText: ${response.status.text}`
    );
  }
  return response.json();
}

export { fetchData, addBooking };
