<template>
    <v-app>
        <NavBar />
        <v-main>
            <v-container class="mt-4">
                <v-row>
                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="blue" variant="tonal" @click="openDialog">
                            <v-icon left>mdi-plus</v-icon>
                            Crear Tarea
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-toolbar color="blue">
                                <v-btn icon="mdi-list-box"></v-btn>

                                <v-toolbar-title>Lista de Tareas</v-toolbar-title>

                                <v-spacer></v-spacer>

                                <v-btn icon="mdi-magnify"></v-btn>
                            </v-toolbar>
                            <task-list
                                :tasks="tasks"
                                @editTask="editTask"
                                @completeTask="completeTask"
                                @deleteTask="deleteTask"
                            />
                        </v-card>
                    </v-col>
                </v-row>

                <task-form-modal
                    :dialog="dialog"
                    :task="currentTask"
                    :isEdit="isEdit"
                    @close="closeDialog"
                    @saveTask="saveTask"
                    @update:dialog="dialog = $event"
                />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "../components/NavBar.vue";
import TaskFormModal from "../components/TaskFormModal.vue";
import TaskList from "../components/TaskList.vue";

export default {
    components: {
        NavBar,
        TaskFormModal,
        TaskList,
    },
    data() {
        return {
            dialog: false,
            currentTask: {},
            isEdit: false,
        };
    },
    computed: {
        ...mapState({
            tasks: (state) => state.tasks.items,
        }),
    },
    mounted() {
        this.$store.dispatch("tasks/fetchTasks");
    },
    methods: {
        openDialog() {
            this.currentTask = {
                title: "",
                description: "",
                dueDate: "",
                tag: "incomplete",
            };
            this.isEdit = false;
            this.dialog = true;
        },
        editTask(task) {
            this.currentTask = { ...task };
            this.isEdit = true;
            this.dialog = true;
        },
        deleteTask(taskId) {
            this.$store.dispatch("tasks/deleteTask", taskId);
        },
        completeTask(taskId) {
            this.$store.dispatch("tasks/updateTask", { id: taskId, status: "complete" });
        },
        saveTask(task) {
            const taskId = task.get("id");

            if (this.isEdit) {
                this.$store.dispatch("tasks/updateTask", { id: taskId, taskData: task });
            } else {
                this.$store.dispatch("tasks/storeTask", task);
            }
            this.closeDialog();
        },
        closeDialog() {
            this.dialog = false;
        },
    },
};
</script>

<style scoped>
/* Estilos personalizados (si es necesario) */
</style>
