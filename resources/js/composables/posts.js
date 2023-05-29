import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts(){

  const router = useRouter()
  const posts = ref({})
  const post = ref({})

  const getPosts = async() => {
    axios.get('/api/posts')
    .then(response => {
      posts.value = response.data.data
    })
  }

  const storePost = async (post) => {
    axios.post('/api/posts', post)
      .then(response => {
        router.push({ name: 'posts.index' })
      })
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


  return {  posts, post, getPost, getPosts, storePost, updatePost, deletePost }
}