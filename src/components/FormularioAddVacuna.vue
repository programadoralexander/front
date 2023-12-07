<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Formulario de Vacuna</h2>
  
      <form @submit.prevent="guardarInformacionVacuna">
        <div class="row">
          <!-- Clasificación de la vacuna -->
          <div class="col-md-4 mb-3">
          <label for="clasificacion">Clasificación:</label>
          <select id="clasificacion" v-model="formulario.clasificacion" class="form-control" required>
            <option value="Menor a un año">Menor a un año</option>
            <option value="12 a 24 meses">12 a 24 meses</option>
            <option value="Hasta 5 años">Hasta 5 años</option>
            <option value="Influenza estacional">Influenza estacional</option>
          </select>
        </div>
          <!-- Tipo de vacuna -->
                  <div class="col-md-4 mb-3">
                        <label for="tipovacuna">Tipo de Vacuna:</label>
                            <select id="tipovacuna" v-model="currentVacuna.tipovacuna" class="form-control" required>
                                <option value="BCG (Meningitis)">*BCG (Meningitis)</option>
                                <option value="HB cero (Hepatitis B)">HB cero (Hepatitis B)</option>
                                <option value="Rotavirus (Diarrea)">**Rotavirus (Diarrea)</option>
                                <option value="Pentavalente">***Pentavalente</option>
                                <option value="fIPV (Poliomielitis)">****fIPV (Poliomielitis)</option>
                                <option value="bOPV (Poliomielitis)">bOPV (Poliomielitis)</option>
                                <option value="Neumococo conjugada">Neumococo conjugada</option>
                                <option value="SRP">SRP</option>
                                <option value="Fiebre amarilla">Fiebre amarilla</option>
                                <option value="Varicela">Varicela</option>
                                <option value="DPT (Difteria, Tosferina, Tétanos)">DPT (Difteria, Tosferina, Tétanos)</option>
                            </select>
                        </div>

  
          <!-- Dosis -->
          <div class="col-md-4 mb-3">
                        <label for="dosis">Dosis:</label>
                        <select id="dosis" v-model="currentVacuna.dosis" class="form-control" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
            </div>

        </div>
  
        <div class="row">
          <!-- Fecha de aplicación -->
          <div class="col-md-4 mb-3">
            <label for="fechaaplicacion">Fecha de Aplicación:</label>
            <input type="date" id="fechaaplicacion" v-model="currentVacuna.fechaaplicacion" class="form-control" required>
          </div>
  
          <!-- Edad de aplicación -->
          <div class="col-md-4 mb-3">
            <label for="edadapli">Edad de Aplicación (meses):</label>
            <input type="number" id="edadapli" v-model="currentVacuna.edadapli" class="form-control" required min="1">
          </div>
  
          <!-- Lote -->
          <div class="col-md-4 mb-3">
            <label for="lote">Lote:</label>
            <input type="text" id="lote" v-model="currentVacuna.lote" class="form-control" required>
          </div>
        </div>
  
        <div class="row">
          <!-- Vacunador -->
          <div class="col-md-4 mb-3">
            <label for="vacunador">Nombres y apellidos del Vacunador:</label>
            <input type="text" id="vacunador" v-model="currentVacuna.vacunador" class="form-control" required>
          </div>
  
          <!-- Establecimiento -->
          <div class="col-md-4 mb-3">
            <label for="establecimiento">Establecimiento de salud:</label>
            <input type="text" id="establecimiento" v-model="currentVacuna.establecimiento" class="form-control" required>
          </div>
        </div>
  
        <!-- Otros campos del formulario -->
  
        <div class="row">
          <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>

      <br>
      <div class="alert alert-info" role="alert">
  <p class="small"><strong>*BCG dosis única:</strong> se administrará hasta los 11 meses 29 días.</p>
  <p class="small"><strong>**Rotavirus:</strong> La primera dosis es hasta los 3 meses 29 días. La segunda dosis podrá administrarse hasta los 7 meses de edad (7 meses 29 días).</p>
  <p class="small"><strong>***En caso de reacción anafiláctica o alergia a la vacuna pentavalente:</strong> colocar vacuna HB pediátrica en el mismo esquema que pentavalente.</p>
  <p class="small"><strong>****El intervalo entre fIPV (1) y fIPV (2) debe ser de 8 semanas.</strong></p>
</div>


  
      <!-- Tabla de Registros de Vacuna -->
      <div class="table-responsive">
        <h2 class="text-center">Registros de Vacuna del Niño</h2>
        <table class="table">
          <!-- Encabezados de la tabla -->
          <thead>
            <tr>
              <th>Clasificación</th>
              <th>Tipo de Vacuna</th>
              <th>Dosis</th>
              <th>Fecha de Aplicación</th>
              <th>Edad de Aplicación (meses)</th>
              <th>Lote</th>
              <th>Vacunador</th>
              <th>Establecimiento</th>
              <!-- Otros campos -->
              <!-- Agregar encabezados según necesidades -->
              <th>Eliminar</th>
            </tr>
          </thead>
          <!-- Datos de la tabla -->
          <tbody>
            <tr v-for="(registro, index) in registrosVacuna" :key="index">
              <td>{{ registro.clasificacion || 'N/A' }}</td>
              <td>{{ registro.esquema[0].tipovacuna  || 'N/A'}}</td>
              <td>{{ registro.esquema[0].dosis || 'N/A' }}</td>
              <td>{{ registro.esquema[0].fechaaplicacion.slice(0, 10) || 'N/A' }}</td>
              <td>{{ registro.esquema[0].edadapli || 'N/A' }}</td>
              <td>{{ registro.esquema[0].lote || 'N/A' }}</td>
              <td>{{ registro.esquema[0].vacunador || 'N/A' }}</td>
              <td>{{ registro.esquema[0].establecimiento || 'N/A' }}</td>
              <!-- Otros campos -->
              <!-- Agregar columnas según necesidades -->
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
        registrosVacuna: [],
        formulario: {
         clasificacion:'',
          esquema:[],
          ninoId: this.ninoId,
        },
        currentVacuna:{
          tipovacuna: '',
          dosis: null,
          fechaaplicacion: null,
          edadapli: null,
          lote: '',
          vacunador: '',
          establecimiento:''
        }
      };
    },
    methods: {
      async guardarInformacionVacuna() {
        try {
        this.formulario.esquema = [this.currentVacuna];
          const response = await axios.post(
            `${BASE_URL}/api/vacuna`,
            { ...this.formulario },
            {
              headers: {
                'x-access-token': this.$store.state.auth.user.accessToken,
              },
            }
          );
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosVacuna();
          this.limpiarCampos();
        } catch (error) {
          console.error('Error al guardar información de vacuna:', error);
          swal('Error', 'Hubo un error al guardar la información de vacuna.', 'error');
        }
      },
      limpiarCampos() {
      this.currentVacuna = {
        tipovacuna: '',
        dosis: null,
        fechaaplicacion: null,
        edadapli: null,
        lote: '',
        vacunador: '',
        establecimiento: ''
      };
      this.formulario = {
        clasificacion: '',
        esquema: [],
        ninoId: this.ninoId,
      };
    },
      cargarRegistrosVacuna() {
        axios
          .get(`${BASE_URL}/api/vacuna?ninoId=${this.ninoId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          })
          .then((response) => {
            this.registrosVacuna = response.data;
          })
          .catch((error) => {
            console.error('Error al cargar registros de vacuna:', error);
          });
      },
      confirmarEliminar(index) {
        const registro = this.registrosVacuna[index];
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
          const response = await axios.delete(`${BASE_URL}/api/vacuna/${registroId}`, {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          });
  
          swal('Éxito', response.data.message, 'success');
          this.cargarRegistrosVacuna();
        } catch (error) {
          console.error('Error al eliminar el registro de vacuna:', error);
          swal('Error', 'Hubo un error al eliminar el registro de vacuna.', 'error');
        }
      },
    },
    mounted() {
      this.cargarRegistrosVacuna();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente si es necesario */
  </style>
  