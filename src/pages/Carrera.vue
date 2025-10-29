<script lang="ts" src="./controllers/Carrera"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Registrar Carrera</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="facultad" label="Facultad">
        <el-select v-model="form.facultad" placeholder="Seleccione una facultad">
          <el-option v-for="item in facultades" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="nombre" label="Nombre">
        <el-input v-model="form.nombre" placeholder="Nombre" />
      </el-form-item>
      <el-form-item prop="duracion" label="Duracion">
        <el-input-number v-model="form.duracion" placeholder="Duracion" :controls="false" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="registrarCarrera()">Registrar
        Carrera</el-button>
    </template>    
  </el-card>

  <!-- LISTADO CURSOS -->
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Listado de Carreras</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-table :data="listadoCarreras" style="width: 100%;">
      <el-table-column label="Facultad">
        <template #default="scope">
          {{ nombreFacultad(scope.row.facultad) }}
        </template>
      </el-table-column>
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="duracion" label="Duracion" />
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