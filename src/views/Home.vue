<template>
  <div class="home-container">
    <div class="content-container">
      <img src="./../assets/imageninicio.png" class="background-image">
      <div class="text-container">
        <h1>LIBRETA INTEGRAL DE SALUD</h1>
        <p>ES DEBER DE TODO DE COMBATIR LA DESNUTRICIÓN CRÓNICA INFANTIL EN EL ECUADOR</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home-container {
    text-align: center;
    padding: 20px;
  }

  .content-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-container {
    text-align: left;
    margin-left: 20px; /* Ajusta según sea necesario */
  }

  h1 {
    font-size: 36px;
    color: #333; /* Puedes cambiar el color según tu preferencia */
    margin-bottom: 10px; /* Ajusta según sea necesario */
  }

  p {
    font-size: 18px;
    color: #555; /* Puedes cambiar el color según tu preferencia */
    margin-bottom: 20px; /* Ajusta según sea necesario */
  }

  .background-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px; /* Ajusta según sea necesario */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra según sea necesario */
  }

  /* Media queries para hacer el diseño responsivo */
  @media (max-width: 768px) {
    .content-container {
      flex-direction: column;
    }

    .text-container {
      margin-left: 0; /* Eliminar el margen lateral en dispositivos pequeños */
      margin-top: 20px; /* Agregar espacio entre la imagen y el texto en dispositivos pequeños */
    }
  }
</style>
