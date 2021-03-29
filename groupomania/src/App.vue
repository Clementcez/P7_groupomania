<template>
  <div class="colorBack">
    <div id="app">
          <img alt="Groupomania logo" src="./assets/icon-left-font-monochrome-black.png">
        <div id="nav">
          <router-link to="/">Home</router-link><span v-if="isLogged"> | </span>
          <router-link v-if="isLogged" to="/profil">Profil</router-link><span v-if="!isLogged"> | </span>
          <router-link v-if="!isLogged" to="/connexion">Connexion</router-link><span v-if="isLogged"> | </span>
          <a v-if="isLogged" @click="logout" href=""> Déconnexion</a>
        </div>
        <router-view @logout="logout" @login="logged"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isLogged: ''
    }
  },
  beforeMount() {
 	window.addEventListener('beforeunload', this.logout)
  },
  methods: {
    logged(){
      this.isLogged = 1
    },
    logout() {
      localStorage.clear()
      this.isLogged = ''
      this.$router.push('/connexion')
    },
  }
}
</script>

<style scoped>

.colorBack{
  display: flex;
  background-color: #142744;
  min-height: 100vh;
}

#app {
  width: 80%;
  min-height: 80vh;
  margin: 0 auto 3rem auto;
  background-color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  border-radius: 0 0 20px 20px;
}

#app > img {
  width: 40%;
}

#nav {
  padding: 30px;
}

#nav a {
  transition-duration: 0.3s;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: unset;
}

#nav a.router-link-exact-active {
  color: #D1515A;
  text-decoration: underline;
}
</style>
