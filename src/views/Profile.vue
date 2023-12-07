<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
          Información del usuario actual
      </h3>
    </header>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Nombre:</strong>
      {{currentUser.nombre.toUpperCase()}} {{ currentUser.apellido.toUpperCase() }}
    </p>
    <strong>ROL ACTUAL:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
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