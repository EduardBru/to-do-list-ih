<!-- eslint-disable vuejs-accessibility/label-has-for
HAY QUE PREGUNTAR A LOS PROFES COMO APAÑAR ESTO!!! Y PONER REGLAS PARA
DETECCION DE FORMATOS AL ESCRIBIR
TAMBIEN MODIFICAR El SIGN IN SIGN UP PARA PONERLO EN NAV BARS O SIMILARES
hacer la letra del boton mas peque en la mediaquery
-->
<template>
  <nav class= "navbar navbar-auth">
    <div>
    <h1> IronKanban</h1>
  </div>
  <div class="homebtn">
    <button @click="signUpBool=!signUpBool, signInBool=false" >
      Sign Up </button>
    <button @click="signUpBool=false, signInBool=!signInBool" >
    Sign In </button>
     </div>
    </nav>
     <div class="input-creds">
    <form  v-show="signUpBool == true" @submit.prevent="handleSignUp"  class="form-container">
      <div>
        <label for="email"></label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password"></label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <input type="submit" value="sign up" class="btn btn-primary btn-block">
    </form>
    <form  v-show="signInBool == true" @submit.prevent="handleSignIn" class="form-container">
      <div>
        <label for="email"></label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password"></label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <input type="submit" value="sign In" class="btn btn-primary btn-block">
    </form>
  </div>
    <div v-if="failedLog">
      <modalButton :buttonModalText="popupText" @child-hide-event="childHide" ></modalButton>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import modalButton from '@/components/ModalButton.vue';

export default {
  name: 'AuthView',
  components: { modalButton },
  data() {
    return {
      email: '',
      password: '',
      signUpBool: false,
      signInBool: false,
      failedLog: false,
      popupText: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    async handleSignUp() {
      try {
        await this.signUp(this.email, this.password);
        // test code
      } catch (error) { // if error
        this.popupText = error.message;
        this.failedLog = true;
        console.error(error); // return error
      }
    },
    async handleSignIn() {
      try {
        await this.signIn(this.email, this.password);
        // test code
      } catch (error) { // if error
        console.error(error.message); // return error
        this.popupText = error.message;
        this.failedLog = true;
      }
    },
    childHide() {
      this.failedLog = false;
      this.popupText = '';
      console.log('entro aqui');
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
      if (!this.user) {
        console.log('user logged out');
        this.$router.push({ path: '/auth' });
      }
    },
  },
};
</script>
<style>
.navbar {
 width: 100%;
/* margin-left: 50px; */
 height: 50px;
 background-color: #2DC5FA;
 z-index: 289;
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-between;
}
.navbar-auth{
  top: 0px;
  position:absolute;
}
.navbar div{
  color: white;
  height: 100%;
  width: 50%;
  min-width: 150px;
}
.navbar div h1{
  margin: 0px 0px 0px 50px;
}
.homebtn{
  width: 50%;
  min-width: 150px;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
}
.homebtn button{
  color: white;
  background-color: #666;
  height: 50px;
  width: 40%;
  min-width: 70px;
  font-size: 24px;
  border: 0px;
  margin-top: -8px;
}
.homebtn button:hover {
  background-color: grey; /* Green */
  color: white;
}
.input-creds{
  position: absolute;
  top: 53px;
  height: 100px;
  width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
gap: 20px;
padding-right: 10%;
}
.form-container{
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
