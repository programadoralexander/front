<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form  name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
                    <div class="form-group">
                <label for="nombre">Nombre</label>
                      <input
                          v-model="user.nombre"
                          v-validate="'required|min:3|max:20|alpha'"
                          type="text"
                          class="form-control"
                          name="nombre"
                      />
                      <div
                          v-if="submitted && errors.has('nombre')"
                          class="alert alert-danger"
                          role="alert"
                      >Nombre requerido y no debe contener números</div>
                  </div>

          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input
              v-model="user.apellido"
              v-validate="'required|min:3|max:20|alpha'"
              type="text"
              class="form-control"
              name="apellido"
            />
            <div
                          v-if=" submitted && errors.has('apellido')"
                          class="alert alert-danger"
                          role="alert"
                      >Apellido requerido y no debe contener números</div>
          </div>

          <div class="form-group">
    <label for="cedula">Cédula</label>
    <input
        v-model="user.cedula"
        v-validate="'required|min:10|max:10|numeric'"
        type="text"
        class="form-control"
        name="cedula"
    />
    <div
                          v-if="submitted && errors.has('cedula')"
                          class="alert alert-danger"
                          role="alert"
                      >Cédula requerida y debe tener una longitud de 10 dígitos númericos</div>
</div>
<small class="form-text text-muted">
        Ejemplo: 1314851590
    </small>
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              v-model="user.email"
              v-validate="'required|email|'"
              type="text"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >Formato de correo inválido</div>
          </div>
        

          <div class="form-group">
    <label for="password">Password</label>
    <input
        v-model="user.password"
        v-validate="{ required: true, min: 8, regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/ }"
        type="password"
        class="form-control"
        name="password"
    />
    <div
        v-if="submitted && errors.has('password')"
        class="alert-danger"
    > Contraseña debe tener mínimo 8 dígitos,al menos una letra minúscula,una letra mayúscula y un número</div>
</div>
<small class="form-text text-muted">
        Tú contraseña debe:
        <ul>
            <li>Incluir una letra mayúscula y minúscula </li>
            <li>Incluir un número</li>
            <li>Mínimo 8 caracteres</li>
        </ul>
    </small>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Registrarse</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>