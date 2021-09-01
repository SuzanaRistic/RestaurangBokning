import React from 'react';
import {FindBookings} from '../components/GetBookings';

const mockResponse = {
  data: {
    results: [
      {
        guests: 2,
        firstname: 'Luke',
        lastname: 'skywalker',
        email: 'starwarsRules@gmail.com',
        phonenumber: '08 763536278',
        time: '18.00',
        booking_reference: '98w9058094',
        date: 2021 - 09 - 24,
        message: '',
      },
    ],
  },
};
const get = {
  get: jest.fn().mockResolvedValue(mockResponse),
};

export default get;
