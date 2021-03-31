<template>
  <div class="colorBack">
    <div id="app">
          <img alt="Groupomania logo" src="./assets/icon-left-font-monochrome-black.png">
        <Header/>
        <router-view/>
        <Footer/>
    </div>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>

<style scoped>

.colorBack{
  display: flex;
  background-color: #142744;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: inherit;
  margin-bottom: auto;
  width: 40%;
}

@media (max-width: 1024px) {

  #app{
    width: 95%;
    min-height: 97vh;
    margin: 0 auto 2rem auto;
    font-size: small;
  }

  #app > img {
  width: 60%;
  }
} 
</style>
