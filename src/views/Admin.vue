<template>
  <div class="container mt-4">
    <h2>Dashboard usuarios</h2>

    <router-link to="/admin/add" class="btn btn-primary mb-2">Agregar Usuario</router-link>

    <div  class="table-responsive table-container">
      <table id="myTable" class="table table-hover table-sm custom-table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Cédula</th>
            <th scope="col">Correo electrónico</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="index">
            <td>{{ user.nombre}}</td>
            <td>{{ user.apellido}}</td>
            <td>{{ user.cedula }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles[0].name }}</td>
            <td>
              <router-link :to="'/admin/edit/' + user._id" class="btn btn-info btn-sm">Editar</router-link>
              <button @click="confirmDelete(user)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { BASE_URL } from '../store/config';

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredUsers() {
      return this.users
        .filter(user => user.email !== this.currentUser.email)
    },
  },
  data() {
    return {
      users: [],
      errorDeletingUser: null,
      errorLoadingUsers: null,
      searchQuery: '',
    };
  },
  methods: {
    confirmDelete(user) {
      swal({
        title: 'Confirmar Eliminación',
        text: `¿Estás seguro de que quieres eliminar a ${user.nombre}?`,
        icon: 'warning',
        buttons: ['Cancelar', 'Sí, eliminar'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.deleteUser(user._id);
        }
      });
    },
    deleteUser(userId) {
      axios
        .delete(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then(() => {
          swal('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
          this.loadUsers();
        })
        .catch(error => {
          this.errorDeletingUser = 'Error al eliminar usuario. Por favor, inténtalo de nuevo.';
          console.error('Error al eliminar usuario:', error);
        });
    },
    loadUsers() {
      axios
        .get(`${BASE_URL}/api/users`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then(response => {
          this.users = response.data;
          this.$nextTick(() => {
            /* eslint-disable */
            $('#myTable').DataTable({
              responsive: true,
              language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
              },
            });
          });
        })
        .catch(error => {
          this.errorLoadingUsers = 'Error al cargar usuarios. Por favor, inténtalo de nuevo.';
          console.error('Error al cargar usuarios:', error);
        });
    },
  },
  mounted() {
    const isAdmin = this.currentUser && this.currentUser.roles.includes('ROLE_ADMINISTRADOR');
    if (!isAdmin) {
      this.$router.push('/login');
    } else {
      this.loadUsers();
    }
  },
};
</script>

<style scoped>
/* Estilo para las líneas de la tabla de DataTables */
table.dataTable.no-footer {
  border-bottom: 1px ; /* Cambia el color y el grosor según tus preferencias */
}
table.dataTable thead th, table.dataTable thead td {
  border-bottom: 1px ; /* Cambia el color y el grosor según tus preferencias */
}


.table-container {
  background-color: #f0f0f0; /* Color de fondo del contenedor */
  border-radius: 10px; /* Bordes redondeados del contenedor */
  padding: 20px; /* Espaciado interno del contenedor */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Efecto de elevación con sombra */
}

.custom-table {
  background-color: #9692ce; /* Color de fondo morado */
  border-collapse: separate;
  border-spacing: 0 1px; /* Espaciado vertical entre las filas */
}

.custom-table tbody tr {
  background-color: #f0f0f0; /* Color celeste pastel en hover */
}

.custom-table tbody tr:last-child {
  border-bottom: none; /* Eliminar el borde inferior de la última fila */
}

.custom-table tbody tr:hover {
  background-color: rgba(225, 191, 245, 0.835); /* Color celeste pastel en hover */
}

button {
  margin-right: 5px;
}
</style>

