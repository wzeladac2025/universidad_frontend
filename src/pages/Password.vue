<script lang="ts" src="./controllers/Password"></script>

<template>
  <el-card class="change-password-card">
    <template #header>
      <div class="card-header">
        <span>Cambiar Contrasena</span>
      </div>
    </template>

    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" status-icon>
      <el-form-item label="Contrasena actual" prop="contrasenaActual">
        <el-input v-model="form.contrasenaActual" type="password" placeholder="Ingresar contrasena actual"
          show-password />
      </el-form-item>

      <el-form-item label="Nueva contrasena" prop="nuevaContrasena">
        <el-input v-model="form.nuevaContrasena" type="password" placeholder="Ingrese nueva contrasena" show-password />
      </el-form-item>

      <el-form-item label="Confirmar contrasena" prop="confirmarContrasena">
        <el-input v-model="form.confirmarContrasena" type="password" placeholder="Confirmar nueva contrasena"
          show-password />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="cambiarContrasena">Cambiar contrasena</el-button>
      <el-button @click="limpiar">Limpiar</el-button>
    </template>
  </el-card>
</template>

<style>
.change-password-card {
  margin: 25px;
}
</style>