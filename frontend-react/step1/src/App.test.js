import { render, screen } from '@testing-library/react';
import AppTodo from './App-todo';

test('renders learn react link', () => {
  render(<AppTodo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
