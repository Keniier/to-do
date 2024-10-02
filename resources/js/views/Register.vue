<template>
    <div>
        <div class="text-center mt-3">
            <h1 class="display-1 d-flex align-center justify-center">
                <v-icon class="mr-2">mdi-format-list-checks</v-icon>
                To-Do
            </h1>
        </div>

        <form @submit.prevent="registerUser">
            <v-card class="mx-auto pa-8 pb-8" elevation="8" max-width="448" rounded="lg" subtitle="Crea una cuenta para empezar a gestionar tus tareas.">
                <template v-slot:title>
                    <span>Registro de Usuario</span>
                </template>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Nombre
                </div>
                <v-text-field
                    v-model="name"
                    density="compact"
                    placeholder="Nombre completo"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    required
                ></v-text-field>

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
                    Contraseña
                </div>
                <v-text-field
                    v-model="password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Introduce tu contraseña"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    required
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Confirmar Contraseña
                </div>
                <v-text-field
                    v-model="password_confirmation"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Confirma tu contraseña"
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
                    Registrarse
                </v-btn>

                <v-card-text class="text-center">
                    <router-link to="/login" class="text-blue text-decoration-none">
                        Ya tienes una cuenta? Inicia Sesión <v-icon icon="mdi-chevron-right"></v-icon>
                    </router-link>
                </v-card-text>
            </v-card>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            visible: false,
        };
    },
    methods: {
        ...mapActions("user", ["register"]),
        async registerUser() {
            try {
                await this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                this.$router.push("/to-do");
            } catch (error) {
                console.error("Error en el registro:", error);
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
