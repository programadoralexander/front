<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Formulario de Control</h2>
  
      <form @submit.prevent="guardarInformacionControl">
        <div class="row">
          <!-- Fecha -->
          <div class="col-md-4 mb-3">
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" v-model="formulario.fecha" class="form-control" required>
          </div>
  
          <!-- Edad -->
          <div class="col-md-4 mb-3">
            <label for="edad">Edad(meses):</label>
            <input type="number" id="edad" v-model="formulario.edad" class="form-control" required min="1" >
          </div>
  
          <!-- Peso -->
          <div class="col-md-4 mb-3">
            <label for="peso">Peso:</label>
            <input type="number" id="peso" v-model="formulario.peso" class="form-control" required step=".01" min="0">
          </div>
        </div>
  
        <div class="row">
          <!-- Longitud -->
          <div class="col-md-4 mb-3">
            <label for="longitud">Longitud:</label>
            <input type="number" id="longitud" v-model="formulario.longitud" class="form-control" required step=".01" min="0">
          </div>
  
          <!-- Perímetro -->
          <div class="col-md-4 mb-3">
            <label for="perimetro">Perímetro:</label>
            <input type="number" id="perimetro" v-model="formulario.perimetro" class="form-control" required step=".01" min="0">
          </div>
        </div>
  
        <!-- Otros campos -->
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="lactmaterna" v-model="formulario.lactmaterna" class="form-check-input">
              <label for="lactmaterna" class="form-check-label">Lactancia Materna</label>
            </div>
          </div>
  
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="otrasleches" v-model="formulario.otrasleches" class="form-check-input">
              <label for="otrasleches" class="form-check-label">Otras Leches</label>
            </div>
          </div>
  
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="otrosalimento" v-model="formulario.otrosalimento" class="form-check-input">
              <label for="otrosalimento" class="form-check-label">Otros Alimentos</label>
            </div>
          </div>
  
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="micronutrientes" v-model="formulario.micronutrientes" class="form-check-input">
              <label for="micronutrientes" class="form-check-label">Micronutrientes</label>
            </div>
          </div>
  
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="vitaminaA" v-model="formulario.vitaminaA" class="form-check-input">
              <label for="vitaminaA" class="form-check-label">Vitamina A</label>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
        <!-- Tabla de Registros de Control -->
        <div class="table-responsive">
  <h2 class="text-center">Registros de Control del RN</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Edad
          (meses)</th>
        <th>Peso
          (kg.)</th>
        <th>Longitud
          (cm.)</th>
        <th>Perímetro 
          cefálico(cm.)</th>
        <th>Lactancia
           Materna</th>
        <th>Otras
           Leches</th>
        <th>Otros 
          Alimentos</th>
        <th>Micro
          nutrientes</th>
        <th>Vitamina 
          A</th>
        <th>Eliminar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registrosControl" :key="index">
        <td>{{ registro.fecha.slice(0,10) }}</td>
        <td>{{ registro.edad }}</td>
        <td>{{ registro.peso }}</td>
        <td>{{ registro.longitud }}</td>
        <td>{{ registro.perimetro }}</td>
        <td>{{ registro.lactmaterna ? 'Sí' : 'No' }}</td>
        <td>{{ registro.otrasleches ? 'Sí' : 'No' }}</td>
        <td>{{ registro.otrosalimento ? 'Sí' : 'No' }}</td>
        <td>{{ registro.micronutrientes ? 'Sí' : 'No' }}</td>
        <td>{{ registro.vitaminaA ? 'Sí' : 'No' }}</td>
        <!-- Dentro de la tabla -->
     
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
import Chart from 'chart.js';
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
      registrosControl: [],
      formulario: {
        fecha: null,
        edad: null,
        peso: null,
        longitud: null,
        perimetro: null,
        lactmaterna: false,
        otrasleches: false,
        otrosalimento: false,
        micronutrientes: false,
        vitaminaA: false,
        ninoId: this.ninoId,
      },
    };
  },
  methods: {
    async guardarInformacionControl() {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/control`,
          { ...this.formulario },
          {
            headers: {
              'x-access-token': this.$store.state.auth.user.accessToken,
            },
          }
        );

        swal('Éxito', response.data.message, 'success');
        this.cargarRegistrosControl();
        this.limpiarCampos(); 
      } catch (error) {
        console.error('Error al guardar información de control:', error);
        swal(
          'Error',
          'Hubo un error al guardar la información de control.',
          'error'
        );
      }
    },
    limpiarCampos() {
      this.formulario= {
        fecha: null,
        edad: null,
        peso: null,
        longitud: null,
        perimetro: null,
        lactmaterna: false,
        otrasleches: false,
        otrosalimento: false,
        micronutrientes: false,
        vitaminaA: false,
        ninoId: this.ninoId,
      };
    },  
    cargarRegistrosControl() {
      axios
        .get(`${BASE_URL}/api/control?ninoId=${this.ninoId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        })
        .then((response) => {
          this.registrosControl = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar registros de control:', error);
        });
    },
    // SECCION DE ELIMINAR AL CONTROL RN
    confirmarEliminar(index) {
      const registro = this.registrosControl[index];
      swal({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este registro.',
        icon: 'warning',
        buttons: ['Cancelar', 'Eliminar'],
        dangerMode: true,
      }).then((confirmacion) => {
        if (confirmacion) {
          // Si el usuario confirma, llamar al método de eliminación
          this.eliminarRegistro(registro._id);
        }
      });
    },

    async eliminarRegistro(registroId) {
      try {
        const response = await axios.delete(`${BASE_URL}/api/control/${registroId}`, {
          headers: {
            'x-access-token': this.$store.state.auth.user.accessToken,
          },
        });

        swal('Éxito', response.data.message, 'success');
        this.cargarRegistrosControl();
      } catch (error) {
        console.error('Error al eliminar el registro:', error);
        swal('Error', 'Hubo un error al eliminar el registro.', 'error');
      }
    },
  },
  mounted() {
    this.cargarRegistrosControl();
  },
};
</script>

<style scoped>

</style>