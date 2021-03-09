<template>
  <div id="app">
    <img alt="groupomania logo" src="./assets/icon-left-font-monochrome-black.png">
    <p>Connexion :</p>
    <Login />
    <p>Si vous n'avez pas encore créé un compte, merci de vous inscrire ici</p>
  </div>
</template>

<script>
import Login from './components/Auth.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app > img {
    width: 20%
}
</style>
