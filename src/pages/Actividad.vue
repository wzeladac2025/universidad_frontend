  <script lang="ts" src="./controllers/Actividad"></script>
  <!-- Pendiente -->
  <template>
    <el-card style="margin: 25px;">
      <template #header>
        <div class="card-header">
          <span>Crear Actividad</span>
        </div>
      </template>

      <!-- MAIN CONTENT -->
            <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="Carnet del Docente">
        <el-input v-model="carnetDocente" placeholder="Ingrese su carnet"/>
        <el-button type="primary" @click="cargarCursosPorCarnet">
          Buscar cursos
        </el-button>
      </el-form-item>
            <el-form-item prop="nombre_materia" label="Materia">
            <el-select
              v-model="form.nombre_materia"
              placeholder="Seleccione una materia"
              style="width: 350px;"
            >
              <el-option
                v-for="curso in listadoCursos"
                :key="curso.id"
                :label="`${curso.materium.nombre} - ${curso.seccion}`"
                :value="curso.materium.nombre"
              />
            </el-select>
          </el-form-item>
        <el-form-item prop="nombre" label="Nombre de Actividad">
          <el-input v-model="form.nombre" placeholder="Nombre" />
        </el-form-item>
        <el-form-item prop="descripcion" label="Descripcion">
          <el-input v-model="form.descripcion" placeholder="Descripcion" />
        </el-form-item>
          <el-form-item prop="tipo" label="Tipo">
            <el-select
              v-model="form.tipo"
              placeholder="Seleccione un tipo de actividad"
              style="width: 350px;"
            >
              <el-option
                v-for="item in tiposActividad"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        <el-form-item prop="fechaEntrega" label="Fecha de Entrega">
          <!-- <el-input v-model="form.fechaEntrega" placeholder="Fecha de Entrega" /> -->
          <el-date-picker v-model="form.fecha_entrega" type="datetime" placeholder="Fecha de entrega" />
        </el-form-item>
                <el-form-item prop="punteo" label="Punteo">
          <el-input v-model="form.punteo" placeholder="Punteo" />
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