<template>
  <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
    <div class="min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-200 border">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
          <tr v-for="post in posts">
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.id }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.category }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.title }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.content }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
              <router-link :to="{ name: 'posts.edit', params: {id: post.id} }">Edit</router-link>
              <a href="#" class="ml-2" @click.prevent="deletePost(post.id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script setup>
  import { onMounted } from 'vue';
  import usePosts from '../../composables/posts';

  const { posts, getPosts, deletePost } = usePosts()

  onMounted( () => {
    getPosts()
  })

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