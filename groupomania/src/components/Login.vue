<template>
 <div class="loginBlock">
   <form class="login" @submit.prevent="login">
     <h1 class="authTitle">Connexion</h1>
     <label>Email :</label>
     <input required v-model="email" type="email" placeholder="Email"/>
     <label>Mot de passe :</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <button type="submit">Se connecter</button>
     <p v-if="message">{{ message }}</p>
   </form>
 </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login: function () {
      const dataUser = {
        'email': this.email,
        'password': this.password
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      axios.post('http://localhost:3000/api/auth/login', dataUser, headers)
        .then(resp =>{
          localStorage.setItem('user', JSON.stringify( resp.data ))
          this.$router.push('/')
        })
        .catch( error => {
          console.log(error)
          this.message = error
        })
      }
  }
}
</script>

<style scoped>
.loginBlock{
  display: flex;
  justify-content: center;
  transition-duration: 0.5s;
  width: 30%;
  margin: 2rem 0 4rem 0;
  border: black solid 2px;
  border-radius: 20px;
}

.loginBlock:hover{
  width: 40%;
}

.login{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
}

.login > label{
  font-size: 1.5rem;
}

.login > input{
  height: 1rem;
  font-size: 1rem;
  transition-duration: 0.5s;
  border-radius: 10px 0 10px 0;
}

.login > input:focus{
  height: 3rem;
  font-size: 1.5rem;
}
</style>
