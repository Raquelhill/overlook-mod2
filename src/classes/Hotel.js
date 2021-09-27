import Customer from './Customer';

class Hotel {
  constructor(roomsData, bookingsData, customersData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customers = customersData;
    this.currentCustomer = null;
    this.currentCustomerBooking = null;
    this.availableRooms = [];
  }

  findCurrentCustomer(inputId) {
    this.currentCustomer = this.customers.find((customer) => {
      return customer.id === parseInt(inputId);
    });
  }

  returnCustomerBookings() {
    this.currentCustomerBooking = this.bookings.filter((booking) => {
      return booking.userID === this.currentCustomer.id;
    });
    console.log(this.currentCustomerBooking);
  }

  calculateCustomerBookingsTotals() {
    const bookingTotal = this.bookings.reduce((acc, booking) => {
      if (this.currentCustomer.id === booking.userID) {
        let bookingRoom = this.rooms.find((room) => {
          return booking.roomNumber === room.number;
        });
        acc += bookingRoom.costPerNight;
      }
      return acc;
    }, 0);
    return bookingTotal.toFixed(2);
  }

  returnAvailableRoomsByDate(arrivalDate, departureDate) {
    let unavailableRooms = this.bookings
      .filter((booking) => {
        if (booking.date >= arrivalDate && booking.date <= departureDate) {
          return booking;
        }
      })
      .map((room) => {
        return room.roomNumber;
      });
    let availableRooms = this.rooms.filter((room) => {
      if (!unavailableRooms.includes(room.number)) {
        return room;
      }
    });
    console.log(availableRooms);
    return availableRooms;
  }

  filterRoomsByType(roomType, arrivalDate, departureDate) {
    let availableRooms = this.returnAvailableRoomsByDate(
      arrivalDate,
      departureDate
    );
    console.log(availableRooms);
    let filteredRooms = availableRooms.filter((room) => {
      return roomType === room.roomType;
    });
    console.log(filteredRooms);
    return filteredRooms;
  }
}

export default Hotel;
