<template>
    <div id="messages" class="messages">
    </div>
</template>

<script>
export default {
  name: 'Center',
  data: function () {
    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE2MTU4NzEyMjgsImV4cCI6MTYxNTk1NzYyOH0.ojMTgSar4qCbQFoRD5QLza-2OoZ1EWsj9fWDHZzqWiQ'
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

    fetch(new Request('http://localhost:3000/api/messages', promesse))
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

              const id = message.id
              fetch(new Request('http://localhost:3000/api/messages/com/' + id, promesse))
                .then(response => {
                  response.json()
                    .then(comments => {
                      if (comments.length !== 0) {
                        const comBlock = document.createElement('div')
                        for (const comment of comments) {
                          const comContent = document.createElement('p')
                          comContent.innerHTML = comment.content
                          comBlock.appendChild(comContent)
                          comBlock.classList.add('com')
                        }
                        block.appendChild(comBlock)
                      }
                    })
                })

              block.classList.add('message')
              msg.appendChild(block)
            }
          })
      })
      .catch(console.error())
  }
}
</script>

<style>
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
    border: solid black 2px;
    border-radius: 10px;
    margin: 2rem;
}

.com{
    width: fit-content;
    font-style: italic;
    border: solid black 2px;
    border-radius: 10px;
    margin: 1rem;
}
</style>
