<template>
  <div>
    <h2 class="text-center">Formulario de Control Mujer</h2>

    <form @submit.prevent="submitForm" class="needs-validation">
      <!-- Campos del formulario de controlmujer -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="fechaatencion">Fecha de Atención:</label>
            <input type="date" id="fechaatencion" v-model="formulario.fechaatencion" class="form-control" required/>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="fechaproxima">Fecha Próxima:</label>
            <input type="date" id="fechaproxima" v-model="formulario.fechaproxima" class="form-control" required />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="nombrevacunador">Nombre del Vacunador:</label>
            <input type="text" id="nombrevacunador" v-model="formulario.nombrevacunador" class="form-control" required />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="observacion">Observación:</label>
            <textarea id="observacion" v-model="formulario.observacion" class="form-control" required></textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </form>

    <!-- Tabla de registros de Control Mujer -->
    <div class="table-responsive">
      <h2 class="text-center">Registros de Control Mujer</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Fecha de Atención</th>
            <th>Fecha Próxima</th>
            <th>Nombre del Vacunador</th>
            <th>Observación</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, index) in registrosControlMujer" :key="index">
            <td>{{ registro.fechaatencion ? registro.fechaatencion.slice(0, 10) : 'N/A' }}</td>
            <td>{{ registro.fechaproxima ? registro.fechaproxima.slice(0, 10) : 'N/A' }}</td>
            <td>{{ registro.nombrevacunador || 'N/A' }}</td>
            <td>{{ registro.observacion || 'N/A' }}</td>
            <td>
              <button @click="confirmarEliminarControlMujer(index)" class="btn btn-danger small">
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
      registrosControlMujer: [],
      formulario: {
        fechaatencion: null,
        fechaproxima: null,
        nombrevacunador: '',
        observacion: '',
        mujerId: this.mujerId,
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post(`${BASE_URL}/api/controlmujer`, this.formulario, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then(() => {
          swal({
            title: '¡Información Guardada!',
            text: 'La información de Control Mujer ha sido guardada correctamente.',
            icon: 'success',
            button: 'OK',
          });

          this.cargarRegistrosControlMujer();
          this.limpiarCampos();
        })
        .catch((error) => {
          swal({
            title: 'Error',
            text: 'Hubo un error al guardar la información de Control Mujer.',
            icon: 'error',
            button: 'OK',
          });
        });
    },
    limpiarCampos() {
      this.formulario = {
        fechaatencion: null,
        fechaproxima: null,
        nombrevacunador: '',
        observacion: '',
        mujerId: this.mujerId,
      };
    },
    cargarRegistrosControlMujer() {
      axios
        .get(`${BASE_URL}/api/controlmujer?mujerId=${this.mujerId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then((response) => {
          this.registrosControlMujer = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar registros de Control Mujer:', error);
        });
    },
    confirmarEliminarControlMujer(index) {
      const registro = this.registrosControlMujer[index];
      swal({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este registro.',
        icon: 'warning',
        buttons: ['Cancelar', 'Eliminar'],
        dangerMode: true,
      }).then((confirmacion) => {
        if (confirmacion) {
          // Si el usuario confirma, llamar al método de eliminación
          this.eliminarRegistroControlMujer(registro._id);
        }
      });
    },
    async eliminarRegistroControlMujer(registroId) {
      try {
        const response = await axios.delete(`${BASE_URL}/api/controlmujer/${registroId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        });

        swal('Éxito', response.data.message, 'success');
        this.cargarRegistrosControlMujer();
      } catch (error) {
        console.error('Error al eliminar el registro de Control Mujer:', error);
        swal('Error', 'Hubo un error al eliminar el registro de Control Mujer.', 'error');
      }
    },
  },

  mounted() {
    this.cargarRegistrosControlMujer();
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
