<template>
    <footer>
        <div class="footer">
            <img class="logo" src="../assets/icon.png" alt="logo groupomania">
            <p>For Groupomania with love</p>
        </div>
        <div id="nav">
          <router-link v-if="logged" to="/">Home</router-link><span v-if="logged"> | </span>
          <router-link v-if="logged" to="/profil">Profil</router-link>
          <router-link v-if="!logged" to="/connexion">Connexion</router-link><span v-if="logged"> | </span>
          <a v-if="logged" @click="logout" href=""> Déconnexion</a>
        </div>
        <div class="footer">
            <p>CONNECT-E ©</p>
        </div>
    </footer>
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
footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 5rem;
}

.footer{
    display: flex;
    align-items: center;
}

.logo{
    width: 20%;
}

#nav {
    padding: 30px;
    margin-right: 12%;
}

#nav a {
    transition-duration: 0.3s;
    font-size: 1rem;
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

@media (max-width: 1024px) {

    footer{
        position: relative;
        height: 7rem;
    }

    .footer{
        margin-top: 2rem;
    }

    #nav{
        position: absolute;
        bottom: 3rem;
    }
}
</style>