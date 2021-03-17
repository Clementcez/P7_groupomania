<template>
<div id="app">
        <img alt="groupomania" src="assets/icon-left-font-monochrome-black.png">
    <div id="nav">
      <router-link to="/">Connexion</router-link> |
      <router-link to="/profil">Profil</router-link>
    </div>
    <router-view/>
</div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app > img {
  width: 20%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #b95442;
}
</style>
