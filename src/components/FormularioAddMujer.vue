<template>
  <div>
    <h2>Formulario de Información de la Mujer Embarazada</h2>

     <div class="form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        <div v-for="(error, index) in message" :key="index">
          <span v-html="error.msg"></span>
        </div>
      </div>
    </div>
    <div class="row">
  <div class="col-md-6">
    <button class="btn btn-info btn-sm ml-auto">
      <router-link to="/registros" class="nav-link">
        <span class="text-white">Volver</span>
      </router-link>
    </button>
  </div>
</div>


    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <!-- Fila 1 -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="hcu">HCU:</label>
            <input type="text" id="hcu" v-model="formData.hcu" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="cedula">Cédula:</label>
            <input type="text" id="cedula" v-model="formData.cedula" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="nombres">Nombres:</label>
            <input type="text" id="nombres" v-model="formData.nombres" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>
      </div>

      <!-- Fila 2 -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" v-model="formData.apellidos" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="tieneDiscapacidad">¿Tiene Discapacidad?</label>
            <select id="tieneDiscapacidad" v-model="formData.tieneDiscapacidad" class="form-control">
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
          </div>
        </div>

        <div v-if="formData.tieneDiscapacidad === 'si'" class="col-md-4">
          <div class="form-group">
            <label for="tipoDiscapacidad">Tipo de Discapacidad:</label>
            <input
              v-model="formData.tipoDiscapacidad"
              :disabled="formData.tieneDiscapacidad !== 'si'"
              type="text"
              id="tipoDiscapacidad"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="telfdomicilio">Teléfono Domicilio:</label>
            <input type="text" id="telfdomicilio" v-model="formData.telfdomicilio" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Fila 3 -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="celular">Celular:</label>
            <input type="text" id="celular" v-model="formData.celular" class="form-control" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" v-model="formData.direccion" class="form-control" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="zona">Zona:</label>
            <input type="text" id="zona" v-model="formData.zona" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Fila 4 -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="provincia">Provincia:</label>
            <input type="text" id="provincia" v-model="formData.provincia" class="form-control" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="canton">Cantón:</label>
            <input type="text" id="canton" v-model="formData.canton" class="form-control" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="parroquia">Parroquia:</label>
            <input type="text" id="parroquia" v-model="formData.parroquia" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Fila 5 -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="establecimiento">Establecimiento:</label>
            <input type="text" id="establecimiento" v-model="formData.establecimiento" class="form-control" />
          </div>
        </div>
        <!-- Puedes agregar más campos aquí -->
      </div>


      <!-- Fila 6 (Botón de enviar) -->
      <div class="row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </form>
    


  </div>
</template>

  
<script>
import axios from 'axios';
import swal from 'sweetalert';
import { BASE_URL } from '../store/config';

export default {
  computed:{
        currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      message:'',
      formData: {
        hcu: '',
        cedula: '',
        nombres: '',
        apellidos: '',
        discapacidad: '',
        telfdomicilio: '',
        celular: '',
        direccion: '',
        zona: '',
        provincia: '',
        canton: '',
        parroquia: '',
        establecimiento: '',
        createdBy: ''
      },
    };
  },
  methods: {
    submitForm() {
      this.formData.createdBy = this.currentUser.id;
      if (this.formData.tieneDiscapacidad === 'no') {
      this.formData.discapacidad = 'No';
    } else {
      this.formData.discapacidad = this.formData.tipoDiscapacidad;
    }

      axios.post(`${BASE_URL}/api/mujer`, this.formData, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: '¡Información Guardada!',
          text: 'La información de la madre ha sido guardada correctamente.',
          icon: 'success',
          button: 'OK',
        });

        this.$router.push('/lista/mujer');
   
    })
      .catch(error => {
        // Manejo de errores
        swal({
          title: 'Error',
          text: 'Hubo un error al guardar la información.',
          icon: 'error',
          button: 'OK',
        });
        this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
      });
    },
  },
};
</script>


<style scoped>
/* Estilos adicionales si es necesario */
</style>

