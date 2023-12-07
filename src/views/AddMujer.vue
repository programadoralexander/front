<template>
  <div>
    <h1>Panel de Mujeres</h1>
    <div>
      <formulario-addmujer  />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMujeres',
  data() {
    return {
      formularioActual: 'mujer',
    };
  },
};
</script>
