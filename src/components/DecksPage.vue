<template>
<div>
<h3>Your Decks</h3>
<!--  shows modal form for creating a new deck-->
  <b-button class="mb-5" width="30px" variant="secondary" @click="showModal()">Create a deck</b-button>
<!--  Deck list component passes the logged in user to show specific decks based on user id-->
<deck-list :auth-user="authUser"></deck-list>
  <b-modal ref="my-modal" hide-footer title="Create Deck" class="cardInfo" body-bg-variant="secondary" header-bg-variant="tertiary" id="modal-lg" size="lg">
    <b-form>
      <b-form-group
          id="input-group-1"
          label="Deck Name"
          label-for="deck-name"

      >
        <b-form-input
          id="deck-name"
          v-model="newDeck.deck.name"
          type="text"
          placeholder="Enter Deck Name"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-2"
          label="Deck Format"
          label-for="deck-format"
      >
        <b-form-select
            id="deck-format"
            v-model="newDeck.deck.format"
            :options="formats"
            required
        >
        </b-form-select>
      </b-form-group>
    </b-form>
  <b-button type="button" @click="createDeck()">Create Deck</b-button>
  </b-modal>


</div>
</template>

<script>
import DeckList from "@/components/DeckList";
// import deck from '@/components/Deck';
import {db} from "@/models/firebase";
import Deck from "@/models/Deck";

export default {
  name: "DeckPage",
  components: {DeckList},
  data(){
    return {
      // list of formats that magic offers
      formats: [{text: 'Select One', value: null}, 'Standard', 'Modern', 'Legacy', 'Commander', 'Brawl', 'Pauper', 'Pioneer'],
      newDeck: {
        deck: new Deck()
      },

    }
  },

  props: {
    card:{
      type: Object,
    },
    authUser: {
      required: true,
    },


  },
  methods: {
    // Modal Methods
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    showModal(){
      this.$refs['my-modal'].show()
    },

    // Creates deck based on v-modeling form data and adds it to firebase
    createDeck(){
        this.newDeck.deck.ownerId = this.authUser.uid;
        db.collection('decks')
            .add(this.newDeck.deck)
            .then((docRef) => {
              console.log('Added!', docRef);
            })
            .catch((error) => {
              console.log('Error!', error);
            });


    }
  },

}
</script>

<style scoped>

</style>