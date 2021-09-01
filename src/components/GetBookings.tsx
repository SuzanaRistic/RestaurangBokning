import axios from 'axios';
import React, {useEffect, useState} from 'react';
import IBooking from '../interfaces/IBooking';

export function FindBookings() {
  const [bookingList, setBookingList] = useState<IBooking[]>();

  useEffect(() => {
    axios
      .get('http://localhost:4000/bookings')
      .then((res) => {
        console.log(res.data);
        setBookingList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {bookingList};
}
