<template>
  <div class="auth">
    <Login/>
    <Signup/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'Connexion',
  components: {
    Login,
    Signup
  },
}
</script>

<style>
.auth{
  width: 80%;
  height: 60vh;
  display: flex;
  justify-content: space-around;
  margin: auto;
}

.authTitle{
  text-decoration: underline;
}

button{
  width: auto;
  height: 2.5rem;
  opacity: 1;
  cursor: pointer;
  border: unset;
  border-radius: 0 20px 0 20px;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
  background: linear-gradient(90deg, rgba(54,84,130,1) 1%, #D1515A 30%);
  margin: 0 1.5rem 1.5rem 1.5rem;
  transition: 0.3s;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
}

button:hover{
  border-radius: 20px 0 20px 0;
  box-shadow: 8px 8px 15px -3px rgba(0,0,0,0.75);
}

@media (max-width: 1024px) {
  .auth{
    flex-direction: column;
    width: 70%;
    height: auto;
  }

  button{
    height: 2rem;
    font-size: small;
    margin: unset;
  }
}

</style>
