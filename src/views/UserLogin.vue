<template>
  <div class="container mx-auto px-4">
    <div class="max-w-md mx-auto my-10">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { apiService, setAuthToken } from '@/services/apiService';
import Swal from 'sweetalert2';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  mounted() {
    if (this.$route.query.sessionExpired) {
      Swal.fire({
        title: 'Session Expired!',
        text: 'Your session has expired. Please log in again.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  },
  methods: {
    async login() {
      try {
        const response = await apiService.login({
          email: this.email,
          password: this.password
        });

        const token = response.data.access_token;
        setAuthToken(token);
        localStorage.setItem('user-token', token);

        this.$swal({
          title: 'Welcome back!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'Great!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'Home' });
          }
        });
      } catch (error) {
        this.error = "Login failed. Please check your credentials and try again.";
        console.error(error);
      }
    }
  }
}
</script>
