<template>
    <v-app-bar color="blue">
        <v-icon class="ms-5">mdi-format-list-checks</v-icon>
        <v-toolbar-title class="ml-2">To-Do</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleLogout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
    methods: {
        ...mapActions("auth", ["logout"]),

        handleLogout() {
            this.logout();
            console.log("Logout clicked");
        },
    },
};
</script>

<style scoped>
</style>
