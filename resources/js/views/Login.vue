<template>
    <div>
        <div class="text-center mt-3">
            <h1 class="display-1 d-flex align-center justify-center">
                <v-icon class="mr-2">mdi-format-list-checks</v-icon>
                To-Do
            </h1>
        </div>

        <form @submit.prevent="loginUser">
            <v-card class="mx-auto pa-8 pb-8" elevation="8" max-width="448" rounded="lg" subtitle="¡Bienvenido! Por favor inicia sesión para continuar.">
                <template v-slot:title>
                    <span>Inicio de Sesión</span>
                </template>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Email
                </div>
                <v-text-field
                    v-model="email"
                    density="compact"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    required
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field
                    v-model="password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    required
                ></v-text-field>

                <v-btn
                    type="submit"
                    class="mb-8"
                    color="blue"
                    size="large"
                    variant="tonal"
                    block
                >
                    Iniciar Sesión
                </v-btn>

                <v-card-text class="text-center">
                    <router-link to="/register" class="text-blue text-decoration-none">
                        Registrate <v-icon icon="mdi-chevron-right"></v-icon>
                    </router-link>
                </v-card-text>
            </v-card>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
    data() {
        return {
            email: "",
            password: "",
            visible: false,
        };
    },
    methods: {
        ...mapActions("user", ["login"]),
        async loginUser() {
            try {
                await this.login({ email: this.email, password: this.password });
                this.$router.push("/to-do");
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
            }
        },
    },
};
</script>

<style scoped>
.display-1 {
    font-size: 48px;
    font-weight: bold;
    color: #1976d2;
}
</style>
