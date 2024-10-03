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
        ...mapActions("user", ["logout"]),

        async handleLogout() {
            try {
                await this.logout();
                this.$router.push("/login");
            } catch (error) {
                console.error("Logout failed:", error);
                alert("Logout failed. Please try again.");
            }
        },
    },
};
</script>

<style scoped>
</style>
