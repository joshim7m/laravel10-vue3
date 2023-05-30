<template>
  <form @submit.prevent="submitLogin">
    <div class="flex justify-center py-5">
      <div class="w-1/3 p-5">
        <div>
          <label class="block font-medium text-sm text-gray-700">Email</label>
          <input type="email" 
          class="w-full block mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" autocomplete="true">

          
        </div>

        <div class="mt-4">
          <label class="block font-medium text-sm text-gray-700">Password</label>
          <input type="password" 
          class="w-full block mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">

        </div>

        <div class="mt-4">
          <label class="flex items-center">
            <input type="checkbox" name="remember"
            class="rounded">
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div class="flex justify-center mt-4">
          <button type="submit" class="max-w-max inline-flex items-center px-8 py-2 bg-gray-800 border border-transparent bg-blue-700 text-white rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import useAuth from '../composables/auth'
  import useUserinfo from '../composables/userinfo'

  export default{

    setup(){

      const router = useRouter()
      const { submitLogin } = useAuth()
      const { isLoggedIn } = useUserinfo()

      onMounted( () => {
        if(isLoggedIn()){
          router.push({ name: 'posts.index' })
        }else{
          console.log('Not logged in')
        }
      })

      return { submitLogin, isLoggedIn }
    }

}
</script>