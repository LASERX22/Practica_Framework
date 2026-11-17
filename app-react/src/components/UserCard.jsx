import React from 'react';

export function UserCard({ user, isFavorite, onToggleFavorite }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Ciudad: {user.address.city}</p>
      <button 
        onClick={() => onToggleFavorite(user.id)}
        style={{ 
          backgroundColor: isFavorite ? '#ff4d4f' : '#1890ff', 
          color: 'white', 
          border: 'none', 
          padding: '8px 12px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isFavorite ? 'Quitar de favoritos' : 'Marcar como Favorito'}
      </button>
    </div>
  );
}