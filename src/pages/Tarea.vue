<script lang="ts" src="./controllers/Tarea"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Completar Tarea</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="curso" label="Curso">
        <el-select v-model="form.curso" placeholder="Seleccione un curso para cargar sus actividades" :change="cargarActividades">
        </el-select>
      </el-form-item>
    </el-form>

    <!-- LISTADO ACTIVIDADES -->
    <el-card style="margin: 25px;">
      <template #header>
        <div class="card-header">
          <span>Listado de Actividades</span>
        </div>
      </template>

      <!-- MAIN CONTENT -->
      <el-table :data="listadoActividades" style="width: 100%;">
        <el-table-column type="expand">
          <template #default="props">
            <el-upload v-if="props.row.estado.id == 2" class="upload-demo" drag action="#"
              multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Arrastra tu archivo aquí o <em>click para cargar</em>
              </div>
              <template #tip>
                <div class="el-upload__tip" style="color: green;">
                  jpg/png, pdf o archivos .zip no mayores de 20MB
                </div>
              </template>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="descripcion" label="Descripcion" />
        <el-table-column prop="fecha" label="Fecha" />
        <el-table-column prop="fechaEntrega" label="Fecha de Entrega" />
        <el-table-column label="Estado">
          <template #default="scope">
            <el-tag :type="scope.row.estado.nombre == 'PENDIENTE' ? 'danger' : 'success'">{{ scope.row.estado.nombre
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-card>
</template>

<style scoped></style>