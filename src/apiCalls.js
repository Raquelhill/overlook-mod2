function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then((response) =>
    response.json()
  );
}

function updateBookings(userID, date, roomNumber) {
  return fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID,
      date,
      roomNumber,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => checkResponse(response))
    .catch((error) => console.warn(error));
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status} StatusText: ${response.status.text}`
    );
  }
  return response.json();
}

export { fetchData, updateBookings };
