<template>
  <div class="profil">
      <p v-if="admin === true">Adminstrateur</p>
      <p v-else> Utilisateur</p>
      <p>Pseudo : <span>{{ username }}</span></p>
      <p>Email : <span>{{ email }}</span></p>
      <p>Mot de passe : ****</p>
      <button @click="deleteProfil">Supprimer profil</button>

    <div class="admin" v-if="admin === true">

      <form @submit.prevent="findProfil">
        <p>Trouver un profil :</p>
        <label>Pseudo : </label>
        <input required v-model="findUser.username" type="text" placeholder="Pseudo"/>
        <button type="submit">Rechercher</button>
      </form>

      <div v-if="findUser.user.pseudo" class="search">
        <div>
          <div class="user" v-for="(value, name) in findUser.user" :key="name">{{ name }} : {{ value }}</div>
          <button v-if="findUser.user.pseudo" class="deleteBtn" @click="deleteUser">
            Supprimer le profil de {{ findUser.user.pseudo }}
          </button>
          <button v-if="findUser.user.pseudo" @click="cancelSearch">
            Annuler
          </button>
        </div>

           <div class="userInfo" v-if="findUser.messages.length">
              <div class="message" v-for="item in findUser.messages" :key="item.id">
                <p>{{ item.content }}<span> date : </span>{{ item.createdAt }}</p>
                <img :src="item.attachement" alt="">
              </div>
              <p>Messages de {{ findUser.user.pseudo }} :</p>
            </div>
            <div v-else>
              <p>Pas de messages trouvé ...</p>
            </div>

          <div class="userInfo" v-if="findUser.comments.length">
            <div class="comment" v-for="item in findUser.comments" :key="item.id">
              <p>{{ item.comContent }}<span> date : </span>{{ item.createdAt }}</p>
            </div>
            <p>Commentaires de {{ findUser.user.pseudo }} :</p>
          </div>
          <div v-else>
            <p>Pas de commentaires trouvé ...</p>
          </div>
      </div>
    </div>
    <div class="message" v-if="findUser.error">
      <p>Aucun profil trouvé ...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'profil',
  data: function () {
    return {
      username: '',
      email: '',
      userId: '',
      token: '',
      admin: '',
      findUser: {
        username: '',
        user: {},
        messages: [],
        comments: [],
        error: ''
      },
    }
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userId = user.userId
    this.admin = user.admin
    this.token = user.token
  },
  mounted () {
    axios.get('http://localhost:3000/api/auth/' + this.userId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + this.token
      }
    })
    .then(resp => {
          this.username = resp.data.username
          this.email = resp.data.email
    })
    .catch(console.error())
  },
  methods: {
    deleteProfil () {
      if (confirm("Etes vous sur de vouloir supprimer votre profil ?")){
        axios.delete('http://localhost:3000/api/auth/' + this.userId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + this.token
          }
        })
      .then(
        alert('Profil supprimé'),
        this.$emit('logout')
        )
      }
      else{
        return
      }
    },
    findProfil () {
      if( this.findUser.user.pseudo){
        this.cancelSearch()
      }
      axios.get('http://localhost:3000/api/auth/profil/' + this.findUser.username, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then(resp => {
        if(!resp.data){
          this.findUser.error = 'error'
        }
        else{
          const createDate = new Date(resp.data.createdAt)
          this.findUser.user = {
            pseudo: resp.data.username,
            email: resp.data.email,
            id: resp.data.id,
            création: `${createDate}`.slice(0, 24)
          }
          this.findUser.error = ''

          axios.get('http://localhost:3000/api/auth/' + this.findUser.user.id + '/messages', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer' + ' ' + this.token
            }
          })
          .then(response => {
            for (let message of response.data){
              this.findUser.messages.push(message)
            }
          })
          .catch(console.error())

          axios.get('http://localhost:3000/api/auth/' + this.findUser.user.id + '/coms', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer' + ' ' + this.token
            }
          })
          .then(response => {
            for (let com of response.data){
              this.findUser.comments.push(com)
            } 
          })
        }
      })
      .catch(console.error())
    },
    deleteUser(){
      axios.delete('http://localhost:3000/api/auth/' + this.findUser.user.id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + this.token
          }
        })
      .then(alert('Profil supprimé'))
    },
    cancelSearch() {
      this.findUser = {
        username: '',
        user: {},
        messages: [],
        comments: [],
        error: ''
      }
    },
  }
}
</script>

<style scoped>
.search{
  display: flex;
  justify-content: space-around;
}

.userInfo{
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  border: solid black 2px;
  border-radius: 10px;
  max-width: 30%;
  margin-bottom: 1rem;
}

.message, .comment{
  overflow: auto;
  margin: 0 1rem 0 1rem;
}

.message > img {
  width: 50%;
}

.deleteBtn{
  margin-top: 1rem;
}

.user{
  margin-top: 1rem;
}

.profil{
  flex-grow: 1;
}
</style>
