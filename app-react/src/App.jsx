import { useState, useEffect } from 'react';
import { UserCard } from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar la API');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (userId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(userId)) {
        return prevFavorites.filter(id => id !== userId);
      } else {
        return [...prevFavorites, userId];
      }
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Directorio de Usuarios</h1>
      
      <h3>Favoritos: {favorites.length}</h3>
      
      <input 
        type="text" 
        placeholder="Buscar por nombre..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
      />

      <div>
        {filteredUsers.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            isFavorite={favorites.includes(user.id)} 
            onToggleFavorite={toggleFavorite} 
          />
        ))}
        {filteredUsers.length === 0 && <p>No se encontraron usuarios.</p>}
      </div>
    </div>
  );
}

export default App;