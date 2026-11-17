import { useState, useEffect } from 'react';
import { UserCard } from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);

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

  const handleFavorite = (userId) => {
    setFavoritesCount(prev => prev + 1);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Directorio de Usuarios</h1>
      <h3>Favoritos: {favoritesCount}</h3>

      <input 
        type="text" 
        placeholder="Buscar por nombre..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
      />

      <div>
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onFavorite={handleFavorite} />
        ))}
        {filteredUsers.length === 0 && <p>No se encontraron usuarios.</p>}
      </div>
    </div>
  );
}

export default App;