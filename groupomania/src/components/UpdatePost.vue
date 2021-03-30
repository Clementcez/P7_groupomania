<template>
    <form :idPost='idPost' :textToUpdate='textToUpdate' @submit.prevent="updatePost(idPost)">
        <input id="update" type="text" :value="textToUpdate">
        <button type="submit">Modifier</button>
        <button v-on:click.prevent="update = 0">Annuler modification</button>
    </form>
</template>

<script>
export default {
    name:'UpdatePost',
    data: function () {
    return {
        textToUpdate: '',
        idPost: ''
    }
  },
  methods:{
    updatePost(postId) {
      axios.put('http://localhost:3000/api/messages/' + postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + this.token
        }
      })
      .then(

        )
      .catch( console.error() )
    },
  }
}
</script>