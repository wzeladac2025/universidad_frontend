<script lang="ts" src="./controllers/Estudiante"></script>
<!-- Pendiente -->
<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Actualizar informacion estudiante</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
            <el-form-item prop="id_usuario" label="Usuario">
        <el-select v-model="form.id_usuario" placeholder="Seleccione el correo del usuario">
          <el-option v-for="item in listadoUsuarios" :key="item.id" :label="item.correo" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="DIP" label="DPI">
        <el-input v-model="form.DPI" placeholder="Numero de DPI" />
      </el-form-item>
      <el-form-item prop="nombre" label="Nombres">
        <el-input v-model="form.nombre" placeholder="Nombres del Docente" />
      </el-form-item>
      <el-form-item prop="apellido" label="Apellidos">
        <el-input v-model="form.apellido" placeholder="Apellidos del Docente" />
      </el-form-item>
          <el-form-item prop="fecha_nacimiento" label="Fecha de nacimiento">
          <el-date-picker
            v-model="form.fechaNacimiento"
            type="date"
            placeholder="Fecha de nacimiento"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
          <el-form-item prop="genero" label="Genero">
        <el-radio-group v-model="form.genero">
          <el-radio :value="true" size="large" border>Masculino</el-radio>
          <el-radio :value="false" size="large" border>Femenino</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarEstudiante()">Actualizar
        Estudiante</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Estudiantes</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoEstudiantes" style="width: 100%;">
            <el-table-column prop="carnet" label="Carnet" />
      <el-table-column prop="DPI" label="DPI" />
      <el-table-column prop="nombre" label="Nombres" />
      <el-table-column prop="apellido" label="Apellidos" />
      <el-table-column label="Género">
        <template #default="scope">
          {{ scope.row.genero ? "Masculino" : "Femenino" }}
        </template>
      </el-table-column>
      <el-table-column prop="fechaNacimiento" label="Nacimiento" />
      <el-table-column label="Estado">
        <template #default="scope">
          {{ scope.row.status ? "Activo" : "Inactivo" }}
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