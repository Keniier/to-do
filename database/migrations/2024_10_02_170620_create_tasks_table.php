<template>
    <v-dialog :model-value="dialog" @update:model-value="(val) => $emit('update:dialog', val)" max-width="600px">
        <v-card>
            <v-card-title>{{ localTask.id ? "Editar Tarea" : "Nueva Tarea" }}</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="submitForm" v-model="valid">
                    <v-text-field v-model="localTask.title" label="Título" required
                        :rules="[v => !!v || 'El título es requerido']"
                        placeholder="Ingresa el título de la tarea"></v-text-field>

                    <v-textarea v-model="localTask.description" label="Descripción"
                        :rules="[v => !!v || 'La descripción es requerida']"
                        placeholder="Ingresa una descripción de la tarea"></v-textarea>

                    <v-select v-model="localTask.tag" :items="['incomplete', 'in_progress', 'complete']" label="Estado"
                        placeholder="Selecciona un estado"></v-select>

                    <v-file-input v-model="localTask.image" label="Subir Imagen" accept="image/*"
                        placeholder="Selecciona una imagen (opcional)" prepend-icon="mdi-file-upload"></v-file-input>

                    <v-text-field v-model="localTask.due_date" label="Fecha de Vencimiento" type="date"
                        placeholder="Selecciona una fecha (opcional)"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog">Cancelar</v-btn>
                <v-btn @click="submitForm" :disabled="!valid">
                    {{ localTask.id ? "Guardar Cambios" : "Crear Tarea" }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
                default: () => ({}),
            },
            dialog: Boolean,
        },
        data() {
            return {
                localTask: { ...this.task },
                valid: false,
            };
        },
        watch: {
            task: {
                handler(newTask) {
                    this.localTask = { ...newTask };
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            closeDialog() {
                this.$emit("update:dialog", false);
                this.resetForm();
            },
            submitForm() {
                if (this.$refs.form.validate()) {
                    this.$emit("submit", this.localTask);
                    this.closeDialog();
                }
            },
            resetForm() {
                this.localTask = {
                    title: '',
                    description: '',
                    tag: 'incomplete',
                    due_date: '',
                    image: null,
                };
                this.valid = false;
            },
        },
    };
</script>