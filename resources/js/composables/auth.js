import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default function useAuth() {

  const user = ref({})
  const router = useRouter()

  const loginForm = reactive({
    email: 'joshim@exe.com',
    password: 'carbon'
  })

  const submitLogin = async () => {
    axios.get('/sanctum/csrf-cookie').then(response => {
       loginUser()
    });
  }

  const loginUser = () => {
    axios.post('/login', loginForm)
       .then(response => {
          localStorage.setItem('loggedIn', true)
          router.push({ name: 'posts.index' })
       })
  }

  const logOut = async () => {
      axios.post('/logout')
        .then(response => {
          localStorage.setItem('loggedIn', false)
          router.push({ name: 'login' })
        })
  }
  
  const getUser = () => {
    axios.get('/api/user')
      .then(response => {
        user.value = response.data
      })
  }

  const isLoggedIn = () => {
    (localStorage.getItem('loggedIn') == true) ? true : false;
  }

  return { submitLogin, logOut, isLoggedIn, getUser, user }

}