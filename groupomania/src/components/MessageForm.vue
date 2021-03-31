<template>
  <div>
    <div class="header">
      <img src="../assets/icon.png" alt="logo groupomania">
      <h1>Bonjour {{ username }}, dite quelque chose !</h1>
    </div>
    <form id="messageForm" @submit.prevent="submitPost">
      <input id="content" type="text" name="content" value="" placeholder="Message"/>
      <div class="formButton">
        <label for="file" class="labelFile">Image</label>
        <input id="file" type="file" ref="file" accept="image/png, image/jpeg, image/gif" v-on:change="handleFileUpload">
        <button type="submit">Ajouter</button>
        <p>{{ file.name }}</p>
      </div>
    </form>
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
      username: '',
      file: ''
    }
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userId = user.userId
    this.token = user.token

    axios.get('http://localhost:3000/api/auth/' + this.userId,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer' + ' ' + this.token
          }
        })
    .then(response => {
      this.username = response.data.username
    })
    .catch( console.error() )

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
            window.location.reload()
          }
        })
        .catch( console.error() )
    }
  }
}
</script>

<style scoped>

#messageForm{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  margin: auto;
}

.header{
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem 10rem;
}

#content{
  width: 50%;
  height: 2.5rem;
  border-radius: 5px;
  margin-right: 1rem;
  font-size: 1.3rem;
  text-indent: 1rem;
}

#file{
  width: auto;
  display: none;
}

.labelFile {
  display: inline-block;
  width: 6rem;
  height: 1.9rem;
  padding-top: 0.6rem;
  font-size: 1rem;
  opacity: 1;
  cursor: pointer;
  border: unset;
  border-radius: 0 20px 0 20px;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
  background: linear-gradient(90deg, rgba(54,84,130,1) 1%, #D1515A 30%);
  margin: 0 1.5rem 1.5rem 1.5rem;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}

.labelFile:hover {
  border-radius: 20px 0 20px 0;
  box-shadow: 8px 8px 15px -3px rgba(0,0,0,0.75);
}

button{
  width: 6rem;
  opacity: 1;
  cursor: pointer;
  border: unset;
  font-size: 1rem;
  border-radius: 0 20px 0 20px;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
  background: linear-gradient(90deg, rgba(54,84,130,1) 1%, #D1515A 30%);
  margin: 0 1.5rem 1.5rem 1.5rem;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}

button:hover{
  border-radius: 20px 0 20px 0;
  box-shadow: 8px 8px 15px -3px rgba(0,0,0,0.75);
}

.formButton{
  display: flex;
  align-items: center;
  margin-top: 1rem
}

@media (max-width: 1024px) {
  .header{
    margin: auto;
    justify-content: center;
  }

  .header > img{
    display: none;
  }

  #messageForm{
    display: inline-block;
    width: 90%;
  }

  #content{
    width: 100%;
    height: 2rem;
    border-radius: 5px;
    margin: auto;
    font-size: 1rem;
    text-indent: 1rem;
  }

  .labelFile{
    height: 1.6rem;
    padding-top: 0.4rem;
  }
}

</style>