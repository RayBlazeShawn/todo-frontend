<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      {{ errorMessage }}
    </div>

    <div class="mb-6">
      <h2 class="text-3xl font-bold mb-4">My ToDos</h2>
      <form @submit.prevent="addTodo" class="flex flex-col gap-4 mb-4">
        <input v-model="newTodoTitle" type="text" placeholder="Add a new todo title" class="p-2 border rounded">
        <textarea v-model="newTodoDescription" placeholder="Add a new todo description" class="p-2 border rounded"></textarea>
        <button type="submit" class="p-2 bg-blue-500 text-white rounded">Add</button>
      </form>
    </div>

    <div v-if="todos.length === 0" class="text-gray-500">No todos found. Start by adding a new one.</div>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id" class="border-b py-2">
        <div class="flex justify-between items-center">
          <div v-if="todo.editing" class="flex-1">
            <input v-model="todo.title" class="p-2 border rounded w-full mb-2">
            <textarea v-model="todo.description" class="p-2 border rounded w-full"></textarea>
          </div>
          <div v-else>
            <p>{{ todo.title }}</p>
            <p class="text-gray-600">{{ todo.description }}</p>
          </div>
          <div>
            <button @click="deleteTodo(todo, index)" class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
            <button v-if="todo.editing" @click="updateTodo(todo, index)" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
              Save
            </button>
            <button v-else @click="enableEditing(todo)" class="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">
              Edit
            </button>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { apiService } from '@/services/apiService';

export default {
  name: 'UserTodos',
  data() {
    return {
      todos: [],
      newTodoTitle: '',
      newTodoDescription: '',
      errorMessage: '',
    };
  },

  created() {
    this.fetchTodos(); // Fetching todos when component is created
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await apiService.fetchTodos();
        this.todos = response.data.map(todo => ({ ...todo, editing: false }));
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Failed to load todos. Please try again later.";
        console.error("Failed to fetch todos:", error);
      }
    },

    // Adds a new todo
    async addTodo() {
      if (!this.newTodoTitle.trim()) {
        this.errorMessage = 'The title cannot be empty.';
        return;
      }
      try {
        const response = await apiService.addTodo({
          title: this.newTodoTitle.trim(),
          description: this.newTodoDescription.trim(),
        });
        this.todos.push({ ...response.data, editing: false });
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Failed to add todo. Please try again.";
        console.error("Failed to add todo:", error);
      }
    },


    // Deletes a todo
    async deleteTodo(todo, index) {
      try {
        await apiService.deleteTodo(todo.id);
        this.todos.splice(index, 1); // Remove the todo from the list
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Failed to delete the todo. Please try again.";
        console.error("Failed to delete todo:", error);
      }
    },

    // Updates todo
    async updateTodo(todo, index) {
      if (!todo.title.trim() && !todo.description.trim()) return;
      try {
        const payload = {
          title: todo.title.trim(),
          description: todo.description.trim(),
        };
        const response = await apiService.updateTodo(todo.id, payload);
        this.todos[index] = { ...this.todos[index], ...response.data, editing: false };
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Failed to update the todo. Please try again.";
        console.error("Failed to update todo:", error);
      }
    },

    // Toggling the editing mode for a todo
    enableEditing(todo) {
      this.todos.forEach(t => {
        if (t.editing && t.id !== todo.id) {
          t.editing = false;
        }
      });
      todo.editing = !todo.editing;
    },
  },
}
</script>


