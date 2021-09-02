import { render, screen } from '@testing-library/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './components/pages/Admin';
import axios from 'axios';

jest.mock('axios');

test('Render with async data from API', async () => {
  const bookings = [
    {
      firstname: 'Märta',
      lastname: 'Ballardini',
      guests: 6,
      time: '18:00',
      booking_reference: 'ks8d6hnd'
    }]
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data:  bookings  })
  );
  render(<Admin/>);

  expect( await screen.findByText(/Märta Ballardini/, undefined, {timeout: 3000})).toBeInTheDocument();
 
 })

test('Render component', () => {
  render(<Footer/>);
  expect(screen.getByText(/ÖPPETTIDER/)).toBeInTheDocument();

})

test('Render the prop sent to header', () => {
  render(<Header title="meny" />);
  
  const headerText = screen.getByText(/meny/);
  
  expect(headerText).toBeInTheDocument();
});



