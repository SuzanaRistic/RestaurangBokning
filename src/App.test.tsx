import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './components/Header';
import Admin from './components/pages/Admin';
import BookingForm from './components/BookingForm';


test('Render the prop sent to header', () => {
  render(<Header title="meny" />);
  
  const headerText = screen.getByText(/meny/);
  
  expect(headerText).toBeInTheDocument();
});


