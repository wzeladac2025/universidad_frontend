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
      <el-form-item label="Carnet del Docente">
        <el-input v-model="carnetDocente" placeholder="Ingrese su carnet" />
        <el-button type="primary" @click="cargarCursosPorCarnet">
          Buscar cursos
        </el-button>
      </el-form-item> 
      
        <el-form-item prop="id_curso" label="Curso">
          <el-select
            v-model="id_curso"
            placeholder="Seleccione un curso"
            @change="cargarActividades"
  >
            >
              <el-option
                v-for="curso in listadoCursos"
                :key="curso.id"
                :label="curso.materium.nombre"
                :value="curso.id"
              />
            </el-select>
          </el-form-item>

      <el-form-item prop="actividad" label="Actividad">
        <el-select
          v-model="form.actividad"
          placeholder="Seleccione una actividad para asignar notas"
          style="width: 350px;"
          @change="cargarListadoEstudiantesActividad"
        >
          <el-option
            v-for="act in listadoActividades"
            :key="act.id"
            :label="act.nombre"
            :value="act.id"
          />
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
       <el-descriptions
        v-if="actividadSeleccionada"
        class="margin-top"
        style="background-color: white; border: 1px solid #ccc; padding: 10px;"
        :column="1"
        title="Descripción de Actividad"
        border
      >
      <el-descriptions-item>
        <template #label>Nombre de Actividad</template>
        {{ actividadSeleccionada?.nombre || "Sin nombre" }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>Descripción</template>
        {{ actividadSeleccionada?.descripcion || "Sin descripción" }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>Fecha de Entrega</template>
        {{ actividadSeleccionada?.fecha_entrega || "No definida" }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>Punteo Neto</template>
        {{ actividadSeleccionada?.punteo || "No definido" }}
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
    <el-table :data="listadoEstudiantes" style="width: 100%;">
      <el-table-column prop="carnet" label="Carnet" />
      <el-table-column prop="nombre" label="Nombres" />
      <el-table-column prop="apellido" label="Apellidos" />

      <!-- Campo para escribir la nota -->
      <el-table-column label="Nota">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.nota"
            :min="0"
            :max="actividadSeleccionada?.punteo ?? 100"
            placeholder="Ingrese nota"
            size="small"
            style="width: 100px;"
          />
        </template>
      </el-table-column>

      <!-- Acciones (por ahora solo los botones vacíos) -->
      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button size="small" type="primary" @click= "actualizarNotaEstudiante(scope.row)">
            Ingresar Nota 
          </el-button>
          <el-button size="small" type="danger">
            Editar Nota 
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped></style>
