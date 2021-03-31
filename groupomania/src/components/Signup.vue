<template>
 <div class="signupBlock">
   <form class="signup" @submit.prevent="signup">
     <h1 class="authTitle">Inscription</h1>
     <label for="email inscription">Email :</label>
     <input required v-model="email" id="email inscription" name="email inscription" type="email" placeholder="Email"/>
      <label for="pseudo inscription">Pseudo :</label>
     <input required v-model="username" id="pseudo inscription" name="pseudo inscription" type="text" placeholder="Pseudo"/>
     <label for="password inscription">Mot de passe :</label>
     <input required v-model="password" name="password inscription" id="password inscription" type="password" placeholder="Password"/>
     <button type="submit">S'inscrire</button>
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
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    signup: function () {
      const dataUser = {
        'email': this.email,
        'username': this.username,
        'password': this.password
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      axios.post('http://localhost:3000/api/auth/signup', dataUser, headers)
        .then(res =>{
            console.log(res.status)
            if(res.status == 201){
                axios.post('http://localhost:3000/api/auth/login', dataUser, headers)
                .then(resp =>{
                    localStorage.setItem('user', JSON.stringify( resp.data ))
                    this.$emit('login')
                    this.$router.push('/')
                })
            }
        })
        .catch( error => {
          console.log(error.response)
          this.message = error.response.data.error
        })
      }
  }
}
</script>

<style scoped>

.signupBlock{
  display: flex;
  justify-content: center;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
  transition-duration: 0.5s;
  width: 30%;
  margin: 2rem 0 4rem 0;
  border: black solid 2px;
  border-radius: 20px;
}

.signupBlock:hover{
  width: 40%;
}

.signup{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
}

.signup > label{
  font-size: 1.5rem;
}

.signup > input{
  height: 1rem;
  font-size: 1rem;
  transition-duration: 0.5s;
  border-radius: 10px 0 10px 0;
  text-indent: 1rem;
}

.signup > input:focus{
  height: 3rem;
  font-size: 1.5rem;
}

@media (max-width: 1024px) {
  .signupBlock{
    width: auto;
    height: 50vh;
  }

  .signup{
    width: 60%;
  }

  .signupBlock:hover{
    width: initial;
  }

  .signup > label{
    font-size: 1;
  }

  .signup > input:focus{
    height: 2rem;
    font-size: 1;
  }
}

</style>
