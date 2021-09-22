class APIRequests {
  constructor() {
    this.urlRoot = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  }

  fetchData(urlPath, dataFile) {
    return fetch(`${this.urlRoot}${urlPath}`)
      .then((response) => response.json())
      .then((data) => data[dataFile])
      .catch((error) => console.log(error));
  }

  postData(urlPath, bookingData) {
    return fetch(`${this.urlRoot}${urlPath}`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  deleteData(urlPath, bookingToCancel) {
    return fetch(`${this.urlRoot}${urlPath}`, {
      method: 'DELETE',
      body: JSON.stringify(bookingToCancel),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}

//function checkResponse(response) {
//   if (!response.ok) {
//     throw new Error(
//       `Status: ${response.status} StatusText: ${response.status.text}`
//     );
//   }
//   return response.json();
// }

export default APIRequests;
