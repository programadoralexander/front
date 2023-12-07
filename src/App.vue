<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary text-white">
      <a href class="navbar-brand" @click.prevent>Libreta Integral de Salud</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto ">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" />INICIO
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/prueba" class="nav-link">
              <font-awesome-icon icon="home" />PRUEBA
            </router-link>
          </li>

          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin"  class="nav-link">
              <font-awesome-icon icon="users" />  Usuarios
            </router-link>
          </li>
          
          <li v-if="showModeratorBoard" class="nav-item">
            <router-link to="/registros" class="nav-link">Registros</router-link>
          </li>
        </ul>
        
        
        
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" />REGISTRARSE
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" />INICIAR SESIÓN
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.cedula }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />LogOut
            </a>
          </li>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMINISTRADOR');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_SUPERVISOR') || this.currentUser.roles.includes('ROLE_ADMINISTRADOR') || this.currentUser.roles.includes('ROLE_BRIGADA');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>


