<script lang="ts" src="./controllers/CertificadoCursos"></script>

<template>
    <div class="certificado-container">
        <el-page-header @back="volverAtras">
        <template #content>
            <h1>Certificado de Cursos Aprobados</h1>
        </template>
    </el-page-header>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
        <el-skeleton :rows="8" animated />
    </div>

    <!-- Error -->
    <el-alert
        v-if="error"
        title="Error al cargar datos"
            type="error"
        :description="error"
        show-icon
        :closable="false"
    />

    <!-- Contenido -->
    <div v-if="!loading && !error && datos">
        <!-- Información del estudiante -->
        <el-card class="info-card" shadow="hover">
            <h2>Información del Estudiante</h2>
            <el-descriptions :column="2" border>
                <el-descriptions-item label="Nombre">
                {{ datos.estudiante.nombre }} {{ datos.estudiante.apellido }}
                </el-descriptions-item>
            <el-descriptions-item label="Carnet">
                {{ datos.estudiante.carnet }}
            </el-descriptions-item>
            <el-descriptions-item label="Carrera" :span="2">
            {{ datos.estudiante.carrera }}
            </el-descriptions-item>
        </el-descriptions>
        </el-card>

        <!-- Tabla de cursos -->
        <el-card class="cursos-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <h2>Cursos Aprobados</h2>
            </div>
        </template>

        <el-table :data="datos.cursos" stripe border style="width: 100%">
            <el-table-column prop="codigo" label="Código" width="120" />
            <el-table-column prop="nombre" label="Nombre del Curso" min-width="200" />
            <el-table-column prop="nota_final" label="Nota Final" width="120" align="center">
            <template #default="scope">
              <el-tag :type="getNotaColor(scope.row.nota_final)" size="large">
                {{ scope.row.nota_final }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creditos" label="Créditos" width="100" align="center" />
          <el-table-column prop="periodo" label="Período" width="120" align="center" />
        </el-table>
      </el-card>

      <!-- Resumen -->
      <el-card class="resumen-card" shadow="hover">
        <template #header>
          <h2>Resumen Académico</h2>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8">
            <div class="stat-box">
              <div class="stat-icon"></div>
              <div class="stat-label">Total de Cursos</div>
              <div class="stat-value">{{ datos.resumen.totalCursos }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="stat-box">
              <div class="stat-icon"></div>
              <div class="stat-label">Total de Créditos</div>
              <div class="stat-value">{{ datos.resumen.totalCreditos }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="stat-box">
              <div class="stat-icon"></div>
              <div class="stat-label">Promedio General</div>
              <div class="stat-value">{{ datos.resumen.promedioGeneral }}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <!-- Botones de acción -->
      <div class="actions">
        <el-button @click="volverAtras" size="large">
          Volver
        </el-button>
        <el-button type="primary" @click="descargarPDF" size="large" :loading="descargando">
          📄 Descargar PDF
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certificado-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  color: #303133;
}

h2 {
  font-size: 20px;
  color: #303133;
  margin: 0;
}

.loading-container {
  margin-top: 20px;
}

.info-card,
.cursos-card,
.resumen-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-box {
  text-align: center;
  padding: 20px;
  background: background: linear-gradient(135deg, #00bfff 0%, #1e90ff 100%);
  border-radius: 10px;
  color: white;
  margin-bottom: 10px;
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
}

.actions {
  margin-top: 30px;
  text-align: center;
  display: flex;
  gap: 15px;
  justify-content: center;
}
</style>