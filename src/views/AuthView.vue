<!-- eslint-disable vuejs-accessibility/label-has-for
HAY QUE PREGUNTAR A LOS PROFES COMO APAÑAR ESTO!!! Y PONER REGLAS PARA
DETECCION DE FORMATOS AL ESCRIBIR
TAMBIEN MODIFICAR El SIGN IN SIGN UP PARA PONERLO EN NAV BARS O SIMILARES
-->
<template>
    <h1> Esta es la vista SignUp SignIn</h1>
    <button @click="signUpBool=!signUpBool, signInBool=false" v-show="signUpBool == false" >
      Sign Up </button>
    <form  v-show="signUpBool == true" @submit.prevent="handleSignUp" >
      <div>
        <label for="email">email</label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <input type="submit" value="sign up">
    </form>
    <button @click="signUpBool=false, signInBool=!signInBool"  v-show="signInBool == false">
    Sign In </button>
    <form  v-show="signInBool == true" @submit.prevent="handleSignIn" >
      <div>
        <label for="email">email</label>
        <input name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <input type="submit" value="sign In">
    </form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  data() {
    return {
      email: '',
      password: '',
      signUpBool: false,
      signInBool: false,
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    handleSignUp() {
      //   const userData = {
      //   mail: 'ebrudomingo@gmail.com',
      // pass: '1234567',
      // };
      this.signUp(this.email, this.password);
    },
    handleSignIn() {
      this.signIn(this.email, this.password);
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
