<template>
  <div>
    <b-container>
      <div class="deckDetailHeader">
<!--        form select for filtering standard or all cards in deck-->
            <b-form-select v-model="selected" dark>
              <b-form-select-option :value="null" disabled>... Select Standard to filter by only standard legal cards</b-form-select-option>
              <b-form-select-option value="standard">standard</b-form-select-option>
              <b-form-select-option value="all">all</b-form-select-option>
            </b-form-select>
      </div>
      <b-row class="mt-5">
        <b-col>
<!--          Table that displays all cards in selected deck-->
          <b-table-simple hover small dark v-if="selected != 'standard'">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Card Name</b-th>
                <b-th>ManaCost</b-th>
                <b-th>Rarity</b-th>
                <b-th>Value</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="card in deck" :key="card.id" :id="card.id">
                <b-tooltip :target="card.id"><b-img :src="card.image_uris.normal"></b-img></b-tooltip>
                <b-td>{{card.name}}</b-td>
                <b-td>{{card.mana_cost}}</b-td>
                <b-td>{{card.rarity}}</b-td>
                <b-td>{{card.prices.tix}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
<!--  Standard Cards Table // Shows only if Standard is selected from drop down        ===========================================-->
          <b-table-simple hover small dark v-if="selected == 'standard'">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Card Name</b-th>
                <b-th>ManaCost</b-th>
                <b-th>Rarity</b-th>
                <b-th>Value</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="card in standardCards" :key="card.id" :id="card.id">
                <b-tooltip :target="card.id"><b-img :src="card.image_uris.normal"></b-img></b-tooltip>
                <b-td>{{card.name}}</b-td>
                <b-td>{{card.mana_cost}}</b-td>
                <b-td>{{card.rarity}}</b-td>
                <b-td>{{card.prices.tix}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col>
          <div>
<!--            Displays details of deck  -->
            <h3>Deck Details</h3>
            <b-row>
              <b-col>
                <p>Deck Size: </p>
                <p>Deck Value: </p>
                <p>Common Card Total: </p>
                <p>Uncommon Card Total: </p>
                <p>Rare Card Total: </p>
                <p>Mythic Card Total: </p>
              </b-col>
              <b-col>
                <p>{{deck.length}} / 60</p>
                <p>${{deckCost}} </p>
                <p>{{commonCounter}}</p>
                <p>{{uncommonCounter}}</p>
                <p>{{ rareCounter }} </p>
                <p>{{mythicCounter}}</p>
              </b-col>
            </b-row>

          </div>
        </b-col>
      </b-row>

    </b-container>
  </div>

</template>

<script>
import {db} from "@/models/firebase";

export default {
  name: "Deckpage",
  props: {
    id: {type: String, required: true, default: ''},
    authUser: {required: true}
  },
  data: function(){
    return {
      deck: null,
      standardCards: null,
      // Summer goal to create and filter all formats and card types into seperate categories
      // creatureCards: null,
      selected: null,

    }
  },
  firestore: function(){
    return {
      deck: db.collection('decks').doc(this.id).collection('cards'),
      standardCards: db.collection('decks').doc(this.id).collection('cards').where('standardLegal', '==', "legal"),

    }
  },
  methods: {

  },
  computed: {
    // computed methods that calculate deck detail information
    // cost, rare cards, mythic cards, uncommon cards, common cards,
    deckCost(){
      let total = 0;
      this.deck.forEach(function(e){
        if(e.prices.tix){
          total += parseFloat(e.prices.tix);
        }

      });
      return total.toFixed(2);
    },
    rareCounter(){
      let total = 0;
      this.deck.forEach(function(e){
        if(e.rarity == 'rare'){
          total++;
        }
      })
      return total;
    },
    uncommonCounter(){
      let total = 0;
      this.deck.forEach(function(e){
        if(e.rarity == 'uncommon'){
          total++;
        }
      })
      return total;
    },
    commonCounter(){
      let total = 0;
      this.deck.forEach(function(e){
        if(e.rarity == 'common'){
          total++;
        }
      })
      return total;
    },
    mythicCounter(){
      let total = 0;
      this.deck.forEach(function(e){
        if(e.rarity == 'mythic'){
          total++;
        }
      })
      return total;
    },


  },
}
</script>

<style scoped lang="scss">


</style>