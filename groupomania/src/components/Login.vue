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
          this.$emit('login')
          this.$router.push('/')
        })
        .catch( error => {
          this.message = error.response.data.error
        })
      }
  }
}
</script>

<style scoped>
.loginBlock{
  display: flex;
  justify-content: center;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
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
  text-indent: 1rem;
}

.login > input:focus{
  height: 3rem;
  font-size: 1.5rem;
}

@media (max-width: 1024px) {
  .loginBlock{
    width: auto;
    height: 40vh;
  }

  .login{
    width: 60%;
  }

  .loginBlock:hover{
    width: initial;
  }

  .login > label{
  font-size: 1;
  }

  .login > input:focus{
    height: 2rem;
    font-size: 1;
  }
}
</style>
