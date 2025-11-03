<script lang="ts" src="./controllers/Inscripcion.ts"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Inscripción y Asignación de Cursos</span>
      </div>
    </template>

    <!-- FORMULARIO DE INSCRIPCION -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="carrera" label="Carrera">
        <el-select v-model="form.carrera" placeholder="Seleccione una carrera" filterable>
          <el-option
            v-for="c in ['Ingeniería en Sistemas', 'Ingeniería Industrial']"
            :key="c"
            :label="c"
            :value="c"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="semestre" label="Semestre">
        <el-select v-model="form.semestre" placeholder="Seleccione un semestre">
          <el-option key="1" value="Primer Semestre">Primer Semestre</el-option>
          <el-option key="2" value="Segundo Semestre">Segundo Semestre</el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="cursos" label="Cursos disponibles">
        <el-transfer
          v-model="form.cursos"
          filterable
          :filter-method="filtrarCurso"
          filter-placeholder="Buscar Curso"
          :titles="['Cursos disponibles', 'Cursos asignados']"
          :data="cursos"
        />
      </el-form-item>
    </el-form>

    <!-- FOOTER DEL CARD -->
    <template #footer>
      <el-button type="primary" @click="realizarInscripcion()">Proceder al pago e Inscribirse</el-button>
    </template>

    <!-- MODAL DE CONFIRMACION Y PAGO -->
    <el-dialog
      v-model="mostrarDialogoPago"
      title="Resumen - Inscripción y Asignación de Cursos"
      width="600px"
      :close-on-click-modal="false"
    >
      <!-- CURSOS ASIGNADOS -->
      <el-card style="margin-bottom: 20px;">
        <template #header>
          <div class="card-header">
            <span>Carrera y Cursos Asignados</span>
          </div>
        </template>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="Carrera">{{ form.carrera }}</el-descriptions-item>
          <el-descriptions-item label="Semestre">{{ form.semestre }}</el-descriptions-item>
          <el-descriptions-item label="Cursos Asignados">
            <ul>
              <!-- Muestra correctamente los nombres incluso si el-transfer devuelve solo keys -->
              <li
                v-for="c in form.cursos"
                :key="typeof c === 'object' ? c.key : c"
              >
                {{
                  typeof c === 'object'
                    ? c.label
                    : (cursos.find((curso) => curso.key === c)?.label || 'Desconocido')
                }}
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item label="Monto Total">Q {{ form.monto }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- FORMULARIO DE PAGO -->
      <el-card>
        <template #header>
          <div class="card-header">
            <span>Stripe</span>
          </div>
        </template>
        <el-form ref="formRefPago" :model="formPago" :rules="rulesPago" label-width="auto">
          <el-form-item label="Método de Pago" prop="tipoPago">
            <el-select
              v-model="formPago.tipoPago"
              placeholder="Seleccione método de pago"
              @change="habilitarCampos"
              value-key="key"
            >
              <el-option v-for="item in tiposPago" :key="item.key" :label="item.label" :value="item" />
            </el-select>
          </el-form-item>

          <!-- PAYPAL -->
          <template v-if="tipoPago === 1">
            <el-form-item label="Correo electrónico" prop="correo">
              <el-input v-model="formPago.correo" placeholder="correo@correo.com" />
            </el-form-item>

            <el-form-item label="Descripción del pago" prop="descripcionPago">
              <el-input type="textarea" v-model="formPago.descripcionPago" placeholder="Motivo del pago" />
            </el-form-item>

            <el-form-item label="Monto (QTZ)" prop="monto">
              <el-input-number v-model="formPago.monto" :min="1" :step="1" disabled>
                <template #prefix>Q. </template>
              </el-input-number>
            </el-form-item>
          </template>

          <!-- TARJETA -->
          <template v-if="tipoPago === 2">
            <el-form-item label="Nombre en la tarjeta" prop="nombreTarjeta">
              <el-input v-model="formPago.nombreTarjeta" placeholder="Nombres Apellidos" />
            </el-form-item>

            <el-form-item label="Número de tarjeta" prop="numeroTarjeta">
              <el-input
                v-model="formPago.numeroTarjeta"
                placeholder="XXXX XXXX XXXX XXXX"
                maxlength="19"
                @input="formatNumeroTarjeta"
              />
            </el-form-item>

            <el-form-item label="Fecha de expiración (MM/AA)" prop="expiracion">
              <el-input
                v-model="formPago.expiracion"
                placeholder="MM/AA"
                maxlength="5"
                @input="formatExpiracion"
              />
            </el-form-item>

            <el-form-item label="CVV" prop="cvv">
              <el-input v-model="formPago.cvv" placeholder="XXX" maxlength="4" show-password />
            </el-form-item>
          </template>
        </el-form>
      </el-card>

      <!-- FOOTER DEL DIALOG -->
      <template #footer>
        <el-button @click="mostrarDialogoPago = false">Cancelar</el-button>
        <el-button type="primary" @click="confirmarPago">Realizar Pago e Inscribirse</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.el-transfer-panel {
  width: 500px;
}
.card-header {
  font-weight: bold;
  font-size: 16px;
}
</style>
