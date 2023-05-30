import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default function useAuth() {

  const router = useRouter()

  const loginForm = reactive({
    email: 'robin@exe.com',
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
  


  return { submitLogin, logOut }

}