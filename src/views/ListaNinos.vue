<template>
  <div class="container mt-4">
    <h2 class="text-center">Listado de Niños</h2>

    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-purple text-white">
          <router-link to="/ninos/add" class="nav-link">
            <strong class="text-white">Agregar niño 👶</strong>
          </router-link>
        </button>
      </div>

      <div class="col-md-6 text-right">
        <button class="btn btn-info">
          <router-link to="/registros" class="nav-link">
            <strong class="text-white">Volver</strong>
          </router-link>
        </button>
      </div>
    </div>

    <br>
    <br>

    <div class="alert alert-info" role="alert">
      <strong>Importante:</strong> Seleccione (dar click o presione) sobre algún registro para editar o agregar información.
    </div>

    <div class="table-responsive table-container">
      <table id="myTable" class="table table-hover table-sm custom-table">
        <thead>
          <tr>
            <th scope="col">Cédula</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Provincia</th>
            <th scope="col">Cantón</th>
            <th scope="col">Celular</th>
            <th scope="col">Fecha de Registro</th>
            <th scope="col">Sexo</th>
            <th scope="col">Fecha nacimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(niño, index) in filteredNiños" :key="index" @click="redirectToNiño(niño._id)">
            <td>{{ niño.cedula }}</td>
            <td>{{ niño.nombres }}</td>
            <td>{{ niño.apellidos }}</td>
            <td>{{ niño.provincia }}</td>
            <td>{{ niño.canton }}</td>
            <td>{{ niño.celular }}</td>
            <td>{{ niño.fechaRegistro.slice(0,10) }}</td>
            <td>{{ niño.sexo }}</td>
            <td>{{ niño.fechanacimiento.slice(0,10) }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../store/config';

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredNiños() {
      if (this.currentUser.roles.includes('ROLE_BRIGADA')) {
        return this.niños.filter(niño => niño.createdBy.cedula === this.currentUser.cedula);
      } else {
        return this.niños;
      }
    },
  },
  data() {
    return {
      niños: [],
      errorLoadingNiños: null,
    };
  },
  methods: {
    redirectToNiño(ninoId) {
      this.$router.push({ name: 'ninos', params: { ninoId } });
    },
    loadNiños() {
      axios
        .get(`${BASE_URL}/api/nino`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then(response => {
          this.niños = response.data;
          this.$nextTick(() => {
            $('#myTable').DataTable({
              responsive: true,
              language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
              },
            });
          });
        })
        .catch(error => {
          this.errorLoadingNiños = 'Error al cargar niños. Por favor, inténtalo de nuevo.';
          console.error('Error al cargar niños:', error);
        });
    },
  },
  mounted() {
    this.loadNiños();
  },
};
</script>

<style scoped>
.btn-purple {
  background-color: purple;
  border-color: purple;
}

.custom-table {
  background-color: #92ce95; /* Color de fondo morado */
  border-collapse: separate;
  border-spacing: 0 1px; /* Espaciado vertical entre las filas */
}

.custom-table tbody tr:hover {
  background-color: rgba(191, 245, 205, 0.835); /* Color celeste pastel en hover */
}

/* Estilo para las líneas de la tabla de DataTables */
table.dataTable.no-footer {
  border-bottom: 1px ; /* Cambia el color y el grosor según tus preferencias */
}

table.dataTable thead th, table.dataTable thead td {
  border-bottom: 1px ; /* Cambia el color y el grosor según tus preferencias */
}
</style>
