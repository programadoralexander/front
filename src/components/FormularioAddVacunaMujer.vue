<template>
    <div>
      <h2 class="text-center">Formulario de Vacuna Mujer</h2>
  
      <form @submit.prevent="submitForm" class="needs-validation">
        <!-- Campos del formulario de vacunamujer -->
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="tipo">Tipo de Vacuna:</label>
              <input type="text" id="tipo" v-model="formulario.tipo" class="form-control" required />
            </div>
          </div>
                        <div class="col-md-4">
                <div class="form-group">
                    <label for="dosis">Número de Dosis:</label>
                    <select id="dosis" v-model="formulario.dosis" class="form-control">
                    <option value="" disabled>Seleccionar...</option>
                    <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                    </select>
                </div>
                </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="fechaaplicacion">Fecha de Aplicación:</label>
              <input type="date" id="fechaaplicacion" v-model="formulario.fechaaplicacion" class="form-control" required />
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="edadapli">Edad de Aplicación:</label>
              <input type="number" id="edadapli" v-model="formulario.edadapli" class="form-control" required min="1"/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="lote">Número de Lote:</label>
              <input type="text" id="lote" v-model="formulario.lote" class="form-control" required />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="vacunador">Nombre del Vacunador:</label>
              <input type="text" id="vacunador" v-model="formulario.vacunador" class="form-control" required/>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="nombrevacuna">Nombre de la Vacuna:</label>
              <input type="text" id="nombrevacuna" v-model="formulario.nombrevacuna" class="form-control" required/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="establecimiento">Establecimiento:</label>
              <input type="text" id="establecimiento" v-model="formulario.establecimiento" class="form-control" required/>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
  
      <!-- Tabla de registros de Vacuna Mujer -->
      <div class="table-responsive">
        <h2 class="text-center">Registros de Vacuna Mujer</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Tipo de Vacuna</th>
              <th>Número de Dosis</th>
              <th>Fecha de Aplicación</th>
              <th>Edad de Aplicación</th>
              <th>Número de Lote</th>
              <th>Nombre del Vacunador</th>
              <th>Nombre de la Vacuna</th>
              <th>Establecimiento</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(registro, index) in registrosVacunaMujer" :key="index">
              <td>{{ registro.tipo || 'N/A' }}</td>
              <td>{{ registro.dosis || 'N/A' }}</td>
              <td>{{ registro.fechaaplicacion ? registro.fechaaplicacion.slice(0, 10) : 'N/A' }}</td>
              <td>{{ registro.edadapli || 'N/A' }}</td>
              <td>{{ registro.lote || 'N/A' }}</td>
              <td>{{ registro.vacunador || 'N/A' }}</td>
              <td>{{ registro.nombrevacuna || 'N/A' }}</td>
              <td>{{ registro.establecimiento || 'N/A' }}</td>
              <td>
                <button @click="confirmarEliminarVacunaMujer(index)" class="btn btn-danger small">
                  <font-awesome-icon icon="trash" class="small" />
                </button>
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
    props: {
      mujerId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        registrosVacunaMujer: [],
        formulario: {
          tipo: '',
          dosis: null,
          fechaaplicacion: null,
          edadapli: null,
          lote: '',
          vacunador: '',
          nombrevacuna: '',
          establecimiento: '',
          mujerId: this.mujerId,
        },
      };
    },
    methods: {
      submitForm() {
        axios
          .post(`${BASE_URL}/api/vacunamujer`, this.formulario, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          })
          .then(() => {
            swal({
              title: '¡Información Guardada!',
              text: 'La información de Vacuna Mujer ha sido guardada correctamente.',
              icon: 'success',
              button: 'OK',
            });
  
            this.cargarRegistrosVacunaMujer();
            this.limpiarCampos();
          })
          .catch((error) => {
            swal({
              title: 'Error',
              text: 'Hubo un error al guardar la información de Vacuna Mujer.',
              icon: 'error',
              button: 'OK',
            });
          });
      },
      limpiarCampos() {
        this.formulario = {
          tipo: '',
          dosis: null,
          fechaaplicacion: null,
          edadapli: null,
          lote: '',
          vacunador: '',
          nombrevacuna: '',
          establecimiento: '',
          mujerId: this.mujerId,
        };
      },
      cargarRegistrosVacunaMujer() {
        axios
          .get(`${BASE_URL}/api/vacunamujer?mujerId=${this.mujerId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          })
          .then((response) => {
            this.registrosVacunaMujer = response.data;
          })
          .catch((error) => {
            console.error('Error al cargar registros de Vacuna Mujer:', error);
          });
      },
      confirmarEliminarVacunaMujer(index) {
        const registro = this.registrosVacunaMujer[index];
        swal({
          title: '¿Estás seguro?',
          text: 'Una vez eliminado, no podrás recuperar este registro.',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
          dangerMode: true,
        }).then((confirmacion) => {
          if (confirmacion) {
            // Si el usuario confirma, llamar al método de eliminación
            this.eliminarRegistroVacunaMujer(registro._id);
          }
        });
      },
      async eliminarRegistroVacunaMujer(registroId) {
        try {
          const response = await axios.delete(`${BASE_URL}/api/vacunamujer/${registroId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          });
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosVacunaMujer();
        } catch (error) {
          console.error('Error al eliminar el registro de Vacuna Mujer:', error);
          swal('Error', 'Hubo un error al eliminar el registro de Vacuna Mujer.', 'error');
        }
      },
    },
  
    mounted() {
      this.cargarRegistrosVacunaMujer();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  