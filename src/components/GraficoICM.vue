<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Gráfico IMC por Edad</h2>

    <div class="text-center">
      <canvas id="myChartICM" style="max-width: 650px; width: 600px; height: 400px;"></canvas>
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
      // Calcular el IMC para cada registro
      const imcDatos = this.registrosControl.map((registro) => {
        const imc = registro.peso / Math.pow(registro.longitud / 100, 2);
        return {
          edad: registro.edad,
          imc,
          categoria: this.obtenerCategoriaIMC(imc),
        };
      });

      // Crear dataset para la curva de IMC
      const datasetIMC = {
        label: 'IMC',
        data: imcDatos.map((dato) => ({
          x: dato.edad,
          y: dato.imc,
        })),
        borderColor: 'purple', // Puedes cambiar el color según tus preferencias
        borderWidth: 2,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      };

      // Configuración del gráfico
      const ctx = document.getElementById('myChartICM').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [datasetIMC],
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
                  labelString: 'IMC',
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
    obtenerCategoriaIMC(imc) {
      if (imc < 5) {
        return 'Bajo peso';
      } else if (imc >= 5 && imc < 85) {
        return 'Peso saludable';
      } else if (imc >= 85 && imc < 95) {
        return 'Sobrepeso';
      } else {
        return 'Obesidad';
      }
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
