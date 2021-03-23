<template>
  <div class="home">
    <MessageForm/>
    <Center/>
  </div>
</template>

<script>
// @ is an alias to /src
import MessageForm from '@/components/MessageForm.vue'
import Center from '@/components/Center.vue'

export default {
  name: 'Home',
  components: {
    MessageForm,
    Center
  },
  beforeCreate() {
    localStorage.getItem('user') ? console.log('oui') : this.$router.push('/connexion')
  },
}
</script>

<style scoped>
.home > img {
  width: 20%;
}
</style>
