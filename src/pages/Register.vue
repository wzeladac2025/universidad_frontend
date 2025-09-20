<script lang="ts" src="./controllers/Register.ts"></script>

<template>
    <el-row :gutter="24">
        <el-col :span="12" :offset="6">
            <el-row :gutter="24">
                <p style="text-align: center; width: 100%;">Registrar Usuario</p>
            </el-row>
            <el-row :gutter="24">
                <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
                    style="width: 100%;">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item prop="perfilUsuario">
                                <el-select v-model="form.perfilUsuario" placeholder="Perfil de Usuario">
                                    <el-option v-for="item in perfiles" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="correoUsuario">
                                <el-input v-model="form.correoUsuario" placeholder="Correo Electronico" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item prop="primerNombre">
                                <el-input v-model="form.primerNombre" placeholder="Primer Nombre" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="segundoNombre">
                                <el-input v-model="form.segundoNombre" placeholder="Segundo Nombre" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item prop="primerApellido">
                                <el-input v-model="form.primerApellido" placeholder="Primer Apellido" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="segundoApellido">
                                <el-input v-model="form.segundoApellido" placeholder="Segundo Apellido" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <div style="text-align: center; width: 100%;">
                            <el-button type="primary" :icon="checkIcon" @click="registerUser()">Registrar
                                Usuario</el-button>
                            <el-button type="info" :icon="backIcon" @click="regresar()">Regresar</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-col>
    </el-row>
</template>

<style></style>