import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts(){

  const router = useRouter()
  const posts = ref({})
  const post = ref({})
  const validationErrors = ref({})
  const isLoading = ref(false)

  const getPosts = async(
    page = 1, 
    category = '',
    order_column = 'created_at',
    order_direction = 'desc',
    ) => {
    axios.get('/api/posts?page=' +page+ 
      '&category=' +category+
      '&order_column=' +order_column+
      '&order_direction=' +order_direction
      )
    .then(response => {
      posts.value = response.data
    })
  }

  const storePost = async (post) => {
    if(isLoading.value) return
    validationErrors.value = {}
    isLoading.value = true


    axios.post('/api/posts', post)
      .then(response => {
        router.push({ name: 'posts.index' })
      })
      .catch(error => {
        if(error.response?.data){
          validationErrors.value = error.response.data.errors
        }
      })
      .finally(() => isLoading.value = false)
  }

  const updatePost = async (post) => {
    axios.put('/api/posts/' + post.id, post)
      .then(response => {
        router.push({ name: 'posts.index' })
      })
  }

  const deletePost = async (id) => {
    axios.delete('/api/posts/' + id)
      .then(response => {
        getPosts()
      })
  }

  const getPost = async(id) => {
    axios.get('/api/posts/' + id)
    .then(response => {
      post.value = response.data.data
    })
  }


  return {  
    posts, 
    post, 
    getPost, 
    getPosts, 
    storePost, 
    updatePost, 
    deletePost, 
    isLoading, 
    validationErrors }
}