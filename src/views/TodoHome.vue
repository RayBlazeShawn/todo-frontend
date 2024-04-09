<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold text-center my-8">Welcome to the ToDo Application</h1>
    <!-- Display Todos -->
    <div v-if="todos.length > 0">
      <h2 class="text-xl font-semibold my-4">Your Todos:</h2>
      <ul class="space-y-4">
        <li v-for="todo in todos" :key="todo.id" class="border p-4 rounded shadow">
          <h3 class="text-lg font-bold">Title:{{ todo.title }}</h3>
          <p>Description:{{ todo.description }}</p>
          <p>Created at: {{ formatDate(todo.created_at) }}</p>
          <p>Last updated: {{ formatDate(todo.updated_at) }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No todos found. Start by adding a new one.</p>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/apiService';
import { format, parseISO } from 'date-fns';

export default {
  name: 'TodoHome',
  data() {
    return {
      todos: [],
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    formatDate(dateString) {
      const parsedDate = parseISO(dateString);
      return format(parsedDate, 'PPPp');
    },
    async fetchTodos() {
      try {
        const response = await apiService.fetchTodos();
        this.todos = response.data;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },

  },

}
</script>
