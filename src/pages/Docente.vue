<script lang="ts" src="./controllers/Docente"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Actualizar informacion docente</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="nombres" label="Nombres">
        <el-input v-model="form.nombres" placeholder="Nombres del Estudiante" />
      </el-form-item>
      <el-form-item prop="apellidos" label="Apellidos">
        <el-input v-model="form.apellidos" placeholder="Apellidos del Estudiante" />
      </el-form-item>
      <el-form-item prop="estado" label="Estado">
        <el-select v-model="form.estado" placeholder="Estado del estudiante">
          <el-option v-for="item in estados" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarDocente()">Actualizar
        Estudiante</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Docentes</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoDocentes" style="width: 100%;">
      <el-table-column prop="codigo" label="Codigo" />
      <el-table-column prop="nombres" label="Nombres" />
      <el-table-column prop="apellidos" label="Apellidos" />
      <el-table-column prop="estado.label" label="Estado" />
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