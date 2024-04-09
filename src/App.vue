<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-600 text-white shadow-lg">
      <nav class="flex justify-between items-center container mx-auto py-4 px-6 md:px-14">
        <h1 class="text-2xl font-bold">Vue.js + TailwindCSS ToDo Application</h1>
        <div class="flex space-x-2 md:space-x-4">
          <router-link to="/" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ease-in-out">Home</router-link>
          <router-link to="/login" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ease-in-out">Login</router-link>
          <router-link to="/register" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ease-in-out">Register</router-link>
          <router-link to="/todos" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ease-in-out">My Todos</router-link>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8 md:px-14 lg:px-24">
      <router-view/>
    </main>

    <footer class="bg-blue-500 text-white text-center p-4 mt-auto">
      © 2024 Vue.js + TailwindCSS ToDo Application. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

