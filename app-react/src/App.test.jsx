import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { UserCard } from './components/UserCard';

test('Renderiza el nombre del usuario en la tarjeta', () => {
  const mockUser = {
    id: 1,
    name: 'Joey Diaz',
    email: 'joey@test.com',
    address: { city: 'Cuenca' }
  };

  render(<UserCard user={mockUser} isFavorite={false} onToggleFavorite={() => {}} />);
 
  expect(screen.getByText('Joey Diaz')).toBeDefined();
});