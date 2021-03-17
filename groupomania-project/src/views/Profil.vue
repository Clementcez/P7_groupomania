<template>
    <div class="profil">
        <p>Pseudo : <span id="pseudo">{{ username }}</span></p>
        <p>Email : <span id="email">{{ email }}</span></p>
        <p>Mot de passe : ***</p>
        <button @click="deleteProfil">Supprimer profil</button>
        <button @click="findAllMessage">Afficher mes messages envoyé</button>
        <div id="messages"></div>
    </div>
</template>

<script>
export default {
  name: 'profil',
  data: function () {
    return {
      username: '',
      email: '',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE2MTU4NzEyMjgsImV4cCI6MTYxNTk1NzYyOH0.ojMTgSar4qCbQFoRD5QLza-2OoZ1EWsj9fWDHZzqWiQ'
    }
  },
  methods: {
    deleteProfil () {
      const promesse = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        },
        mode: 'cors'
      }
      fetch(new Request('http://localhost:3000/api/auth/' + '14', promesse))
        .then(alert('Profil supprimé'))
    },
    findAllMessage () {
      const promesse = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        },
        mode: 'cors'
      }
      fetch(new Request('http://localhost:3000/api/auth/' + '14' + '/messages', promesse))
        .then(response => {
          response.json()
            .then(messages => {
              const msg = document.getElementById('messages')

              for (const message of messages) {
                const block = document.createElement('div')
                const title = document.createElement('h1')
                const content = document.createElement('p')

                title.innerHTML = message.title
                block.appendChild(title)
                content.innerHTML = message.content
                block.appendChild(content)

                if (message.attachement !== null) {
                  const img = document.createElement('img')
                  img.src = message.attachement
                  block.appendChild(img)
                }

                block.classList.add('message')
                msg.appendChild(block)
              }
            })
        })
        .catch(console.error())
    }
  },
  mounted () {
    const promesse = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + this.token
      },
      mode: 'cors'
    }
    fetch(new Request('http://localhost:3000/api/auth/' + '14', promesse))
      .then(response => {
        response.json()
          .then(profil => {
            this.username = profil.username
            this.email = profil.email
          })
      })
  }
}

</script>
