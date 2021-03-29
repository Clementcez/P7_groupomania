<template>
  <div id="messageForm">
    <label for="content">Nouveau message</label>
    <input id="content" type="text" name="content">
    <input id="file" type="file" ref="file" v-on:change="handleFileUpload">
    <input v-on:click="submitPost" type="submit"  value="Ajouter">
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'messageForm',
  data: function () {
    return {
      userId: '',
      token: '',
      file: ''
    }
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userId = user.userId
    this.token = user.token
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    submitPost () {
      const content = document.getElementById('content').value
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
        .then(response => {
          if(response.status == 201){
            this.$emit('new-message')
          }
        })
        .catch( console.error() )
    }
  }
}
</script>