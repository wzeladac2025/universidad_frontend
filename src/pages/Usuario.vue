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
      <el-form-item prop="role" label="Role">
        <el-select v-model="form.role" placeholder="Seleccione un rol">
          <el-option v-for="item in perfiles" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="correo" label="Correo Electronico">
        <el-input v-model="form.correo" placeholder="Correo Electronico" />
      </el-form-item>
      <el-form-item prop="contrasena" label="Contraseña">
        <el-input v-model="form.contrasena" placeholder="Contraseña" />
      </el-form-item>
      <el-form-item prop="nombre" label="Nombres">
        <el-input v-model="form.nombre" placeholder="Nombres" />
      </el-form-item>
      <el-form-item prop="apellido" label="Apellidos">
        <el-input v-model="form.apellido" placeholder="Apellidos" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarUsuario()">Registrar
        Usuario</el-button>
    </template>
  </el-card>

<!-- LISTADO DE USUARIOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Usuarios</span>
      </div>
    </template>

    <el-table :data="listadoUsuarios" style="width: 100%">
      <el-table-column prop="role" label="Rol" />
      <el-table-column prop="correo" label="Correo Electronico" />
      <el-table-column prop="nombre" label="Nombres" />
      <el-table-column prop="apellido" label="Apellidos" />

      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button
            size="small"
            @click="editar(scope.$index, scope.row)"
          >
            Editar
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="eliminar(scope.$index, scope.row)"
          >
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped></style>