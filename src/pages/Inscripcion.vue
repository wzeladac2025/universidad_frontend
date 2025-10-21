<script lang="ts" src="./controllers/Inscripcion"></script>

<template>
  <el-card style="margin: 25px;">
    <template #header>
      <div class="card-header">
        <span>Inscripción y Asignación de Cursos</span>
      </div>
    </template>

    <!-- MAIN CONTENT -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item prop="carrera" label="Carrera">
        <el-select v-model="form.carrera" placeholder="Seleccione una carrera" filterable>
        </el-select>
      </el-form-item>
      <el-form-item prop="semestre" label="Semestre">
        <el-select v-model="form.semestre" placeholder="Seleccione un semestre">
          <el-option key="1" value="Primer Semestre"></el-option>
          <el-option key="2" value="Segundo Semestre"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="cursos" label="Cursos disponibles">
        <el-transfer v-model="form.cursos" filterable :filter-method="filtrarCurso" filter-placeholder="Buscar Curso"
          :titles="['Cursos disponibles', 'Cursos asignados']" :data="cursos" />
      </el-form-item>
    </el-form>

    <!-- DIALOGO CONFIRMACION Y PAGO -->
    <el-dialog v-model="mostrarDialogoPago" title="Resumen - Inscripcion y Asignacion Cursos">

      <!-- CURSOS ASIGNADOS -->
      <el-card style="margin: 25px;">
        <template #header>
          <div class="card-header">
            <span>Carrera y Cursos Asignados</span>
          </div>
        </template>

        <!-- MAIN CONTENT -->
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                Carrera
              </div>
            </template>
            Ingenieria en Sistemas
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                Semestre
              </div>
            </template>
            Primer Semestre
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                Cursos Asignados
              </div>
            </template>
            Desarrollo Web - A
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                Monto Total
              </div>
            </template>
            Q 100.00
          </el-descriptions-item>          
        </el-descriptions>
      </el-card>

      <el-card style="margin: 25px;">
        <template #header>
          <div class="card-header">
            <span>Pago Tarjeta de Credito</span>
          </div>
        </template>

        <!-- MAIN CONTENT -->
        <el-form ref="formRefPago" :model="formPago" :rules="rulesPago" label-width="auto">
          <el-form-item label="Metodo de Pago" prop="tipoPago">
            <el-select v-model="formPago.tipoPago" placeholder="Metodo de Pago" value-key="key"
              :change="habilitarCampos()">
              <el-option v-for="item in tiposPago" :key="item.key" :label="item.label" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="tipoPago == 1" label="Correo electrónico" prop="correo">
            <el-input v-model="formPago.correo" placeholder="correo@correo.com" />
          </el-form-item>

          <el-form-item v-if="tipoPago == 1" label="Descripción del pago" prop="descripcionPago">
            <el-input type="textarea" v-model="formPago.descripcionPago" placeholder="Motivo del pago" />
          </el-form-item>

          <el-form-item v-if="tipoPago == 1" label="Monto (QTZ)" prop="cantidad">
            <el-input-number v-model="formPago.monto" :min="1" :step="1" placeholder="Monto a pagar" :controls="false" disabled>
              <template #prefix>
                Q. 
              </template>
            </el-input-number>
          </el-form-item>

          <el-form-item v-if="tipoPago == 2" label="Nombre en la tarjeta" prop="nombreTarjeta">
            <el-input v-model="formPago.nombreTarjeta" placeholder="Nombres Apellidos" />
          </el-form-item>

          <el-form-item v-if="tipoPago == 2" label="Número de tarjeta" prop="numeroTarjeta">
            <el-input v-model="formPago.numeroTarjeta" placeholder="XXXX XXXX XXXX XXXX" maxlength="19"
              @input="formatNumeroTarjeta" />
          </el-form-item>

          <el-form-item v-if="tipoPago == 2" label="Fecha de expiración (MM/AA)" prop="expiracion">
            <el-input v-model="formPago.expiracion" placeholder="MM/AA" maxlength="5" @input="formatExpiracion" />
          </el-form-item>

          <el-form-item v-if="tipoPago == 2" label="CVV" prop="cvv">
            <el-input v-model="formPago.cvv" placeholder="XXX" maxlength="3" show-password />
          </el-form-item>
        </el-form>
      </el-card>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="mostrarDialogoPago = false">Cancelar</el-button>
          <el-button type="primary" @click="confirmarPago()">
            Realizar Pago e Inscribirse
          </el-button>
        </div>
      </template>
    </el-dialog>

    <template #footer>
      <el-button type="primary" @click="realizarInscripcion()">Proceder al pago e Inscribirse</el-button>
    </template>
  </el-card>
</template>

<style>
.el-transfer-panel {
  width: 500px;
}
</style>