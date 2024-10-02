import { createStore } from 'vuex';
import user from './users';
import tasks from './tasks';

const store = createStore({
    modules: {
        user,
        tasks,
    }
});

export default store;
