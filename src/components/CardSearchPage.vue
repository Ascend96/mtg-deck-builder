<template>
<div>
  <h4>Use search bar to search for cards</h4>
  <b-row v-if="cards.length > 0">
<!--    creates card component for each card in the api call, emits event up to the parent for the call-->
    <card class="pr-5" :authUser="authUser" v-for="(card, i) in cards" :key="i" :card="card" @add-deck="addCardToDeck"></card>
<!--    responsive rows for api search results-->
    <b-col v-if="(cards.length % 2) > 0" class="book shelf d-block d-sm-none"></b-col>
    <b-col v-if="(cards.length % 3) > 0" class="book shelf d-none d-sm-block d-md-none"></b-col>
    <b-col v-if="(cards.length % 4) > 0" class="book shelf d-none d-md-block d-lg-none"></b-col>
    <b-col v-if="(cards.length % 6) > 0" class="book shelf d-none d-lg-block"></b-col>
  </b-row>
</div>
</template>

<script>
import Card from "@/components/Card";
import axios from "axios";
import CardCollection from "@/models/CardCollection";
export default {
name: "CardSearchPage",
  components: {
  Card,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    searching: {
      type: Boolean,
    },
    authUser: {required: true,}
  },
  methods: {
    searchCards(){
      // ajax call to query api and display results
      this.searching = true;
      if(this.searchTerm){

        let url = "https://api.scryfall.com/cards/search";

        let config = {
          params: {
            q: this.searchTerm
          }
        };
        axios
            .get(url, config)
            .then((response) => {
              console.log('Response from API', response)
              console.log(response.data.data);
              this.cards = new CardCollection(response.data.data)
              this.searching = false;
            })
      }
    },
    // emits event up to app
    addCardToDeck(card, deckId){
      console.log('emitting event from card search page')
      this.$emit('add-deck', card, deckId)
    }
  }

}
</script>

<style scoped>

</style>