<script lang="ts" src="./controllers/Actividad"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Crear Actividad</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="curso" label="Curso">
        <el-select v-model="form.curso" placeholder="Seleccione un curso para cargar sus notas"
          :change="cargarActividades">
        </el-select>
      </el-form-item>
      <el-form-item prop="nombre" label="Nombre de Actividad">
        <el-input v-model="form.nombre" placeholder="Nombre" />
      </el-form-item>
      <el-form-item prop="descripcion" label="Descripcion">
        <el-input v-model="form.descripcion" placeholder="Descripcion" />
      </el-form-item>
      <el-form-item prop="tipo" label="Tipo">
        <el-select v-model="form.tipo" placeholder="Seleccione un tipo de actividad" value-key="id">
          <el-option v-for="item in tiposActividad" :key="item.id" :label="item.nombre" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item prop="fechaEntrega" label="Fecha de Entrega">
        <!-- <el-input v-model="form.fechaEntrega" placeholder="Fecha de Entrega" /> -->
        <el-date-picker v-model="form.fechaEntrega" type="datetime" placeholder="Fecha de entrega" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarActividad()">Registrar
        Actividad</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Actividades - Curso: @Curso</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoActividades" style="width: 100%;">
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="descripcion" label="Descripcion" />
      <el-table-column prop="fechaEntrega" label="Fecha de Entrega" />
      <el-table-column prop="tipo.nombre" label="Tipo Actividad" />
      <!-- <el-table-column label="Periodo">
        <template #default="scope">
          {{ periodo(scope.row.periodo) }}
        </template>
      </el-table-column> -->
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