<script lang="ts" src="./controllers/Login"></script>

<template>
  <!-- Main content -->
  <div class="contenedor">
    <div class="mitad mitad-central">
      <el-card style="width: 700px;">
        <template #header>
          <div class="card-header">
            <span>Iniciar Sesion</span>
          </div>
        </template>

        <!-- MAIN CONTENT -->
        <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large">
          <el-form-item prop="correoUsuario">
            <el-input v-model="form.correoUsuario" placeholder="Correo de Usuario" class="input-with-select">
              <template #prepend>
                <el-button :icon="userIcon" disabled/>
              </template>
              <template #append prop="tipoUsuario">
                <div class="tipoUsuario">
                  <el-form-item prop="tipoUsuario">
                    <el-select v-model="form.tipoUsuario" placeholder="Perfil de Usuario" style="width: 175px">
                      <el-option v-for="item in perfiles" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="Contraseña">
              <template #prepend>
                <el-button :icon="lockIcon" disabled/>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center; width: 100%;">
              <el-button type="primary" :icon="loginIcon" @click="login()">Iniciar Sesión</el-button>
              <el-button type="success" :icon="registerIcon" @click="register()">Registrarse</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="mitad mitad-imagen">

    </div>
  </div>
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

.contenedor {
  width: 100vw;
  height: 100vh;
}

.mitad {
  width: 50%;
  height: 100vh;
  float: left;
}

.mitad-central {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mitad-imagen {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.el-main {
  --el-main-padding: 0 !important;
}
</style>