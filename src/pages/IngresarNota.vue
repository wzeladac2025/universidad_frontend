<script lang="ts" src="./controllers/IngresarNota"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Ingresar Notas</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="curso" label="Curso">
        <el-select v-model="form.curso" placeholder="Seleccione un curso para cargar sus notas"
          :change="cargarActividades" filterable>
        </el-select>
      </el-form-item>
      <el-form-item prop="actividad" label="Actividad">
        <el-select v-model="form.actividad" placeholder="Seleccione una actividad para asignar notas"
          :change="cargarListadoEstudiantesActividad" filterable>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- MAIN CONTENT -->
    <el-card style="margin: 25px; margin-top: 50px;">
      <template #header>
        <div class="card-header">
          <span>Actividad: @Actividad</span>
        </div>
      </template>

      <!-- MAIN CONTENT -->
      <el-descriptions class="margin-top" :column="1" title="Descripcion de Actividad" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Nombre de Actividad
            </div>
          </template>
          Tarea #1
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Descripcion
            </div>
          </template>
          Esta es la descripcion de la actividad
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Fecha de Entrega
            </div>
          </template>
          2025-10-30
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Punteo Neto
            </div>
          </template>
          5
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de estudiantes - Actividad: @Actividad</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRefEstudiante" :model="formEstudiante" :rules="rulesEstudiante" label-width="auto">
      <el-table :data="listadoEstudiantes" style="width: 100%;">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="descripcion" label="Descripcion" />
        <el-table-column prop="fechaEntrega" label="Fecha de Entrega" />
        <el-table-column prop="tipo.nombre" label="Tipo Actividad" />
        <!-- <el-table-column label="Periodo">
        <template #default="scope">
          {{ periodo(scope.row.periodo) }}
        </template>
      </el-table-column> -->
        <el-table-column label="Ingresar Nota">
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
    </el-form>
  </el-card>
</template>

<style scoped></style>