<script lang="ts" src="./controllers/Usuario"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Usuario</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="rol" label="Rol">
        <el-select v-model="form.rol" placeholder="Seleccione un rol">
          <el-option v-for="item in perfiles" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="correo" label="Correo Electronico">
        <el-input v-model="form.correo" placeholder="Correo Electronico" />
      </el-form-item>
      <el-form-item prop="contrasena" label="Contrasena">
        <el-input v-model="form.contrasena" placeholder="Contrasena" />
      </el-form-item>
      <el-form-item prop="nombres" label="Nombres">
        <el-input v-model="form.nombres" placeholder="Nombres" />
      </el-form-item>
      <el-form-item prop="apellidos" label="Apellidos">
        <el-input v-model="form.apellidos" placeholder="Apellidos" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarUsuario()">Registrar
        Usuario</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Usuarios</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoUsuarios" style="width: 100%;">
      <el-table-column prop="rol.label" label="Rol" />
      <el-table-column prop="correo" label="Correo Electronico" />
      <el-table-column prop="nombres" label="Nombres" />
      <el-table-column prop="apellidos" label="Apellidos" />
      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button size="small" @click="editar(scope.$index, scope.row)" :disabled="index != -1">
            Editar
          </el-button>
          <el-button size="small" type="danger" @click="eliminar(scope.$index, scope.row)">
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped></style>