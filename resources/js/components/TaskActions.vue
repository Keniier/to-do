<!-- TaskActions.vue -->
<template>
    <div>
        <v-btn icon @click.stop="editTask(task)">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click.stop="deleteTask(task.id)">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-if="!task.completed" icon @click.stop="completeTask(task.id)">
            <v-icon>mdi-check-circle</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    props: {
        task: { type: Object, required: true },
    },
    methods: {
        editTask(task) {
            this.$emit("edit", task);
        },
        deleteTask(taskId) {
            this.$emit("delete", taskId);
        },
        completeTask(taskId) {
            this.$emit("complete", taskId);
        },
    },
};
</script>
