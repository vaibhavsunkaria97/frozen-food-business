import { render, screen } from '@testing-library/react';
import ManageProducts from '../ManageProducts';
import axios from 'axios';

jest.mock('axios');

axios.get.mockResolvedValue({ data: { categories: [], products: [] } });

test('renders Product Management heading', async () => {
  render(<ManageProducts />);
  const heading = await screen.findByText(/Product Management/i);
  expect(heading).toBeInTheDocument();
});
