<script lang="ts" src="./controllers/Nota"></script>
<!-- Pendiente -->
<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Notas</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="carrera" label="Carrera">
        <el-select v-model="form.carrera" placeholder="Seleccione una carrera" filterable>
        </el-select>
      </el-form-item>
      <el-form-item prop="semestre" label="Semestre">
        <el-select v-model="form.semestre" placeholder="Seleccione un semestre">
          <el-option key="1" value="Primer Semestre"></el-option>
          <el-option key="2" value="Segundo Semestre"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="curso" label="Curso">
        <el-select v-model="form.curso" placeholder="Seleccione un curso para cargar sus notas"
          :change="cargarActividades">
        </el-select>
      </el-form-item>
    </el-form>

    <!-- CUADRO NOTAS -->
    <el-card style="margin: 25px;">
      <template #header>
        <div class="card-header">
          <span>Cuadro de Notas</span>
        </div>
      </template>

      <!-- MAIN CONTENT -->
      <el-table :data="listadoCursos" style="width: 100%;">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column label="Estado">
          <template #default="scope">
            <el-tag :type="scope.row.estado.id == 2 ? 'danger' : 'success'">{{ scope.row.estado.nombre}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="notaNeta" label="Nota Neta" />
      </el-table>
    </el-card>    

    <!-- LISTADO ACTIVIDADES -->
    <el-card style="margin: 25px;">
      <template #header>
        <div class="card-header">
          <span>Notas de Actividades</span>
        </div>
      </template>

      <!-- MAIN CONTENT -->
      <el-table :data="listadoActividades" style="width: 100%;">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="descripcion" label="Descripcion" />
        <el-table-column prop="fechaEntrega" label="Fecha de Entrega" />
        <el-table-column prop="fechaCalificacion" label="Fecha Calificado" />
        <el-table-column label="Estado">
          <template #default="scope">
            <el-tag :type="scope.row.estado.id == 2 ? 'danger' : 'success'">{{ scope.row.estado.nombre
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="nota" label="Nota" />
        <el-table-column prop="notaNeta" label="Nota Neta" />
      </el-table>
    </el-card>
  </el-card>
</template>

<style scoped></style>