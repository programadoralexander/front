<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Gráfico Peso para la edad</h2>

  <div class="text-center">
    <canvas id="myChart" style="max-width: 650px; width: 600px; height: 400px;"></canvas>
  </div>

</div>
</template>

<script>
import axios from 'axios';
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
  };
},
methods: {
  cargarRegistrosControl() {
    axios
      .get(`${BASE_URL}/api/control?ninoId=${this.ninoId}`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then((response) => {
        this.registrosControl = response.data;
        this.actualizarGrafico(); // Llamar a la función de actualización del gráfico
      })
      .catch((error) => {
        console.error('Error al cargar registros de control:', error);
      });
  },
  actualizarGrafico() {
    // Extraer edades y pesos de los registros
    const edades = this.registrosControl.map(
      (registro) => registro.edad
    );
    const pesos = this.registrosControl.map(
      (registro) => registro.peso
    );

    // Crear dataset para la curva de peso
    const datasetPeso = {
      label: 'Peso',
      data: this.registrosControl.map((registro) => ({
        x: registro.edad,
        y: registro.peso,
      })),
      borderColor: 'blue',
      borderWidth: 2,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    };

    // Configuración del gráfico
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [datasetPeso],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Edad (meses)',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Peso (kg)',
              },
            },
          ],
        },
        legend: {
          display: true,
        },
      },
    });
  },
},
mounted() {
  this.cargarRegistrosControl();
  this.actualizarGrafico();
},
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>