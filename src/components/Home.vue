<!--
Landing page
-->
<template>
  <b-container>
    <div>
    <b-row>
<!--Image Link to Deck page-->
        <b-col class="createDeckCol">
          <router-link to="/decks">
          Create a Deck
          </router-link>
        </b-col>

<!--Image Link to cardSearch page-->
      <b-col class="searchCardsCol">
        <router-link to="/cardSearch">
          Search for Cards
        </router-link>
      </b-col>
    </b-row>
<!--      Link to Magic Website for information on how to play-->
      <a href="https://magic.wizards.com/en/mtgo/gameguide">
        <div class="homeMagicLink">Learn Magic Today!

        </div>
      </a>

    </div>
  </b-container>

</template>

<script>
export default {
name: "Home"
}
</script>

<style scoped>

</style>