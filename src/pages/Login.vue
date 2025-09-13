<script lang="ts" src="./controllers/Login"></script>

<template>
  <el-header height="default">
    <!-- Header content -->
  </el-header>

  <el-main height="default">
    <!-- Main content -->
    <el-row :gutter="24">
      <el-col :span="12" :offset="6">
        <el-row :gutter="24">
          <p style="text-align: center; width: 100%;">Bienvenido/a {{ form.tipoUsuario }}</p>
        </el-row>
        <el-row :gutter="24">
          <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" style="width: 100%;">
            <el-form-item prop="nombreUsuario">
              <el-input v-model="form.nombreUsuario" placeholder="Correo de Usuario" class="input-with-select">
                <template #prepend>
                  <el-button :icon="user" />
                </template>
                <template #append prop="tipoUsuario">
                  <div class="tipoUsuario">
                    <el-form-item prop="tipoUsuario">
                    <el-select v-model="form.tipoUsuario" placeholder="Perfil de Usuario" style="width: 175px">
                      <el-option label="Estudiante" value="Estudiante" />
                      <el-option label="Docente" value="Docente" />
                      <el-option label="Adminstrador" value="Administrador" />
                    </el-select>
                  </el-form-item>
                  </div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" placeholder="Contraseña">
                <template #prepend>
                  <el-button :icon="lock" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div style="text-align: center; width: 100%;">
                <el-button type="primary" @click="login()">Iniciar Sesión</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </el-main>

  <el-footer height="" justify="center">
    <!-- Footer content -->
  </el-footer>
</template>

<style>
.centrar {
  text-align: center;
}

.tipoUsuario .el-select__wrapper:hover {
  box-shadow: none !important;
}

.tipoUsuario .el-form-item__error {
  margin-left: -20px;
}
</style>