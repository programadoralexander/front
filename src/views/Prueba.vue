<template>
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    mounted() {
      var ctx = document.getElementById('myChart').getContext('2d');
  
      // Datos de ejemplo: 5 registros de una niña
      const registros = [
        { edad: 1, peso: 6.5 },
        { edad: 3, peso: 7.8 },
        { edad: 6, peso: 9.5 },
        { edad: 9, peso: 11.2 },
        { edad: 12, peso: 13.1 },
      ];
  
      // Datos de referencia de la OMS (percentiles)
      const percentiles = {
        normal: [5, 10, 25, 50, 75, 90, 95],
        alerta: [3, 15, 85, 97],
        peligro: [0.1, 0.1, 0.1, 0.1, 0.1], // Ejemplo, ajusta según necesites
      };
  
      // Crear datasets para cada tendencia
      const datasets = Object.keys(percentiles).map(tendencia => {
        return {
          label: tendencia.charAt(0).toUpperCase() + tendencia.slice(1), // Capitalizar la primera letra
          data: registros.map(registro => ({ x: registro.edad, y: registro.peso })),
          borderColor: 'rgba(0, 0, 0, 0)', // Ocultar líneas de tendencia
          pointBackgroundColor: percentiles[tendencia].map(valor => obtenerColorPorPercentil(valor)),
          pointRadius: 8,
          pointHoverRadius: 10,
          backgroundColor: obtenerFondoPorTendencia(tendencia),
        };
      });
  
      // Configuración del gráfico
      var myChart = new Chart(ctx, {
        type: 'scatter', // Utilizamos un gráfico de dispersión para marcar puntos
        data: {
          datasets: datasets,
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
  };
  
  function obtenerColorPorPercentil(valor) {
    // Ejemplo de asignación de colores según percentiles
    if (valor <= 5) return 'green'; // Normal
    if (valor <= 85) return 'orange'; // Alerta
    return 'red'; // Peligro
  }
  
  function obtenerFondoPorTendencia(tendencia) {
    // Asignar colores de fondo según la tendencia
    switch (tendencia) {
      case 'normal':
        return 'rgba(0, 255, 0, 0.2)'; // Verde claro
      case 'alerta':
        return 'rgba(255, 165, 0, 0.2)'; // Naranja claro
      case 'peligro':
        return 'rgba(255, 0, 0, 0.2)'; // Rojo claro
      default:
        return 'rgba(0, 0, 0, 0)';
    }
  }
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  