import { ref } from 'vue'

export default function useCategoires(){

  const categories = ref([])

  const getCategories = async() => {
    axios.get('/api/categories')
    .then(response => {
      categories.value = response.data.data
    })
  }

  return {  categories, getCategories }
}