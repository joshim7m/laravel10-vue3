import { ref, onMounted } from 'vue'

export default function useUserinfo() {

  const user = ref({})
  const abilities = ref([])
  
  const getUser = () => {
    axios.get('/api/user')
      .then(response => {
        user.value = response.data
      })
  }

  const getAbilities = () => {
    axios.get('/api/abilities')
      .then(response => {
        abilities.value = response.data;
      })
  }

  const checkPermission = (name) => {
    return abilities.value.includes(name)
  }

  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') == 'true';
  }


  return { getUser, user, getAbilities, abilities, checkPermission, isLoggedIn }

}