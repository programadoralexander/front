<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Gráfico Perímetro Cefálico por Edad</h2>
  
      <div class="text-center">
        <canvas id="myChartPerimetro" style="max-width: 650px; width: 600px; height: 400px;"></canvas>
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
            this.actualizarGrafico();
          })
          .catch((error) => {
            console.error('Error al cargar registros de control:', error);
          });
      },
      actualizarGrafico() {
        // Crear dataset para la curva de Perímetro Cefálico
        const datasetPerimetro = {
          label: 'Perímetro Cefálico',
          data: this.registrosControl.map((registro) => ({
            x: registro.edad,
            y: registro.perimetro,
          })),
          borderColor: 'blue', // Puedes cambiar el color según tus preferencias
          borderWidth: 2,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 7,
        };
  
        // Configuración del gráfico
        const ctx = document.getElementById('myChartPerimetro').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [datasetPerimetro],
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
                    labelString: 'Perímetro Cefálico (cm)',
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
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  