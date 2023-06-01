<template>
  <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
    <div class="min-w-full align-middle">
      <div>
        <div class="category">
          <select v-model="selectedCategory" class="mb-2 rounded text-sm border-gray-200">
            <option value="">-- Choose Category --</option>
            <option v-for="(category) in categories" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200 border mb-2">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
              <div class="flex items-center cursor-pointer" @click="updateOrdering('title')">
                <div>
                  <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" :class="{'font-bold text-blue-600': orderColumn === 'title'}">Title</span>
                </div>
                <div class="select-none ml-2">
                  <span :class="{'text-blue-600': orderDirection === 'asc' && orderColumn === 'title', 'hidden': orderDirection !=='' && orderDirection !=='asc' && orderColumn === 'title'}">&uarr;</span>
                  <span :class="{'text-blue-600': orderDirection === 'desc' && orderColumn === 'title', 'hidden': orderDirection !=='' && orderDirection !=='desc' && orderColumn === 'title'}">&darr;</span>
                </div>
              </div>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
              <div class="flex items-center cursor-pointer" @click="updateOrdering('created_at')">
                <div>
                  <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" :class="{'font-bold text-blue-600': orderColumn === 'created_at'}">Created </span>
                </div>
                <div>
                  <span :class="{'text-blue-600': orderDirection === 'asc' && orderColumn === 'created_at', 'hidden': orderDirection !=='' && orderDirection !=='asc' && orderColumn === 'created_at'}">&uarr;</span>
                  <span :class="{'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at', 'hidden': orderDirection !=='' && orderDirection !=='desc' && orderColumn === 'created_at'}">&darr;</span>
                </div>
              </div>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
          <tr v-for="(post, index) in posts.data">
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.category }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.title }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.content }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.created_at }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
              <router-link :to="{ name: 'posts.edit', params: {id: post.id} }">Edit</router-link>
              <a v-if="checkPermission('posts.delete')" href="#" class="ml-2" @click.prevent="deletePost(post.id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :data="posts"
        @pagination-change-page="page => getPosts(page, selectedCategory)"
    />

    </div>
  </div>
</template>



<script>
  import { ref, onMounted,watch } from 'vue';
  import usePosts from '../../composables/posts';
  import useCategoires from '../../composables/categories'
  import useUserinfo from '../../composables/userinfo';

  export default{
    setup(){

      const selectedCategory = ref('')
      const orderColumn = ref('created_at')
      const orderDirection = ref('desc')

      const {  categories, getCategories } = useCategoires()
      const { posts, getPosts, deletePost } = usePosts()
      const { getAbilities, checkPermission, isLoggedIn } = useUserinfo()

      onMounted( () => {
        getCategories()
        getPosts()
        getAbilities()

      })

      const updateOrdering = (column) => {
        orderColumn.value = column;
        orderDirection.value = (orderDirection.value === 'asc') ? 'desc': 'asc';
        getPosts(1, selectedCategory.value, orderColumn.value, orderDirection.value)
      }

      watch(selectedCategory, (current, previous) => {
        getPosts(1, current)
      })

      return { 
        categories,
        getCategories,
        selectedCategory,
        getPosts, 
        posts, 
        deletePost, 
        getAbilities, 
        checkPermission, 
        isLoggedIn,
        orderColumn,
        orderDirection,
        updateOrdering
      }
    }
  }

</script>


<!-- <script>
  export default {
    data(){
      return {
        posts: []
      }
    },
    mounted(){
      this.fetchPosts()
    },
    methods: {
      fetchPosts(){
        axios.get('/api/posts')
        .then(response => this.posts = response.data.data)
        .catch(error => console.log(error))
      }
    }

  }
</script> -->