<template>
  <form @submit.prevent="storePost(post)" method="post">
    <div>
      <label class="block font-medium text-sm text-gray-700">Title</label>
      <input v-model="post.title" type="text" class="block mt-1 w-full rounded-md shadow-sm border border-gray-300">
    </div>
    <div class="text-red-600 mt-1">
      <div v-for="message in validationErrors?.title">
        {{ message }}
      </div>
    </div>

    <div class="mt-4">
      <label class="block font-medium text-sm text-gray-700">Content</label>
      <textarea v-model="post.content" class="block mt-1 w-full rounded-md shadow-sm border border-gray-300"></textarea>
    </div>
    <div class="text-red-600 mt-1">
      <div v-for="message in validationErrors?.content">
        {{ message }}
      </div>
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
    <div class="text-red-600 mt-1">
      <div v-for="message in validationErrors?.category_id">
        {{ message }}
      </div>
    </div>

    <div class="mt-4">
      <button :disabled="isLoading" class="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded disabled:opacity-75 disabled:cursor-not-allowed"> 
        <div v-show="isLoading" class="inline-flex animate-spin w-4 h-4 mr-2 rounded-full border-t-2 border-t-white border-l-2 border-l-white border-r-2 border-r-white border-b-2 border-b-blue-600"></div>
        <span v-if="isLoading">Processing..</span>
        <span v-else>Save</span>
      </button>
    </div>
  </form>
</template>





<script>
  import { onMounted, reactive } from 'vue'
  import useCategories from '../../composables/categories';
  import usePosts from '../../composables/posts';

  export default {
    setup(){

      const post = reactive({
        title: '',
        content: '',
        category_id: ''
      })
      const { categories, getCategories } = useCategories()
      const { storePost, validationErrors, isLoading } = usePosts()

      onMounted( () => {
        getCategories()
      })

      return { categories, post, storePost, validationErrors, isLoading }
    }


  }
</script>