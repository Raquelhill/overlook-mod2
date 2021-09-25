import Customer from './Customer';

class Hotel {
  constructor(roomsData, bookingsData, customersData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customers = customersData;
    this.currentCustomer = null;
    this.currentCustomerBooking = null;
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
}

export default Hotel;
