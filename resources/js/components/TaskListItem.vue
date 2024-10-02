<template>
    <v-list-item @click="toggleDetails(task.id)">
        <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
            <v-expand-transition>
                <div v-if="task.showDetails">
                    <v-list-item-subtitle
                        >Fecha límite: {{ task.dueDate }}</v-list-item-subtitle
                    >
                    <v-list-item-action>
                        <slot :task="task" />
                    </v-list-item-action>
                </div>
            </v-expand-transition>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: {
        task: { type: Object, required: true },
    },
    methods: {
        toggleDetails() {
            this.task.showDetails = !this.task.showDetails;
        },
    },
};
</script>
