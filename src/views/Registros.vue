<template>
    <div>
      <!-- Primera Sección -->
      <div class="container">
        <div class="row" style="margin-top: 50px; margin-left: 50px;">
          <div class="col-md-6">
            <!-- Imagen de la primera sección con estilo de miniatura -->
            <img src="./../assets/saludmaterna.png" class="img-thumbnail" alt="Imagen 1" style="width: 265px; height: 300px;">
            <!-- Botones de la primera sección -->
            <div class="mt-2">
  <!-- Primer botón -->
  <div class="w-50">
    <router-link to="/lista/mujer" class="btn btn-success btn-block">
      <font-awesome-icon :icon="['fas', 'search']" /> Consultar Mujer
    </router-link>
  </div>

  <!-- Segundo botón -->
  <div class="w-50 mt-2">
    <router-link to="/mujer/add" class="btn btn-primary btn-block">
      <font-awesome-icon :icon="['fas', 'user-plus']" /> Guardar Registros
    </router-link>
  </div>
</div>

          </div>
          <div class="col-md-6">
            <!-- Imagen de la segunda sección con estilo de miniatura -->
            <img src="./../assets/niños.png" class="img-thumbnail" alt="Imagen 2" style="width: 265px; height: 300px;">
            <!-- Botones de la segunda sección -->
            <div class="mt-2">
  <!-- Primer botón -->
  <div class="w-50">
    <router-link to="/lista/ninos" class="btn btn-success btn-block">
      <font-awesome-icon :icon="['fas', 'search']" /> Consultar Niños
    </router-link>
  </div>

  <!-- Segundo botón -->
  <div class="w-50 mt-2">
    <router-link to="/ninos/add" class="btn btn-primary btn-block">
      <font-awesome-icon :icon="['fas', 'user-plus']" /> Guardar Registros
    </router-link>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Registros',
    components: {
      
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>
  