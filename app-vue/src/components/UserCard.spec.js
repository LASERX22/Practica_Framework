import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import UserCard from './UserCard.vue'

test('Renderiza los datos del usuario y emite evento', async () => {
  const mockUser = {
    id: 1,
    name: 'Joey Diaz',
    email: 'joey@test.com',
    address: { city: 'Cuenca' }
  }
  
  const wrapper = mount(UserCard, {
    props: { 
      user: mockUser,
      isFavorite: false 
    }
  })
  
  expect(wrapper.text()).toContain('Joey Diaz')
  
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('toggleFavorite')
})