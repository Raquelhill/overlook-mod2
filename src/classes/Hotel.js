class Hotel {
  constructor(rooms, bookings, customers) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
  }

  returnCustomerID(userID) {
    this.customers.find((customer) => {
      return customer.id === userID;
    });
  }

  findFutureBookings = (userID, date) => {
    return this.customers[this.returnIndexOfCustomer(userID)].bookings.filter(
      (booking) => {
        return booking.date >= date;
      }
    );
  };

  findPastBookings = (userID, date) => {
    return this.customers[this.returnIndexOfCustomer(userID)].bookings.filter(
      (booking) => {
        return booking.date < date;
      }
    );
  };

  calculateCustomerTripTotals(userID) {
    const tripTotal = this.rooms.reduce((acc, room) => {
      this.customers[this.returnCustomerID(userID)].bookings.forEach(
        (booking) => {
          if (room.number === booking.roomNumber) {
            acc += room.costPerNight * 100;
          }
        }
      );
      return acc;
    }, 0);
    return tripTotal / 100;
  }

  filterRoomsByRoomType(type) {
    return this.roomsAvailable.filter((room) => room.roomType === type);
  }
}

//iterate through bookings...  if bookings.userID === this.id ... return room number
// bookings.roomNumber === rooms.roomNumber return costPerNight

export default Hotel;
