<template>
  <div>
    <MessageForm @new-message='newMessage'/>
    <div class="messages">
      <div class="message" v-for="item in messages" :key="item.message.id">
        <div> 
          <h2 class='titlePost'>{{ item.message.title }}<span class='date'>{{ item.message.date }}</span></h2>
          <form>
          </form>
        </div>
        <p>{{ item.message.content }}</p>
        <img v-if='item.message.attachement' :src="item.message.attachement" alt="">

        <form @submit.prevent="addComment(item.message.id)">
          <input :id='item.message.id' type="text" placeholder="Commenter"/>
        </form>

        <div class='flexCom' v-if="item.commentaires">
          <div class="com" v-for="com in item.commentaires" :key="com.date">
            <p class='titleCom'>{{ com.username }}<span class='date'>{{ com.date }}</span></p>
            <p>{{ com.content }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MessageForm from '@/components/MessageForm.vue'
import axios from 'axios'

export default {
  name: 'Center',
    components: {
      MessageForm
  },
  data: function () {
    return {
      userId: '',
      admin: '',
      token: '',
      messages: '',
    }
  },
  beforeMount() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.userId = user.userId
      this.token = user.token
      this.admin = user.admin
  },
  mounted() {
   this.findMessage()
  },
  methods: {
    newMessage() {
      this.findMessage()
    },
    findMessage() {
      this.messages = []
      axios.get('http://localhost:3000/api/messages', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then(response =>{
        console.log(response.data)
        for (let item of response.data.messages){
          const postDate = new Date(item.createdAt)
          const post = {
            message: {
              id: item.id,
              userId: item.idUSER,
              title: item.title,
              content: item.content,
              attachement: item.attachement,
              date: `${postDate}`.slice(0, 24)
            }
          }
          if(item.Comments){
            const com = {
              commentaires: {}
            }
            for (let item of item.Comments){
              const comDate = new Date(item.createdAt)
              const coms = {
                [item.id]: {
                  userId: item.idUSER,
                  username: item.User.username,
                  content: item.comContent,
                  date:  `${comDate}`.slice(0, 24)
                }
              }
              Object.assign(com.commentaires, coms)
            }
            Object.assign(post, com)
          }
          this.messages.push(post)
        }
        console.log(this.messages)
      })
      .catch(console.error())
    },
    addComment(messageId) {
      const data = {
        messageId: messageId,
        userId: this.userId,
        comContent: document.getElementById(messageId).value
      }
      axios.post('http://localhost:3000/api/messages/' + messageId + '/coms', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then( this.findMessage() )
      .catch( console.error() )
    }
  }
}
</script>

<style scoped>

p{
  text-indent: 1rem;
  margin: 1rem;
}

.messages{
  display: flex;
  flex-direction: column;
  text-align: initial;
  width: auto;
  margin: 5rem;
}

.message{
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
}

.titlePost{
  text-align: initial;
  text-indent: initial;
  text-decoration: underline;
  margin: 2rem;
}

.message > img{
  width: 30%;
  margin: 1rem;
}

.titleCom{
  text-indent: initial;
}

.flexCom{
  display: flex;
  flex-direction: column-reverse;
}

.com{
  width: 60%;
  font-style: italic;
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
}

.date{
  font-weight: initial;
  margin-left: 1rem;
  font-style: italic;
  color: #a2a2a2;
  font-size: small;
}

input{
  width: 40%;
  margin: 1rem;
  border-radius: 6px;
  text-indent: 1rem;
}

</style>
