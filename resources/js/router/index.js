import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Task from '../views/Task.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    { path: '/', redirect: '/to-do' },
    {
        path: '/to-do',
        name: 'Task',
        component: Task,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// restriccion de acceso
router.beforeEach((to, from, next) => {
    // Verifica si el usuario está autenticado
    const isAuthenticated = store.getters['user/isAuthenticated']; 
    console.log(isAuthenticated);
    

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
