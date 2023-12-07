<template>
  <div>
    <h2 class="text-center mb-4">Información del Niño/a: {{ formData.nombres.toLocaleUpperCase() }}  {{  formData.apellidos.toLocaleUpperCase()  }}</h2>

    <div class="form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        <div v-for="(error, index) in message" :key="index">
          <span v-html="error.msg"></span>
        </div>
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
            <label for="cedulamadre">Cédula madre:</label>
            <input type="text" id="cedulamadre" v-model="formData.cedulamadre" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>


      </div>

      <div class="row">

     
        <div class="col-md-4">
          <div class="form-group">
            <label for="nombres">Nombres:</label>
            <input type="text" id="nombres" v-model="formData.nombres" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>

           <div class="col-md-4">
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" v-model="formData.apellidos" class="form-control" required />
            <div class="invalid-feedback">Este campo es obligatorio.</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="discapacidad">Discapacidad:</label>
            <select id="discapacidad" v-model="formData.discapacidad" class="form-control">
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div class="col-md-4">
      <div v-if="formData.discapacidad === 'Si'" class="form-group">
        <label for="detalleDiscapacidad">Detalle de la Discapacidad:</label>
        <input type="text" id="detalleDiscapacidad" v-model="formData.detalleDiscapacidad" class="form-control" />
      </div>
    </div>

    <div class="col-md-4">
          <div class="form-group">
            <label for="fechanacimiento">Fecha de Realización:</label>
            <input type="date" id="fechanacimiento" v-model="formData.fechanacimiento" class="form-control" />
          </div>
      
        </div>

   

      </div>

      <!-- Fila 2 -->
      <div class="row">
        
        <div class="col-md-4">
          <div class="form-group">
            <label for="telfdomicilio">Teléfono Domicilio:</label>
            <input type="text" id="telfdomicilio" v-model="formData.telfdomicilio" class="form-control" />
          </div>
        </div>

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

      </div>

      <!-- Fila 3 -->
      <div class="row">
      


        <div class="col-md-4">
          <div class="form-group">
            <label for="nombrePadres">Nombre de los Padres:</label>
            <textarea id="nombrePadres" v-model="formData.nombrePadres" class="form-control" rows="2"></textarea>
          </div>
        </div>

     
      </div>

      <!-- Fila 4 -->
      <div class="row">

        <div class="col-md-4">
          <div class="form-group">
            <label for="zona">Zona:</label>
            <input type="text" id="zona" v-model="formData.zona" class="form-control" />
          </div>
        </div>


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

        <div class="col-md-4">
          <div class="form-group">
            <label for="establecimiento">Establecimiento:</label>
            <input type="text" id="establecimiento" v-model="formData.establecimiento" class="form-control" />
          </div>
        </div>


      </div>

      <!-- Fila 5 -->
      <div class="row">
      
        <div class="col-md-4">
          <div class="form-group">
            <label for="sexo">Sexo:</label>
            <select id="sexo" v-model="formData.sexo" class="form-control">
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-success">Editar</button>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  props: {
    ninoId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: '',
      formData: {
        hcu: '',
        cedula: '',
        nombres: '',
        apellidos: '',
        discapacidad:'',
        detalleDiscapacidad:'',
        fechanacimiento:'',
        telfdomicilio: '',
        celular: '',
        direccion: '',
        nombrePadres:'',
        zona: '',
        provincia: '',
        canton: '',
        parroquia: '',
        establecimiento: '',
        sexo: '',
        createdBy: '',
      },
    };
  },
  mounted() {
    // Cargar la información del niño al montar el componente
    this.loadNinoData();
  },
  methods: {
    loadNinoData() {
      axios.get(`${BASE_URL}/api/nino/${this.ninoId}`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then((response) => {
        this.formData = response.data;
      })
      .catch((error) => {
        console.error('Error al cargar la información del niño:', error);
      });
    },
    submitForm() {
      this.formData.createdBy = this.currentUser.id;
       
    if (this.formData.discapacidad === 'No') {
      this.formData.detalleDiscapacidad = '';
    }

      // Convierte la fecha de nacimiento a cadena antes de enviar el formulario
  if (this.formData.fechanacimiento instanceof Date) {
    this.formData.fechanacimiento = this.formData.fechanacimiento.toISOString();
  } 

      axios.put(`${BASE_URL}/api/nino/${this.ninoId}`, this.formData, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: '¡Información Actualizada!',
          text: 'La información del niño ha sido actualizada correctamente.',
          icon: 'success',
          button: 'OK',
        });
      })
      .catch((error) => {
        swal({
          title: 'Error',
          text: 'Hubo un error al actualizar la información.',
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
