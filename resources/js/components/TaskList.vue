<template>
    <v-list>
        <v-list-item v-for="task in allTasks" :key="task.id" @click="toggleDetails(task)">
            <v-row>
                <v-col>
                    <v-list-item-title>{{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle
                        >Creada: {{ formatDate(task.created_at) }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                        >Vencimiento:
                        {{
                            task.due_date ? formatDate(task.due_date) : "No"
                        }}</v-list-item-subtitle
                    >
                </v-col>
                <v-col class="d-flex justify-center" cols="4">
                    <v-chip :color="statusColor(task.tag)" dark>
                        {{ statusValue(task.tag) }}
                    </v-chip>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn
                        class="mx-1"
                        color="blue"
                        size="small"
                        icon
                        variant="tonal"
                        @click.stop="editTask(task)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        color="red"
                        size="small"
                        variant="tonal"
                        icon
                        @click.stop="deleteTask(task.id)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <v-expand-transition>
                <div v-if="task.showDetails">
                    <v-divider class="my-2"></v-divider>
                    <div>Descripción:</div>
                    <div class="description">{{ task.description }}</div>
                    <!-- Clase para estilo -->
                    <div v-if="task.image">
                        <img
                            :src="`/storage/${task.image}`"
                            alt="Imagen de la tarea"
                            style="max-width: 100%; height: auto"
                        />
                    </div>
                </div>
            </v-expand-transition>
        </v-list-item>
    </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("tasks", ["allTasks"]),
    },
    methods: {
        toggleDetails(task) {
            task.showDetails = !task.showDetails; // Alternar detalles de la tarea
        },
        editTask(task) {
            this.$emit("editTask", task); // Emitir evento para editar tarea
        },
        deleteTask(taskId) {
            this.$store.dispatch("tasks/deleteTask", taskId); // Despachar acción para eliminar tarea
        },
        statusColor(tag) {
            // Determinar color del estado basado en la etiqueta
            if (tag === "incomplete") return "red lighten-1";
            if (tag === "in_progress") return "blue darken-1";
            if (tag === "complete") return "green darken-1";
        },
        statusValue(tag) {
            // Obtener valor de estado basado en la etiqueta
            if (tag === "incomplete") return "Pendiente";
            if (tag === "in_progress") return "En Progreso";
            if (tag === "complete") return "Completada";
        },
        formatDate(dateString) {
            // Formatear fecha a un formato legible
            const options = { day: "2-digit", month: "long", year: "numeric" };
            return new Date(dateString).toLocaleDateString("es-ES", options);
        },
    },
};
</script>

<style scoped>
.description {
    color: gray; /* Cambiar color a gris */
}
</style>
