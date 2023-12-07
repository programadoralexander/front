<template>
  <div>
    <h2 class="text-center">Formulario de ETMI</h2>

        <h4 class="text-center">Estrategia nacional para la eliminación de la transmisión materno - infantil</h4>

    <form @submit.prevent="submitForm" class="needs-validation" >

      <div class="row">
                      <div class="col-md-4">
                <div class="form-group">
                  <label for="nombre">Nombre del trimestre:</label>
                  <select id="nombre" v-model="formData.nombre" class="form-control">
                    <option value="">Seleccionar...</option>
                    <option value="Primer trimestre">Primer trimestre</option>
                    <option value="Segundo trimestre">Segundo trimestre</option>
                    <option value="Tercer trimestre">Tercer trimestre</option>
                    <option value="Parto">Parto</option>
                    <option value="Posparto">Posparto</option>
                  </select>
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
              </div>

                <div class="col-md-4">
                <div class="form-group">
                        <label for="vacuna">Nombre Vacuna:</label>
                                    <select id="vacuna" v-model="currentTamizaje.vacuna" class="form-control">
                                      <option value="">Seleccionar...</option>
                                      <option value="VIH">VIH</option>
                                      <option value="SIFILIS">SIFILIS</option>
                                      <option value="HEPATITIS B">HEPATITIS B</option>
                                      <option value="ENFERMEDAD DE CHAGAS">ENFERMEDAD DE CHAGAS</option>
                                    </select>
                      </div>
                </div>

               </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="fechaRealizacion">Fecha de Realización:</label>
            <input type="date" id="fechaRealizacion" v-model="currentTamizaje.fechaRealizacion" class="form-control" />
          </div>
        </div>
        <div class="col-md-4">
  <div class="form-group">
    <label for="resultado">Resultado (reactivo/no reactivo):</label>
    <select id="resultado" v-model="currentTamizaje.resultado" class="form-control">
      <option value="">Seleccionar...</option>
      <option value="reactivo">Reactivo</option>
      <option value="no reactivo">No Reactivo</option>
    </select>
  </div>
</div>

<div class="col-md-4">
  <div class="form-group">
    <label for="semanaGestacion">Semana de Gestación:</label>
    <input type="number" id="semanaGestacion" v-model="currentTamizaje.semanaGestacion" class="form-control" min="1" max="42"/>
  </div>
</div>

      </div>


  
      <div class="row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </form>
     <div class="table-responsive">
      <h2 class="text-center">Registros de ETMI para la Mujer</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre del Trimestre</th>
            <th>Nombre de la Vacuna</th>
            <th>Fecha de Realización</th>
            <th>Resultado</th>
            <th>Semana de Gestación</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="(registro, index) in registrosETMI" :key="index">
      <td>{{ registro.nombre  || 'N/A' }}</td>
      <td>{{ registro.tamizajes[0].vacuna || 'N/A' }}</td>
      <td>{{ registro.tamizajes[0].fechaRealizacion ? registro.tamizajes[0].fechaRealizacion.slice(0, 10) : 'N/A' }}</td>
      <td>{{ registro.tamizajes[0].resultado || 'N/A' }}</td>
      <td>{{ registro.tamizajes[0].semanaGestacion || 'N/A' }}</td>
      <td>
    <button @click="confirmarEliminarETMI(index)" class="btn btn-danger small">
      <font-awesome-icon icon="trash" class="small" />
    </button>
  </td>
    </tr>
  </tbody>
      </table>
    </div>

    <!-- inicio tabla -->

 
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
    mujerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      registrosETMI: [],
      message: '',
      formData: {
        nombre: '',
        tamizajes: [] ,
        mujerId: this.mujerId, 
      },
      currentTamizaje: {
      vacuna: '',
      fechaRealizacion: null,
      resultado: '',
      semanaGestacion: null,
    },
    };
  },
  methods: {
    submitForm() {
      this.formData.tamizajes = [this.currentTamizaje];
      axios.post(`${BASE_URL}/api/etmi`, this.formData, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: '¡Información Guardada!',
          text: 'La información de ETMI ha sido guardada correctamente.',
          icon: 'success',
          button: 'OK',
        });

        this.cargarRegistrosETMI();
        this.limpiarCampos();
    
      })
      .catch(error => {
        
        swal({
          title: 'Error',
          text: 'Hubo un error al guardar la información de ETMI.',
          icon: 'error',
          button: 'OK',
        });
      });
    },
    limpiarCampos() {
      this.currentTamizaje= {
      vacuna: '',
      fechaRealizacion: null,
      resultado: '',
      semanaGestacion: null,
    };
    this.formData = {
        nombre: '',
        tamizajes: [] ,
        mujerId: this.mujerId, 
      };
    },  
    cargarRegistrosETMI() {
      axios
      .get(`${BASE_URL}/api/etmi?mujerId=${this.mujerId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then(response => {
          this.registrosETMI = response.data;
        })
        .catch(error => {
          console.error('Error al cargar registros ETMI:', error);
        });
    },
    confirmarEliminarETMI(index) {
    const registro = this.registrosETMI[index];
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((confirmacion) => {
      if (confirmacion) {
        // Si el usuario confirma, llamar al método de eliminación
        this.eliminarRegistroETMI(registro._id);
      }
    });
  },
  async eliminarRegistroETMI(registroId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/etmi/${registroId}`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      });

      swal('Éxito', response.data.message, 'success');
      this.cargarRegistrosETMI();
    } catch (error) {
      console.error('Error al eliminar el registro ETMI:', error);
      swal('Error', 'Hubo un error al eliminar el registro ETMI.', 'error');
    }
  },

  },
  
  mounted() {
    this.cargarRegistrosETMI();
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
