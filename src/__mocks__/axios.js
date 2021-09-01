import React from 'react';

const mockResponse = {
  data: {
    results: [
      {
        guests: 2,
        firstname: 'Luke',
        lastname: 'skywalker',
        email: 'starWarsRules@gmail.com',
        phonenumber: '0733925118',
        time: '18:00',
        booking_reference: '83fc878c-4b3d-435d-a708-38a1fecba875',
        date: "2021 - 09 - 24",
        message: '',
      },
    ],
  },
};
const get = {
  get: jest.fn().mockResolvedValue(mockResponse),
};

export default get;
