<script lang="ts" src="./controllers/Perfil"></script>

<template>
  <el-card class="user-profile">
    <div class="profile-header">
      <el-avatar :size="100" :src="form.avatar" />
      <div class="profile-info">
        <h2>{{ form.nombres }} {{ form.apellidos }}</h2>
        <p>{{ form.rol }}</p>
        <el-tag type="success">{{ form.estado }}</el-tag>
      </div>
    </div>

    <el-divider />

    <div class="profile-details">
      <el-descriptions title="Informacion de Usuario" column="1" border>
        <el-descriptions-item label="Email">{{ form.correo }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="profile-actions">
      <el-button type="primary" @click="editProfile">Editar</el-button>
      <el-button type="danger" @click="deleteAccount">Eliminar Usuario</el-button>
    </div>
  </el-card>
</template>

<style>
.user-profile {
  max-width: 600px;
  margin: 25px;
  padding: 1rem;
}

.profile-header {
  display: flex;
  gap: 1.5rem;
}

.profile-info h2 {
  margin: 0;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
</style>