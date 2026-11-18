<script setup>
import { ref, computed, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)
const searchTerm = ref('')

const favorites = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Error al consultar la API')
    users.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const toggleFavorite = (id) => {
  const index = favorites.value.indexOf(id)
  if (index === -1) {
    favorites.value.push(id)
  } else {
    favorites.value.splice(index, 1)
  }
}

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>

<template>
  <div style="padding: 20px;">
    <h2 v-if="loading">Cargando...</h2>
    <h2 v-else-if="error">Error: {{ error }}</h2>
    
    <div v-else>
      <h1>Directorio de Usuarios</h1>
      
      <h3>Favoritos: {{ favorites.length }}</h3>
      
      <input 
        v-model="searchTerm"
        type="text" 
        placeholder="Buscar por nombre..." 
        style="padding: 8px; width: 100%; margin-bottom: 20px;"
      />

      <div>
        <UserCard 
          v-for="user in filteredUsers" 
          :key="user.id" 
          :user="user"
          :isFavorite="favorites.includes(user.id)"
          @toggleFavorite="toggleFavorite" 
        />
        <p v-if="filteredUsers.length === 0">No se encontraron usuarios.</p>
      </div>
    </div>
  </div>
</template>