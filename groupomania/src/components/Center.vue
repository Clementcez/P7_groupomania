<template>
  <div class="messages">
    <!-- <div class="message" v-for="item in messages" :key="item.message.id">

      <p>{{ item.message.title }} : {{ item.message.content }}</p>
      <img :src="item.message.attachement" alt="">

      <div v-if="item.comments" class="com">
        <p v-for="item in messages.comments" :key="item.comments.id">Commentaire : {{ item }}</p>
      </div>

      <form @submit.prevent="addComment(item.id)">
          <input :id="item.id" type="text" placeholder="Commentaire"/>
          <button type="submit">Commenter</button>
      </form>

    </div> -->
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Center',
  data: function () {
    return {
      userId: '',
      admin: '',
      token: '',
      comment: '',
      messages: {
        message : [],
        comments : []
      }
    }
  },
  beforeMount() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.userId = user.userId
      this.token = user.token
      this.admin = user.admin
  },
  mounted () {
    axios.get('http://localhost:3000/api/messages', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + this.token
      }
    })
    .then(response =>{
      for ( let msg of response.data ){
        axios.get('http://localhost:3000/api/messages/com/' + msg.id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + this.token
          }
        })
        .then(response =>{
          for (let com of response.data)
            this.messages.comments.push(com)
        })
        this.messages.message.push(msg)
      }
      console.log(this.messages.comments[0])
    })
    .catch(console.error())
  },
  methods: {
    addComment(messageId) {
      const data = {
        messageId: messageId,
        userId: this.userId,
        comContent: document.getElementById(messageId).value
      }
      axios.post('http://localhost:3000/api/messages/' + messageId, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then()
      .catch(console.error())
    }
  }
}
</script>

<style scoped>
p{
  width: auto;
}
.messages{
  display: flex;
  flex-direction: column-reverse;
  width: auto;
  margin: 5rem;
}

.message{
  width: 15rem;
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
}

.message > img{
  width: inherit;
}

.com{
  font-style: italic;
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
}
</style>
