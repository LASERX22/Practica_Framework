import React from "react";

export function UserCard({ user, onFavorite}){
    return(
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Ciudad: {user.address.city}</p>
            <button onClick={() => onFavorite(user.id)}>
                Marcar como Favorito
            </button>
        </div>
    );
}