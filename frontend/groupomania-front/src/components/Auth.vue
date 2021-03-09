<template>
    <form
  id="app"
  action="http://localhost:3000/api/auth/login"
  method="post"
>

  <p>
    <label for="username">Pseudo</label>
    <input
      id="username"
      type="text"
      name="username"
    >
  </p>

  <p>
    <label for="email">Email</label>
    <input
      id="email"
      type="text"
      name="email"
    >
  </p>

  <p>
    <label for="password">Mot de passe</label>
    <input 
    id="password"
    type="password"
    name="password"
    >
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style>

</style>