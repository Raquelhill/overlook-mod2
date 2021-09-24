class Hotel {
  constructor(rooms, bookings, customers) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
  }

  returnCustomerId(userID) {
    this.customers.find((customer) => {
      return customer.id === userID;
    });
  }

  returnPastBookings() {
    //if booking.date < currentDate then show bookings
  }

  returnFutureBookings() {
    //if booking.date >= currentDate then show bookings
  }

  calculateTripTotals(userID) {
    const tripTotal = this.rooms.reduce((acc, room) => {
      this.customers[this.returnCustomerId(userID)].bookings.forEach(
        (booking) => {
          if (room.number === booking.roomNumber) {
            acc += currentRoom.costPerNight;
          }
        }
      );
      return acc;
    }, 0);
    return tripTotal;
  }
}

//iterate through bookings...  if bookings.userID === this.id ... return room number
// bookings.roomNumber === rooms.roomNumber return costPerNight

export default Hotel;
