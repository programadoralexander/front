<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Formulario y Registros de Anemia</h2>
  
      <form @submit.prevent="guardarInformacionAnemia">
        <div class="row">
          <!-- Fecha de Aplicación -->
          <div class="col-md-4 mb-3">
            <label for="fechaaplicacion">Fecha de Aplicación:</label>
            <input type="date" id="fechaaplicacion" v-model="formulario.fechaaplicacion" class="form-control" required>
          </div>
  
          <!-- Edad de Aplicación -->
          <div class="col-md-4 mb-3">
            <label for="edadapli">Edad de Aplicación (meses):</label>
            <input type="number" id="edadapli" v-model="formulario.edadapli" class="form-control" required min="1">
          </div>
  
          <!-- Valor de Hemoglobina -->
          <div class="col-md-4 mb-3">
            <label for="valorhemoglobina">Valor de Hemoglobina:</label>
            <input type="number" id="valorhemoglobina" v-model="formulario.valorhemoglobina" class="form-control" required step=".01" min="0">
          </div>
        </div>
  
        <div class="row">
          <!-- Valor Corregido -->
          <div class="col-md-4 mb-3">
            <label for="valorcorregido">Valor Corregido:</label>
            <input type="number" id="valorcorregido" v-model="formulario.valorcorregido" class="form-control" required step=".01" min="0">
          </div>
  
          <!-- Resultado Normal -->
          <div class="col-md-4 mb-3">
            <label for="resultadonormal">Resultado Normal:</label>
            <select id="resultadonormal" v-model="formulario.resultadonormal" class="form-control" required>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
  
          <!-- Tratamiento -->
          <div class="col-md-4 mb-3">
            <label for="tratamiento">Tratamiento:</label>
            <select id="tratamiento" v-model="formulario.tratamiento" class="form-control" required>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
  
        <!-- Observación -->
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="observacion">Observación:</label>
            <input type="text" id="observacion" v-model="formulario.observacion" class="form-control" required>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
  
      <!-- Tabla de Registros de Anemia -->
      <div class="table-responsive mt-5">
        <h2 class="text-center">Registros de Anemia del Niño</h2>
        <table class="table">
          <!-- Encabezados de la tabla -->
          <thead>
            <tr>
              <th>Fecha de Aplicación</th>
              <th>Edad de Aplicación (meses)</th>
              <th>Valor de Hemoglobina</th>
              <th>Valor Corregido</th>
              <th>Resultado Normal</th>
              <th>Tratamiento</th>
              <th>Observación</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <!-- Datos de la tabla -->
          <tbody>
            <tr v-for="(registro, index) in registrosAnemia" :key="index">
              <td>{{ registro.fechaaplicacion.slice(0,10) || 'N/A' }}</td>
              <td>{{ registro.edadapli || 'N/A' }}</td>
              <td>{{ registro.valorhemoglobina || 'N/A' }}</td>
              <td>{{ registro.valorcorregido || 'N/A' }}</td>
              <td>{{ registro.resultadonormal ? 'Sí' : 'No' }}</td>
              <td>{{ registro.tratamiento ? 'Sí' : 'No' }}</td>
              <td>{{ registro.observacion || 'N/A' }}</td>
              <td>
                <button @click="confirmarEliminar(index)" class="btn btn-danger small">
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
      ninoId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        formulario: {
          fechaaplicacion: null,
          edadapli: null,
          valorhemoglobina: null,
          valorcorregido: null,
          resultadonormal: true,
          tratamiento: true,
          observacion: '',
          ninoId: this.ninoId,
        },
        registrosAnemia: [],
      };
    },
    methods: {
      async guardarInformacionAnemia() {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/anemia`,
            { ...this.formulario },
            {
              headers: {
                'x-access-token': this.$store.state.auth.user.accessToken,
              },
            }
          );
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosAnemia();
        } catch (error) {
          console.error('Error al guardar información de anemia:', error);
          swal('Error', 'Hubo un error al guardar la información de anemia.', 'error');
        }
      },
      limpiarCampos() {
        this.formulario= {
          fechaaplicacion: null,
          edadapli: null,
          valorhemoglobina: null,
          valorcorregido: null,
          resultadonormal: true,
          tratamiento: true,
          observacion: '',
          ninoId: this.ninoId,
        };
      },
      async cargarRegistrosAnemia() {
        try {
          const response = await axios.get(`${BASE_URL}/api/anemia?ninoId=${this.ninoId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          });
          this.registrosAnemia = response.data;
        } catch (error) {
          console.error('Error al cargar registros de anemia:', error);
        }
      },
  
      async eliminarRegistroAnemia(registroId) {
        try {
          const response = await axios.delete(`${BASE_URL}/api/anemia/${registroId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          });
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosAnemia();
        } catch (error) {
          console.error('Error al eliminar el registro de anemia:', error);
          swal('Error', 'Hubo un error al eliminar el registro de anemia.', 'error');
        }
      },
  
      confirmarEliminar(index) {
        const registro = this.registrosAnemia[index];
        swal({
          title: '¿Estás seguro?',
          text: 'Una vez eliminado, no podrás recuperar este registro.',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
          dangerMode: true,
        }).then((confirmacion) => {
          if (confirmacion) {
            this.eliminarRegistroAnemia(registro._id);
          }
        });
      },
    },
  
    mounted() {
      this.cargarRegistrosAnemia();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente si es necesario */
  </style>
  