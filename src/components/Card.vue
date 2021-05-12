<template>
  <div>
    <b-card class="mb-3 cardComponent">


      <p>{{card.name}}</p>
      <b-img right :src="card.image_uris.small" img-alt="Card image"></b-img>
      <b-card-text>
      </b-card-text>
      <b-button id="toggle-btn" @click="showModal()">View Details</b-button>
<!--      modal to display closer view of card as well as card details-->
      <b-modal ref="card-modal" hide-footer title="Card Details" class="cardInfo" body-bg-variant="secondary" header-bg-variant="tertiary" id="modal-lg" size="lg">

          <b-row>
            <b-col><b-img  right :src="card.image_uris.normal" fluid-grow></b-img></b-col>
            <b-col ><h3>{{card.name}} </h3>
              <b-table :items="fields"></b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button block class="addToDeckBtn" variant="dark" @click="addCardToDeck(card, selected)">Add to deck</b-button>
            </b-col>
            <b-col>
<!--              form select for choosing only decks that the current user has created-->
<!--              sets the value to the deck.id-->
              <b-form-select v-model="selected">
                <b-form-select-option :value="null" disabled>... Please select a deck</b-form-select-option>
                <b-form-select-option v-for="deck in decks" :key="deck.id" :value="deck.id">{{deck.name}}</b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>

      </b-modal>
    </b-card>
  </div>
</template>

<script>
import {db} from "@/models/firebase";
export default {
name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    },
    deck: {
      type: Object,
    },
    authUser: {required: true,}
  },
  data(){
    return{
      selected: null,
       fields: [
         {Set_Name: this. card.set_name, Rarity: this.card.rarity}
       ],
      decks: [],
      formats: [
        {Format_Name: "Brawl", Format_Status: this.card.legalities.brawl},
        {Format_Name: "Standard", Format_Status: this.card.legalities.standard},
        {Format_Name: "Duel", Format_Status: this.card.legalities.duel},
      ]
    }
  },
  firestore: function() {
  return {
    decks: db.collection('decks').where('ownerId', '==', this.authUser.uid),
  }

  },
  methods: {
  // modal methods
    showModal(){
      this.$refs['card-modal'].show()
    },
    hideModal() {
      this.$refs['card-modal'].hide()
    },
    toggleModal() {

      this.$refs['card-modal'].toggle('#toggle-btn')
    },

    addCardToDeck(card, deckId) {
      console.log('emitting from card')
      this.$emit('add-deck', card, deckId)
    }
  },
  computed: {


  }
}
</script>

<style scoped>
cardComponent{
  width: 300px;
}

</style>