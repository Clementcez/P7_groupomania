<template>
    <footer>
        <div class="footer">
            <img class="logo" src="../assets/icon.png" alt="logo groupomania">
            <p>For Groupomania with love</p>
        </div>
        <div id="nav">
          <!-- <router-link to="/">Home</router-link><span v-if="isLogged"> | </span>
          <router-link v-if="isLogged" to="/profil">Profil</router-link><span v-if="!isLogged"> | </span>
          <router-link v-if="!isLogged" to="/connexion">Connexion</router-link><span v-if="isLogged"> | </span>
          <a v-if="isLogged" @click="logout" href=""> Déconnexion</a> -->
          <p>{{islogged}}</p>
        </div>
        <div>
            <p>CONNECT-E ©</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {
            props: ['islogged']
        }
    }
}
</script>

<style scoped>
footer{
    display: flex;
    justify-content: space-around;
    height: 5rem;
}

.footer{
    display: flex;
    align-items: center;
}

.logo{
    width: 20%;
}
</style>