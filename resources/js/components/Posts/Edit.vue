<template>
  <form @submit.prevent="updatePost(post)" method="post">
    <div>
      <label class="block font-medium text-sm text-gray-700">Title</label>
      <input v-model="post.title" type="text" class="block mt-1 w-full rounded-md shadow-sm border border-gray-300">
    </div>

    <div class="mt-4">
      <label class="block font-medium text-sm text-gray-700">Content</label>
      <textarea v-model="post.content" class="block mt-1 w-full rounded-md shadow-sm border border-gray-300"></textarea>
    </div>

    <div>
      <label class="block font-medium text-sm text-gray-700">Category</label>
      <select v-model="post.category_id" class="block mt-1 w-full rounded-md shadow-sm border border-gray-300">
        <option value="" selected>Choose category</option>
        <option v-for="category in categories" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="mt-4">
      <button type="submit" class="px-3 py-2 bg-blue-700 text-white rounded">Save</button>
    </div>
  </form>
</template>




<script>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import useCategories from '../../composables/categories';
  import usePosts from '../../composables/posts';

  export default {
    setup(){

      const route = useRoute()
      const { categories, getCategories } = useCategories()
      const { post, getPost, updatePost } = usePosts()

      onMounted( () => {
        getPost(route.params.id)
        getCategories()
      })

      return { categories, post, getPost, updatePost }
    }


  }
</script>