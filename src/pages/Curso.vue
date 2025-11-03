<script lang="ts" src="./controllers/Curso">
import { normalizeClass } from 'vue';

</script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Curso</span>
      </div>
    </template>
    
    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="nombre_materia" label="Materia">
        <el-select
          v-model="form.nombre_materia"
          placeholder="Seleccione una materia"
          @change="asignarIdMateria"
        >
          <el-option
            v-for="item in listadoMaterias"
            :key="item.id"
            :label="item.nombre"
            :value="item.nombre"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="carnet_docente" label="Docente">
        <el-select
          v-model="form.carnet_docente"
          placeholder="Seleccione un docente"
          @change="asignarIdDocente"
        >
          <el-option
            v-for="item in listadoDocentes"
            :key="item.id"
            :label="item.carnet"
            :value="item.carnet"
          />
        </el-select>
      </el-form-item>



      <el-form-item prop="periodo" label="Periodo">
        <el-input v-model="form.periodo" placeholder="Periodo" />
      </el-form-item>

      <el-form-item prop="seccion" label="Sección">
        <el-input v-model="form.seccion" placeholder="Sección" />
      </el-form-item>

      <el-form-item prop="cupo_maximo" label="Cupo">
        <!-- el modificador `.number` convierte a entero automáticamente -->
        <el-input v-model.number="form.cupo_maximo" placeholder="Cupo" />
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
        <el-table-column label="Materia">
          <template #default="scope">
            {{ nombreMateria(scope.row.id_materia) }}
          </template>
        </el-table-column>

        <el-table-column label="Docente">
          <template #default="scope">
            {{ carnetDocente(scope.row.id_docente) }}
          </template>
        </el-table-column>
      <el-table-column prop="periodo" label="Periodo" />
      <el-table-column prop="seccion" label="Sección" />
      <el-table-column prop="cupo_maximo" label="Cupo" />
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