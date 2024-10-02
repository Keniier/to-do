import axios from '../axios';
import { show_alert } from '../functions/alerts';

const state = {
    user: localStorage.getItem('user') || null,
    error: null,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    clearUser(state) {
        state.user = null;
    },
    setError(state, error) {
        state.error = error;
    },
};

const actions = {
    async login({ commit }, { email, password }) {
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token, user } = response.data;

            if (!user || !token) throw new Error('Error en el inicio de sesión.');

            commit('setUser', user);
            commit('setError', null);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Error en el inicio de sesión');
        }
    },
    
    logout({ commit }) {
        commit('clearUser');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

const getters = {
    isAuthenticated(state) {
        return !!state.user;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
