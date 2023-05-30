<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center">
        <div class="flex flex-1">
            <!-- Logo -->
            <div class="shrink-0 flex items-center">
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>

              </a>
            </div>

            <div class="flex flex-1 justify-between">
              <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <router-link to="/posts" active-class="border-b-2 border-indigo-400">
                  Posts
                </router-link>
                <router-link to="/posts/create" active-class="border-b-2 border-indigo-400">
                  Create Post
                </router-link>
              </div>

              <div class="flex items-center">
                <div>
                  <div>Hi, {{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
                <button @click.prevent="logOut" class="inline-flex items-center px-4 py-2 ml-4 bg-gray-800 border border-transparent rounded-md font-semibold text-sm text-white uppercase outline-none focus:border-gray-900 focus:shadow-outline-gray">Logout</button>
              </div>

            </div>
        </div>
      </div>
    </div>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ pageTitle }}
        </h2>
      </div>
    </header>

    <main>
      <div class="py-12">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import { onMounted } from 'vue'
  import useAuth from '../composables/auth'
  import useUserinfo from '../composables/userinfo'

  export default{

    setup(){

      const { logOut } = useAuth()
      const { getUser, user } = useUserinfo()

      onMounted( () => {
        getUser()
      })

      return { logOut, getUser, user }
    },


    
    computed: {
      pageTitle(){
        return this.$route.meta.title
      }
    }
  }
</script>