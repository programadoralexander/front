<template>
  <div>
    <h1 class="text-center">Panel de Mujeres</h1>
    
    <div class="dropdown">
      <button class="btn btn-danger " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      
          ⚠ Opciones
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="confirmDelete"><i class="fas fa-trash-alt"></i> ❌ Eliminar mujer</a>
      </div>
    </div>

    <!-- Botones para mostrar u ocultar cada sección -->
    <div class="text-center mt-3">
      <button @click="toggleSection('mujer')" class="btn btn-info" :class="{ active: formularioActual === 'mujer' }">Información Personal</button>
      <button @click="toggleSection('etmi')" class="btn btn-info" :class="{ active: formularioActual === 'etmi' }">ETMI</button>
      <button @click="toggleSection('controlmujer')" class="btn btn-info" :class="{ active: formularioActual === 'controlmujer' }">Control Mujer</button>
      <button @click="toggleSection('vacunamujer')" class="btn btn-info" :class="{ active: formularioActual === 'vacunamujer' }">Vacuna Mujer</button>
    </div>

    <!-- Contenido de los formularios -->
    <div>
      <formulario-mujer :mujerId="mujerId" v-show="formularioActual === 'mujer'" />
    </div>
    
    <div>
      <formulario-etmi :mujerId="mujerId" v-show="formularioActual === 'etmi'" />
    </div>

    <div>
      <formulario-controlmujer :mujerId="mujerId" v-show="formularioActual === 'controlmujer'" />
    </div>

    <div>
      <formulario-vacunamujer :mujerId="mujerId" v-show="formularioActual === 'vacunamujer'" />
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import swal from 'sweetalert';
import  { BASE_URL }  from '../store/config'; 
export default {
  name: 'PanelMujeres',
  data() {
    return {
      formularioActual: 'mujer',
    };
  },
  computed: {
    mujerId() {
      return this.$route.params.mujerId;
    },
  },
  methods: {
    confirmDelete() {
      if (this.mujerId) {
        swal({
          title: '¿Estás seguro?',
          text: 'Una vez eliminada, no podrás recuperar esta información.',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteMujer();
          }
        });
      } else {
        // Mostrar mensaje de que no hay una mujer seleccionada
        swal({
          title: 'Error',
          text: 'No se ha seleccionado ninguna mujer.',
          icon: 'error',
          button: 'OK',
        });
      }
    },

    deleteMujer() {
      axios.delete(`${BASE_URL}/api/mujer/${this.mujerId}`, {
        headers: {
          'x-access-token': this.$store.state.auth.user.accessToken,
        },
      })
      .then(() => {
        swal({
          title: '¡Información Eliminada!',
          text: 'La información de la madre ha sido eliminada correctamente.',
          icon: 'success',
          button: 'OK',
        });

      
        this.$router.push('/lista/mujer');
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
      this.formularioActual = this.formularioActual === formulario ? '' : formulario;
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
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