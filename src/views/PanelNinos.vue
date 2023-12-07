<template>
  <div>
    <h1 class="text-center">Panel de niños</h1>
    
    <div class="dropdown">
      <button class="btn btn-danger" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ⚠ Opciones
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item bg bg-danger text-white" @click="confirmDelete"><i class="fas fa-trash-alt"></i> ❌ Eliminar niño/niña</a>
      </div>
    </div>

    <!-- Botones para mostrar u ocultar cada sección -->
    <div class="text-center mt-3">
      <button @click="toggleSection('formulario-nino')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-nino' }">Formulario Información Personal Niño/a</button>
      <button @click="toggleSection('formulario-salud1')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-salud1' }">Salud Infantil Recién Nacido/a</button>
      <button @click="toggleSection('formulario-vacuna')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-vacuna' }">Registro de vacunación</button>
      <button @click="toggleSection('formulario-tamizaje')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-tamizaje' }">Tamizaje</button>
      <button @click="toggleSection('formulario-anemia')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-anemia' }">Tamizaje Anemia</button>
      <button @click="toggleSection('formulario-salud2')" class="btn btn-info" :class="{ active: formularioActual === 'formulario-salud2' }">Control de crecimiento</button>
      <button @click="toggleSection('grafico-peso')" class="btn btn-info" :class="{ active: formularioActual === 'grafico-peso' }">Gráfico Peso</button>
      <button @click="toggleSection('grafico-longitud')" class="btn btn-info" :class="{ active: formularioActual === 'grafico-longitud' }">Gráfico Longitud</button>
      <button @click="toggleSection('grafico-icm')" class="btn btn-info" :class="{ active: formularioActual === 'grafico-icm' }">Gráfico ICM</button>
      <button @click="toggleSection('grafico-perimetro')" class="btn btn-info" :class="{ active: formularioActual === 'grafico-perimetro' }">Gráfico Perímetro Cefálico</button>
    </div>

    <!-- Contenido de los formularios y gráficos -->
    <div>
      <formulario-nino :ninoId="ninoId" v-show="formularioActual === 'formulario-nino'" />
    </div>
    
    <div>
      <formulario-salud1 :ninoId="ninoId" v-show="formularioActual === 'formulario-salud1'" />
    </div>

    <div>
      <formulario-vacuna :ninoId="ninoId" v-show="formularioActual === 'formulario-vacuna'" />
    </div>

    <div>
      <formulario-tamizaje :ninoId="ninoId" v-show="formularioActual === 'formulario-tamizaje'" />
    </div>

    <div>
      <formulario-anemia :ninoId="ninoId" v-show="formularioActual === 'formulario-anemia'" />
    </div>
    
    <div>
      <formulario-salud2 :ninoId="ninoId" v-show="formularioActual === 'formulario-salud2'" />
    </div>
    
    <div>
      <grafico-peso :ninoId="ninoId" v-show="formularioActual === 'grafico-peso'" />
    </div>

    <div>
      <grafico-longitud :ninoId="ninoId" v-show="formularioActual === 'grafico-longitud'" />
    </div>

    <div>
      <grafico-icm :ninoId="ninoId" v-show="formularioActual === 'grafico-icm'" />
    </div>

    <div>
      <grafico-perimetro :ninoId="ninoId" v-show="formularioActual === 'grafico-perimetro'" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';
import  { BASE_URL }  from '../store/config'; 
export default {
  name: 'PanelNiños',
  data() {
    return {
      formularioActual: 'nino',
    };
  },
  computed: {
    ninoId() {
      return this.$route.params.ninoId;
    },
  },
  methods: {
    confirmDelete() {
      if (this.ninoId) {
        swal({
          title: `¿Estás seguro de eliminar la información?`,
          text: 'Una vez eliminada, no podrás recuperar esta información.',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteNino();
          }
        });
      } else {
        swal({
          title: 'Error',
          text: 'No se ha seleccionado ningún niño.',
          icon: 'error',
          button: 'OK',
        });
      }
    },

    deleteNino() {
      axios.delete(`${BASE_URL}/api/nino/${this.ninoId}`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: '¡Información Eliminada!',
          text: 'La información de niño ha sido eliminada correctamente.',
          icon: 'success',
          button: 'OK',
        });

      
        this.$router.push('/lista/ninos');
      })
      .catch((error) => {
        swal({
          title: 'Error',
          text: 'Hubo un error al eliminar la información.',
          icon: 'error',
          button: 'OK',
        });
        console.error('Error al eliminar la información de la mujer:', error);
      });
    },
    toggleSection(formulario) {
      this.formularioActual = formulario;
    },
  },
};
</script>

<style scoped>
/* Añade estilos adicionales si es necesario */
.active {
  background-color: #5bc0de; /* Cambia el color de fondo cuando está activo */
  color: #fff; /* Cambia el color del texto cuando está activo */
}

.btn-info:not(:disabled):not(.disabled), .btn-info:not(:disabled):not(.disabled), .show>.btn-info.dropdown-toggle {
    margin: 5px;
}

.btn-info:not(:disabled):not(.disabled).active, .btn-info:not(:disabled):not(.disabled):active, .show>.btn-info.dropdown-toggle {
    color: #fff;
    background-color: #64b85c;
    border-color: #10707f;
    margin: 5px;
}

</style>