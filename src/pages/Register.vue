<script lang="ts" src="./controllers/Register.ts"></script>

<template>
    <div class="contenedor-central">
        <el-card style="width: 700px;">
            <template #header>
                <div class="card-header">
                    <span>Registrar Usuario</span>
                </div>
            </template>

            <!-- MAIN CONTENT -->
            <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
                <el-form-item prop="role">
                    <el-select v-model="form.role" placeholder="Perfil de Usuario">
                        <el-option v-for="item in perfiles" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="nombres">
                    <el-input v-model="form.nombres" placeholder="Nombres" />
                </el-form-item>
                <el-form-item prop="apellidos">
                    <el-input v-model="form.apellidos" placeholder="Apellidos" />
                </el-form-item>
                <el-form-item prop="correo">
                    <el-input v-model="form.correo" placeholder="Correo Electronico" />
                </el-form-item>
                <el-form-item prop="contrasena">
                    <el-input v-model="form.contrasena" placeholder="Contrasena" type="password" />
                </el-form-item>

            </el-form>

            <template #footer>
                <el-button type="primary" :icon="checkIcon" @click="registerUser()">Registrar
                    Usuario</el-button>
                <el-button type="default" :icon="backIcon" @click="regresar()">Regresar</el-button>
            </template>
        </el-card>
    </div>
</template>

<style></style>