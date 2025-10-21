<script lang="ts" src="./controllers/Actividad"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Acceso</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="rol" label="Rol">
        <el-select v-model="form.rol" placeholder="Seleccione un rol">
          <el-option v-for="item in perfiles" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="acceso" label="Acceso">
        <el-input v-model="form.acceso" placeholder="Acceso" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarUsuario()">Registrar
        Acceso</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Accesos</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoUsuarios" style="width: 100%;">
      <el-table-column prop="rol.label" label="Rol" />
      <el-table-column prop="acceso" label="Acceso" />
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