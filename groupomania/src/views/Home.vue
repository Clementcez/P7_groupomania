<template>
  <div>
    <MessageForm/>
    <div class="messages">
      <div class="message" v-for="item in messages" :key="item.message.id">
        <div class="mediaQ"> 
          <h2 class='titlePost'>{{ item.message.title }}<span class='date'>{{ item.message.date }}</span></h2>
          <form v-if="userId == item.message.userId || admin">
            <button v-on:click.prevent="deletePost(item.message.id)" type="submit">Supprimer le message</button>
            <button v-if="userId == item.message.userId" v-on:click.prevent="update = item.message.id">
              Modifier le message
            </button>
          </form>
        </div>

        <p v-if="update !== item.message.id">{{ item.message.content }}</p>
        <form v-if="update == item.message.id" @submit.prevent="updatePost(item.message.id, item.message.inputId)">
          <input :id="item.message.inputId" type="text" :value="item.message.content">
          <button type="submit">Modifier</button>
          <button v-on:click.prevent="update = 0">Annuler modification</button>
        </form>
        <img v-if='item.message.attachement' :src="item.message.attachement" alt="">

        <form @submit.prevent="addComment(item.message.id)">
          <label class="lecteur" for="comment">Nouveau commentaire</label>
          <input :id='item.message.id' type="text" name="comment" placeholder="Commenter"/>
        </form>

        <div class='flexCom' v-if="item.commentaires">
          <div class="com" v-for="com in item.commentaires" :key="com.date">
            <p class='titleCom'>{{ com.username }}<span class='date'>{{ com.date }}</span></p>
            <p>{{ com.content }}</p>
            <button class="delComButton" v-if="userId == com.userId || admin" v-on:click.prevent="deleteCom(com.postId,com.comId)" type="submit">
              Supprimer le commentaire
            </button>  
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
      update: 0,
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
        for (let item of response.data.messages){
          const postDate = new Date(item.createdAt)
          const post = {
            message: {
              id: item.id,
              inputId: 'a' + item.id,
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
                  postId: item.idMESSAGE,
                  inputId: 'b' + item.id,
                  comId: item.id,
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
    },
    updatePost(messageId, inputId){
      const data = {
        content: document.getElementById(inputId).value
      }
      axios.put('http://localhost:3000/api/messages/' + messageId, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then( this.update = 0, this.findMessage() )
      .catch( console.error() )
    },
    deletePost(postId){
      axios.delete('http://localhost:3000/api/messages/' + postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then( this.findMessage() )
      .catch( console.error() )
    },
    deleteCom(postId, comId){
      axios.delete('http://localhost:3000/api/messages/' + postId + '/coms/' + comId, {
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
  margin: 2rem 5rem 5rem 5rem;
}

.message{
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
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
  position: relative;
  width: 60%;
  font-style: italic;
  border: solid black 2px;
  border-radius: 10px;
  margin: 1rem;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.75);
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

.inputUpdate{
  width: 60%;
  height: 1.5rem;
  font-size: 1.2rem;
}

button{
  width: auto;
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

.delComButton{
  position: absolute;
  bottom: 0;
  left: 100%;
  right: 0;
  overflow: hidden;
  transition: 0.3s;
  padding: initial;
}

.lecteur{
  position: absolute;
  left: -2px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .messages{
    margin: unset;
  }

  .message > img{
    width: 60%;
    margin: 1rem;
  }

  button{
    margin: 0 0.5rem 0.5rem 0.5rem;
    font-size: small;
  }

  input{
    width: 80%;
  }

  p{
    font-size: large;
  }

  .titlePost{
    margin: 1rem;
  }

  .mediaQ{
    margin-bottom: 2rem;
  }

  .delComButton{
    width: 50%;
    height: 40%;
  }
}

</style>
