<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Formulario de Tamizaje</h2>
  
      <form @submit.prevent="guardarInformacionTamizaje">
        <div class="row">
          <!-- Clasificación del tamizaje -->
          <div class="col-md-4 mb-3">
            <label for="clasificacion">Clasificación:</label>
            <select id="clasificacion" v-model="formulario.clasificacion" class="form-control" required>
              <option value="Metabólico">Metabólico</option>
              <option value="Auditivo">Auditivo</option>
              <option value="Test Denver II">Test Denver II</option>
              <option value="Visual">Visual</option>
            </select>
          </div>
  
          <!-- Fecha y resultado del tamizaje -->
          <div class="col-md-4 mb-3">
            <label for="fechaaplicacion">Fecha de Aplicación:</label>
            <input type="date" id="fechaaplicacion" v-model="currentTamizaje.fechaaplicacion" class="form-control" required>
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="edadapli">Edad de Aplicación (meses):</label>
            <input type="number" id="edadapli" v-model="currentTamizaje.edadapli" class="form-control" required min="1">
          </div>
  
          <!-- Resultado y observación -->
          <div class="col-md-4 mb-3">
            <label for="resultadonormal">Resultado Normal:</label>
            <select id="resultadonormal" v-model="currentTamizaje.resultadonormal" class="form-control" required>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
  
          <div class="col-md-8 mb-3">
            <label for="observacion">Observación:</label>
            <input type="text" id="observacion" v-model="currentTamizaje.observacion" class="form-control" required>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
  
      <!-- Tabla de Registros de Tamizaje -->
      <div class="table-responsive">
        <h2 class="text-center">Registros de Tamizaje del Niño</h2>
        <table class="table">
          <!-- Encabezados de la tabla -->
          <thead>
            <tr>
              <th>Clasificación</th>
              <th>Fecha de Aplicación</th>
              <th>Edad de Aplicación (meses)</th>
              <th>Resultado Normal</th>
              <th>Observación</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <!-- Datos de la tabla -->
          <tbody>
            <tr v-for="(registro, index) in registrosTamizaje" :key="index">
              <td>{{ registro.clasificacion || 'N/A' }}</td>
              <td>{{ registro.esquema[0].fechaaplicacion.slice(0, 10) || 'N/A' }}</td>
              <td>{{ registro.esquema[0].edadapli || 'N/A' }}</td>
              <td>{{ registro.esquema[0].resultadonormal ? 'Sí' : 'No' }}</td>
              <td>{{ registro.esquema[0].observacion || 'N/A' }}</td>
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
        registrosTamizaje: [],
        formulario: {
          clasificacion: '',
          esquema: [],
          ninoId: this.ninoId,
        },
        currentTamizaje: {
          fechaaplicacion: null,
          edadapli: null,
          resultadonormal: true,
          observacion: '',
        },
      };
    },
    methods: {
      async guardarInformacionTamizaje() {
        try {
          this.formulario.esquema = [this.currentTamizaje];
          const response = await axios.post(
            `${BASE_URL}/api/tamizaje`,
            { ...this.formulario },
            {
              headers: {
                'x-access-token': this.$store.state.auth.user.accessToken,
              },
            }
          );
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosTamizaje();
          this.limpiarCampos(); 
        } catch (error) {
          console.error('Error al guardar información de tamizaje:', error);
          swal('Error', 'Hubo un error al guardar la información de tamizaje.', 'error');
        }
      },
      //limpiar campos
      limpiarCampos() {
        this.currentTamizaje= {
          fechaaplicacion: null,
          edadapli: null,
          resultadonormal: true,
          observacion: '',
        };
        this.formulario= {
          clasificacion: '',
          esquema: [],
          ninoId: this.ninoId,
        };
      },
      cargarRegistrosTamizaje() {
        axios
          .get(`${BASE_URL}/api/tamizaje?ninoId=${this.ninoId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          })
          .then((response) => {
            this.registrosTamizaje = response.data;
          })
          .catch((error) => {
            console.error('Error al cargar registros de tamizaje:', error);
          });
      },
      confirmarEliminar(index) {
        const registro = this.registrosTamizaje[index];
        swal({
          title: '¿Estás seguro?',
          text: 'Una vez eliminado, no podrás recuperar este registro.',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
          dangerMode: true,
        }).then((confirmacion) => {
          if (confirmacion) {
            this.eliminarRegistro(registro._id);
          }
        });
      },
      async eliminarRegistro(registroId) {
        try {
          const response = await axios.delete(`${BASE_URL}/api/tamizaje/${registroId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          });
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosTamizaje();
        } catch (error) {
          console.error('Error al eliminar el registro de tamizaje:', error);
          swal('Error', 'Hubo un error al eliminar el registro de tamizaje.', 'error');
        }
      },
    },
    mounted() {
      this.cargarRegistrosTamizaje();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente si es necesario */
  </style>
  