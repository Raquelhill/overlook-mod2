function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response;
      }
    })
    .then((response) => response.json());
}

function postData(postObject) {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { fetchData, postData };
