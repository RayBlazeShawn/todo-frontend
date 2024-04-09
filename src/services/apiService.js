import axios from 'axios';
import router from "@/router";

const API_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api';

const service = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// setting the auth token for any request
export function setAuthToken(token) {
    service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthToken() {
    localStorage.removeItem('user-token');
    delete service.defaults.headers.common['Authorization'];
}

export const apiService = {
    async register(userData) {
        return service.post('/register', userData);
    },

    async login(credentials) {
        const response = await service.post('/login', credentials);
        const token = response.data.access_token;
        localStorage.setItem('user-token', token);
        setAuthToken(token);
        return response;
    },


    async fetchTodos() {
        return service.get('/todos');
    },

    async addTodo(todoData) {
        return service.post('/todos', todoData);
    },

    async updateTodo(id, todoData) {
        return service.put(`/todos/${id}`, todoData);
    },

    async deleteTodo(id) {
        return service.delete(`/todos/${id}`);
    },
};

function initialize() {
    const token = localStorage.getItem('user-token');
    if (token) {
        setAuthToken(token);
    }
}

initialize();

service.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token has expired or is invalid
            clearAuthToken();
            router.push({ name: 'Login' });
        }
        return Promise.reject(error);
    }
);
