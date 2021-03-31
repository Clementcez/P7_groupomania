<template>
    <div id="nav">
        <router-link v-if="logged" to="/">Home</router-link><span v-if="logged"> | </span>
        <router-link v-if="logged" to="/profil">Profil</router-link>
        <router-link v-if="!logged" to="/connexion">Connexion</router-link><span v-if="logged"> | </span>
        <a v-if="logged" @click="logout" href=""> Déconnexion</a>
    </div>
</template>
       
<script>

export default {
    name: 'Footer',
    data () {
        return {
            logged: false
        }
    },
    watch:{
        $route(to, from) {
            this.logged = localStorage.getItem('user') ? true : false
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/connexion')
        },
    },
    beforeMount(){
        this.logged = localStorage.getItem('user') ? true : false
    }
}
</script>

<style scoped>

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

#nav a:hover{
    color: #D1515A;
}

#nav a.router-link-exact-active {
  color: #D1515A;
  text-decoration: underline;
}

</style>