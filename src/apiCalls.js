// function fetchData(file) {
//   return fetch(`http://localhost:3001/api/v1/${file}`).then((response) =>
//     response.json()
//   );
// }

// function postData(file) {
//   return fetch(`http://localhost:3001/api/v1/${file}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       userID: userID,
//       date: date,
//       roomNumber: roomNum,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => checkResponse(response))
//     .catch((error) => console.log(error));
// }

// function deleteData(file) {
//   return fetch(`http://localhost:3001/api/v1/${file}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       userID: userID,
//       date: date,
//       roomNumber: roomNum,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => checkResponse(response))
//     .catch((error) => console.log(error));
// }

// // function checkResponse(response) {
// //   if (!response.ok) {
// //     throw new Error(
// //       `Status: ${response.status} StatusText: ${response.status.text}`
// //     );
// //   }
// //   return response.json();
// // }

// export { fetchData, postData, deleteData };
