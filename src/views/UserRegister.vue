<template>
  <div class="container mx-auto px-4">
    <div class="max-w-md mx-auto my-10">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>
      <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" v-model="name">
        </div>

        <div v-if="nameError" class="text-red-500 text-xs italic">{{ nameError }}</div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="email">
        </div>
        <div v-if="emailError" class="text-red-500 text-xs italic">{{ emailError }}</div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
        </div>
        <div v-if="passwordError" class="text-red-500 text-xs italic">{{ passwordError }}</div>

        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { apiService } from '@/services/apiService';
import Swal from 'sweetalert2';

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  computed: {
    nameError() {
      if (!this.name.trim()) return 'Name is required.';
      return '';
    },
    emailError() {
      if (!this.email.trim()) return 'Email is required.';
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) return 'Email is invalid.';
      return '';
    },
    passwordError() {
      if (this.password.length < 6) return 'Password must be at least 6 characters.';
      return '';
    },
  },
  methods: {
    async register() {
      if (this.nameError || this.emailError || this.passwordError) {
        this.error = "Please correct the errors before submitting.";
        return;
      }

      try {
        await apiService.register({
          name: this.name,
          email: this.email,
          password: this.password
        });

        Swal.fire({
          title: 'Welcome to TODO APP!',
          text: 'You have successfully Registered in.',
          icon: 'success',
          confirmButtonText: 'Great!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'Login' });
          }
        });

      } catch (error) {
        this.error = error.response && error.response.data.message ? error.response.data.message : "Registration failed. Please try again.";
        console.error(error);
      }
    },
  },
}
</script>


