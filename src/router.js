import { createRouter, createWebHistory } from 'vue-router';
import TodoHome from './views/TodoHome.vue';
import UserLogin from './views/UserLogin.vue';
import UserRegister from './views/UserRegister.vue';
import UserTodos from './views/UserTodos.vue';

const routes = [
    { path: '/', name: 'Home', component: TodoHome },
    { path: '/login', name: 'Login', component: UserLogin },
    { path: '/register', name: 'Register', component: UserRegister },
    { path: '/todos', name: 'Todos', component: UserTodos, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('user-token');

        if (!token) {
            next({ name: 'Login', query: { sessionExpired: true } });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
