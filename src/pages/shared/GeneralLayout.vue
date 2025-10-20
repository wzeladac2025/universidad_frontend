<script lang="ts" src="./controllers/GeneralLayout"></script>

<template>
  <el-container class="layout-container" style="height: auto">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu>
          <el-sub-menu index="1" class="principal">
            <template #title>
              <el-icon color="#000000">
                <Menu />
              </el-icon>Seguridad
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="menuAcceso()"><el-icon>
                  <DArrowRight />
                </el-icon>Accesos</el-menu-item>
              <el-menu-item index="1-2" @click="menuUsuario()"><el-icon>
                  <DArrowRight />
                </el-icon>Usuarios</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
        <el-menu>
          <el-sub-menu index="2" class="principal">
            <template #title><el-icon>
                <Menu />
              </el-icon>Administracion</template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><el-icon>
                  <DArrowRight />
                </el-icon>Estudiantes</el-menu-item>
              <el-menu-item index="2-2"><el-icon>
                  <DArrowRight />
                </el-icon>Docentes</el-menu-item>
              <el-menu-item index="2-3" @click="menuCarrera()"><el-icon>
                  <DArrowRight />
                </el-icon>Carreras</el-menu-item>
              <el-menu-item index="2-4" @click="menuMateria()"><el-icon>
                  <DArrowRight />
                </el-icon>Materias</el-menu-item>
              <el-menu-item index="2-5" @click="menuCurso()"><el-icon>
                  <DArrowRight />
                </el-icon>Cursos</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
        <el-menu>
          <el-sub-menu index="3" class="principal">
            <template #title>
              <el-icon color="#000000">
                <Menu />
              </el-icon>Estudiante
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><el-icon>
                  <DArrowRight />
                </el-icon>Inscribirse</el-menu-item>
              <el-menu-item index="3-2"><el-icon>
                  <DArrowRight />
                </el-icon>Asignación de cursos</el-menu-item>
              <el-menu-item index="3-3"><el-icon>
                  <DArrowRight />
                </el-icon>Tareas</el-menu-item>
              <el-menu-item index="3-4"><el-icon>
                  <DArrowRight />
                </el-icon>Ver Notas</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
        <el-menu>
          <el-sub-menu index="4" class="principal">
            <template #title>
              <el-icon color="#000000">
                <Menu />
              </el-icon>Docente
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><el-icon>
                  <DArrowRight />
                </el-icon>Ingresar Notas</el-menu-item>
              <el-menu-item index="4-2"><el-icon>
                  <DArrowRight />
                </el-icon>Registrar Actividades</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <User />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="perfil">Perfil de Usuario</el-dropdown-item>
                <el-dropdown-item>Cambiar Contraseña</el-dropdown-item>
                <el-dropdown-item @click="logout">Cerrar Sesión</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Nombre Usuario</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh !important;
}

.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0;
}

.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

element.style .el-header {
  height: 56px;
}

.principal {
  background-color: var(--el-color-primary);
}
</style>