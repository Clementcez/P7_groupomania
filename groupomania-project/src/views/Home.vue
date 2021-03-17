<template>
  <div class="home">
    <MessageForm/>
    <Center/>
  </div>
</template>

<script>
// @ is an alias to /src
import Center from '@/components/Center.vue'
import MessageForm from '@/components/MessageForm.vue'

export default {
  name: 'Home',
  components: {
    Center,
    MessageForm
  }
}
</script>

<style>

</style>
