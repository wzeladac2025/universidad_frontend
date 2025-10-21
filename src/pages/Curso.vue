<script lang="ts" src="./controllers/Curso"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Curso</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="materia" label="Materia">
        <el-select v-model="form.materia" placeholder="Seleccione una materia">
        </el-select>
      </el-form-item>
      <el-form-item prop="docente" label="Docente">
        <el-select v-model="form.docente" placeholder="Seleccione un docente">
        </el-select>
      </el-form-item>
      <el-form-item prop="periodo" label="Periodo">
        <!-- <el-date-picker v-model="form.periodo" type="year" placeholder="Selecciona un periodo" /> -->
        <el-time-picker v-model="form.periodo" is-range range-separator="hasta" start-placeholder="Hora de inicio"
          end-placeholder="Hora de fin" format="HH:mm"/>
      </el-form-item>
      <el-form-item prop="seccion" label="Seccion">
        <el-input v-model="form.seccion" placeholder="Seccion" />
      </el-form-item>
      <el-form-item prop="cupo" label="Cupo">
        <el-input v-model="form.cupo" placeholder="Cupo" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarCurso()">Registrar
        Curso</el-button>
    </template>
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Cursos</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoCursos" style="width: 100%;">
      <el-table-column prop="materia" label="Materia" />
      <el-table-column prop="docente" label="Docente" />
      <el-table-column label="Periodo">
        <template #default="scope">
          {{ periodo(scope.row.periodo) }}
        </template>        
      </el-table-column>
      <el-table-column prop="seccion" label="Seccion" />
      <el-table-column prop="cupo" label="Cupo" />
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