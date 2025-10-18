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
        <el-input v-model="form.periodo" placeholder="Periodo" />
      </el-form-item>
      <el-form-item prop="seccion" label="Seccion">
        <el-input v-model="form.seccion" placeholder="Seccion" />
      </el-form-item>
      <el-form-item prop="cupo" label="Cupo">
        <el-input v-model="form.cupo" placeholder="Cupo" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>