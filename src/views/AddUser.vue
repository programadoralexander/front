<template>
  <div>
    <h2>Agregar Usuario</h2>
    <form @submit.prevent="addUser">
      
      <div class="form-group">
           <div v-if="message" class="alert alert-danger" role="alert">
              <div v-for="(error, index) in message" :key="index">
                  {{ error.msg }}
                    </div>
            </div>
      </div>

    
<div class="form-group">
        <label for="nombre">Nombre de usuario:</label>
        <input type="text"  id="nombre" v-model="userData.nombre" class="form-control"   autocomplete="null" />
      </div>
  
      <div class="form-group">
        <label for="apellido">Apellido de usuario:</label>
        <input type="text"  id="apellido" v-model="userData.apellido" class="form-control"  autocomplete="null" />
      </div>


      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input type="text"  id="cedula" v-model="userData.cedula" class="form-control"   autocomplete="null" />
      </div>
  

      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" v-model="userData.email" class="form-control"  autocomplete="off" />
      </div>

    

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="userData.password" class="form-control"  autocomplete="off"/>
      </div>
   

      <div class="form-group">
        <label for="role">Rol:</label>
        <select id="role" v-model="userData.roles" class="form-control" >
          <option v-for="role in roles" :key="role._id" :value="role._id">{{ role.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Agregar Usuario</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
import swal from 'sweetalert';
import  { BASE_URL }  from '../store/config'; 

import { mapState } from 'vuex';


export default {
  computed: {
    ...mapState(['auth']),
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  data() {
    return {
      message: '',
      userData: {
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
  methods: {
    addUser() {
      /* eslint-disable */
      // Asegúrate de que userData.roles sea un array
    // Antes de enviar la solicitud, verifica si userData.roles es un array
if (!Array.isArray(this.userData.roles)) {
  this.userData.roles = [this.userData.roles];
}
        /* eslint-disable */

      // Convierte el array de roles a un string separado por comas
      this.userData.roles = this.userData.roles.join(',');

      // Realiza la lógica para agregar usuario aquí
      axios.post(`${BASE_URL}/api/users`, this.userData, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
    title: '¡Usuario Agregado!',
    text: 'El usuario ha sido agregado correctamente.',
    icon: 'success',
    button: 'OK',
  })

        this.$router.push('/admin');
      })
      .catch(error => {
        
        this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

      });
    },
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
        error.message
      });
    },
  },
  mounted() {
    if (!this.currentUser || !this.currentUser.roles.includes('ROLE_ADMINISTRADOR')) {
      this.$router.push('/login');
    } else {
      this.loadRoles();
    }
  }
};
</script>
