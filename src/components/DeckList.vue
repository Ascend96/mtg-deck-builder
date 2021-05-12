<template>
  <div>
    <b-row v-if="decks.length > 0">
      <b-card v-for="deck in decks" :key="deck.id" class="deckThumbnail"><h3>{{deck.name}}</h3>
<!--links to specific deck details and passes the deck id as a parameter -->
        <router-link :to="{name: 'deck', params: {id: deck.id}}">
          <b-button class="deckButton" type="button" variant="dark">View Deck</b-button>
        </router-link>

<!--Resposive rows for deck list-->
      </b-card>
      <b-col v-if="(decks.length % 2) > 0" class="book shelf d-block d-sm-none"></b-col>
      <b-col v-if="(decks.length % 3) > 0" class="book shelf d-none d-sm-block d-md-none"></b-col>
      <b-col v-if="(decks.length % 4) > 0" class="book shelf d-none d-md-block d-lg-none"></b-col>
      <b-col v-if="(decks.length % 6) > 0" class="book shelf d-none d-lg-block"></b-col>
    </b-row>

  </div>
</template>

<script>
// import Deck from "@/components/Deck";
import {db} from "@/models/firebase";


export default {
name: "DeckList",
  components:{
  },
  data(){
    return{
      decks: [],
    }
  },
  props: {
    authUser: {required: true}
  },

  firestore: function() {
  return {
    decks: db.collection('decks').where('ownerId', '==', this.authUser.uid),

  }
  },
  methods: {


  },
}
</script>

<style scoped>

.deckThumbnail{
  width: 200px;
  height: 200px;
}

</style>