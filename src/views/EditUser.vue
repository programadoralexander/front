<template>
  <div>
    <h2>Editar Usuario</h2>
    <form @submit.prevent="updateUser">
      
      <div class="form-group">
           <div v-if="message" class="alert alert-danger" role="alert">
              <div v-for="(error, index) in message" :key="index">
                  {{ error.msg }}
                    </div>
            </div>
      </div>
      
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="editedUserData.nombre" class="form-control"  />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input type="text" v-model="editedUserData.apellido" class="form-control"  />
      </div>
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="editedUserData.cedula" class="form-control"  />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" v-model="editedUserData.email" class="form-control"  />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="editedUserData.password" class="form-control" />
      </div>
      <div class="form-group">
        <label for="role">Rol:</label>
        <select v-model="selectedRoles" class="form-control" required>
          <option v-for="role in roles" :key="role._id" :value="role._id">{{ role.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar Usuario</button>
    </form>
  


  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { BASE_URL } from '../store/config';

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['auth']),
    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedRoles: {
      get() {
        return this.editedUserData.roles ? this.editedUserData.roles.join(', ') : '';
      },
      set(value) {
        this.editedUserData.roles = value.split(',').map(role => role.trim());
      },
    },
  },
  data() {
    return {
      message:'',
      editedUserData: {
        nombre:'',
        apellido:'',
        cedula: '',
        email: '',
        password: '',
        roles: null,
      },
      roles: [], // Lista de roles obtenidos desde la API
    };
  },
  mounted () {
    if (!this.currentUser || !this.currentUser.roles.includes('ROLE_ADMINISTRADOR')) {
      this.$router.push('/login');
    } else {
      this.loadRoles();
    }

    
    const userId = this.$route.params.userId;

    // Realiza una solicitud para obtener los detalles del usuario
    axios.get(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        'x-access-token': this.$store.state.auth.user.accessToken,
      },
    })
    .then(response => {
     
      // Llena los campos del formulario con los detalles del usuario
      this.editedUserData = response.data;

    })
    .catch(error => {
      console.error('Error al obtener detalles del usuario:', error);
      
    });
    
  },
  methods: {
    // Método para obtener la lista de roles desde la API
    loadRoles() {
      
      axios.get(`${BASE_URL}/api/roles`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(response => {
        this.roles = response.data;
      })
      .catch(error => {
        console.error('Error al cargar roles:', error);
      });
    },
    updateUser() {
      const userId = this.$route.params.userId;
  /* eslint-disable */
      axios.put(`${BASE_URL}/api/users/${userId}`, this.editedUserData, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: 'Usuario Actualizado',
          text: 'El usuario ha sido actualizado correctamente.',
          icon: 'success',
          button: 'OK',
        });

        this.$router.push('/admin');
      })
      .catch(error => {
        this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
      });
    },
  },

};
</script>
