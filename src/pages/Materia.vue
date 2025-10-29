<script lang="ts" src="./controllers/Materia"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Materia</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="id_carrera" label="Carrera">
        <el-select v-model="form.id_carrera" placeholder="Seleccione una carrera">
          <el-option v-for="item in listadoCarreras" :key="item.id" :label="item.nombre" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="nombre" label="Nombre">
        <el-input v-model="form.nombre" placeholder="Nombre" />
      </el-form-item>
      <el-form-item prop="credito" label="Credito">
        <el-input-number v-model="form.credito" placeholder="Credito" :controls="false" />
      </el-form-item>
      <el-form-item prop="semestre" label="Semestre">
        <el-select v-model="form.semestre" placeholder="Seleccione un semestre">
          <el-option key="1" label="Primer Semestre" value="1"></el-option>
          <el-option key="2" label="Segundo Semestre" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="obligatoriedad" label="Obligatoriedad">
        <el-radio-group v-model="form.obligatoriedad">
          <el-radio :value="true" size="large" border>SI</el-radio>
          <el-radio :value="false" size="large" border>NO</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarMateria()">Registrar
        Materia</el-button>
    </template>
  </el-card>

  <!-- LISTADO MATERIAS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Materias</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoMaterias" style="width: 100%;">
      <el-table-column label="Carrera">
        <template #default="scope">
          {{ nombreCarrera(scope.row.id_carrera) }}
        </template>
      </el-table-column>
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="credito" label="Credito" />
      <el-table-column label="Semestre">
        <template #default="scope">
          {{ nombreSemestre(scope.row.semestre) }}
        </template>
      </el-table-column>
      <el-table-column label="Obligacion">
        <template #default="scope">
          {{ nombreObligatoriedad(scope.row.obligatoriedad) }}
        </template>
      </el-table-column>
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