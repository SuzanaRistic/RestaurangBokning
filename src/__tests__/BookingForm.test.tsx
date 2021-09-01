import React from 'react';
import {render, screen} from '@testing-library/react';
import BookingForm from '../components/BookingForm';

test('renders BookingForm', () => {
  render(<BookingForm />);

  expect(screen.getByText('Antal Gäster')).toBeInTheDocument();
});
