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
                            <v-toolbar color="blue" class="d-flex align-center">
                                <v-btn icon="mdi-list-box"></v-btn>
                                <div>
                                    <v-toolbar-title>Lista de Tareas</v-toolbar-title>
                                    <span class="instruction-text">
                                        Haz clic en una tarea para ver más detalles.
                                    </span>
                                </div>
                                <v-spacer></v-spacer>
                                <v-select
                                    v-model="sortKey"
                                    @update:modelValue="updateSort"
                                    :items="sortOptions"
                                    label="Ordenar por"
                                    solo
                                    dense
                                    item-title="text"
                                    item-value="value"
                                    class="mt-5"
                                    style="min-width: 200px"
                                />
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
            sortKey: "created_at", // Clave de orden predeterminada
            sortOptions: [
                { text: "Fecha de Creación", value: "created_at" },
                { text: "Fecha de Vencimiento", value: "due_date" },
            ],
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
        updateSort(value) {
            this.sortKey = value;
            console.log(`Ordenado por: ${this.sortKey}`);
            this.$store.commit("tasks/sortTasks", this.sortKey);
        },
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
.sort-select {
    min-width: 200px;
}

.instruction-text {
    font-size: 14px;
    color: rgb(224, 224, 224);
    margin-top: -50px;
    margin-bottom: 5px;
}
</style>
