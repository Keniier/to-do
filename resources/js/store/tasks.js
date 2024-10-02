import axios from "../axios";
import { show_alert } from '../functions/alerts';
import router from '../router';

const state = {
    tasks: [],
};

const getters = {
    allTasks: (state) => state.tasks,
    pendingTasks: (state) => state.tasks.filter(task => task.tag === 'incomplete'),
    inProgressTasks: (state) => state.tasks.filter(task => task.tag === 'in_progress'),
    completedTasks: (state) => state.tasks.filter(task => task.tag === 'complete'),
};

const actions = {
    async fetchTasks({ commit }) {
        try {
            const response = await axios.get("/api/tasks");            
            commit("setTasks", response.data);
        } catch (error) {
            handleError(error);
        }
    },

    async storeTask({ commit }, taskData) {
        try {
            const response = await axios.post("/api/tasks", taskData);
            commit("newTask", response.data);
            show_alert('Tarea Registrada', 'success', '');
        } catch (error) {
            handleError(error);
        }
    },

    async updateTask({ commit }, { id, taskData }) {
        try {
            taskData.append('_method', 'PUT');
            const response = await axios.post(`/api/tasks/${id}`, taskData);
            commit("updateTask", response.data);
            show_alert('Tarea Actualizada', 'success', '');
        } catch (error) {
            console.error("Error en la solicitud PUT:", error.response.data);
            handleError(error);
        }
    },
    

    async deleteTask({ commit }, id) {
        try {
            await axios.delete(`/api/tasks/${id}`);
            commit("removeTask", id);
            show_alert('Tarea Eliminada', 'success', '');
        } catch (error) {
            handleError(error);
        }
    },
};

function handleError(error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        router.push({ name: 'Login' });
        show_alert('Sesión expirada o no autorizado, por favor inicie sesión nuevamente.', 'error', '');
    } else {
        show_alert(error.message || 'Error en la solicitud', 'error', '');
        console.error("Error en la solicitud:", error);
    }
}

const mutations = {
    setTasks: (state, tasks) => {
        state.tasks = tasks;
    },
    newTask: (state, task) => {
        state.tasks.push(task);
    },
    updateTask: (state, updatedTask) => {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
    removeTask: (state, id) => {
        state.tasks = state.tasks.filter(task => task.id !== id);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
