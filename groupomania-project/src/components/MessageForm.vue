<template>
  <div id="messageForm">
      <p>
          <label for="content">Nouveau message</label>
          <input id="content" type="text" name="content">

          <input id="file" type="file" ref="file" v-on:change="handleFileUpload()">
          <input v-on:click="submitFile()" type="submit"  value="Ajouter">
      </p>
  </div>
</template>

<script>
export default {
  name: 'messageForm',
  data: function () {
    return {
      userId: '14',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE2MTU4NzEyMjgsImV4cCI6MTYxNTk1NzYyOH0.ojMTgSar4qCbQFoRD5QLza-2OoZ1EWsj9fWDHZzqWiQ',
      file: ''
    }
  },
  el: '#form',
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    submitFile () {
      const content = document.getElementById('content').value
      const axios = require('axios')
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('userId', this.userId)
      formData.append('content', content)
      axios.post('http://localhost:3000/api/messages/', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer' + ' ' + this.token
          }
        })
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    }
  }
}
</script>

<style>

</style>
