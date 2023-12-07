<template>
  <div>
    <h1>Panel de Niños</h1>
    <div>
      <formulario-addnino  />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNinos',
  data() {
    return {
      formularioActual: 'ninos',
    };
  },
};
</script>
