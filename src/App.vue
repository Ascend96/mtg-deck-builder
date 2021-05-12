<template>
  <div id="app">
<!--    Navigation Bar-->
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand :to="'/'">Magic the Gathering</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-for="item in menuItems" :key="item.title"><router-link :to="item.path" class="nav-link">{{item.title}}</router-link></b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="searchCards()">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search for cards" v-model="searchTerm"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown text="Account" right>
            <b-dropdown-item v-if="!authUser" href="#" id="toggle-account-btn"  @click="showAccountModal()">Create Account</b-dropdown-item>
            <b-dropdown-item v-if="!authUser" href="#" id="toggle-login-btn" @click="showLoginModal()">Sign in</b-dropdown-item>
            <b-dropdown-item v-if="authUser" href="#" @click="logout()">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
<!--    Modal for Account Creation-->
    <b-modal ref="account-modal" hide-footer title="Create Account" class="cardInfo" body-bg-variant="secondary" header-bg-variant="primary" id="modal-lg" size="lg">
      <b-form>
        <b-form-group
            id="input-group-1"
            label="Email"
            label-for="email"

        >
          <b-form-input
              id="email"
              v-model="email"
              type="text"
              placeholder="Enter Email"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Password"
            label-for="password"
        >
          <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
          >
          </b-form-input>
        </b-form-group>
      </b-form>
<!--      Button executes create Account-->
      <b-button class="createAccountBtn" type="button" @click="createUser()">Create Account</b-button>
      <h2>{{success}}</h2>
    </b-modal>
<!--    Modal for Sign in-->
    <b-modal ref="login-modal" hide-footer title="Sign in" class="cardInfo" body-bg-variant="secondary" header-bg-variant="primary" id="modal-lg" size="lg">
      <b-form>
        <b-form-group
            id="input-group-1"
            label="Email"
            label-for="email"

        >
          <b-form-input
              id="email"
              v-model="email"
              type="text"
              placeholder="Enter Email"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Password"
            label-for="password"
        >
          <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
          >
          </b-form-input>
        </b-form-group>
      </b-form>
<!--      Button Executes Login Method-->
      <b-button class="createAccountBtn" type="button" @click="login()">Login</b-button>
      <h2>{{success}}</h2>
    </b-modal>
    <router-view :authUser="authUser" :decks="decks" :cards="cards" @add-deck="addCardToDeck"></router-view>
    </div>
</template>

<script>
// import Card from "@/components/Card";
import CardCollection from '@/models/CardCollection';
import axios from 'axios';
import {db} from '@/models/firebase';
import firebase from "firebase";
import User from "@/models/User";



export default {
  name: 'App',
  components: {
    // Card
  },
  data() {
    return {
      authUser: null,
      searching: false,
      searchTerm: 'Black',
      // collection of cards for api call
      cards: new CardCollection(),
      // empty deck array for firebase
      decks: [],
      // Items for navigation
      menuItems: [
        {title: 'Card Search', path: '/cardsearch'},
        {title: 'Decks', path: '/decks'},
      ],
      deckId: '',
      email: '',
      password: '',
      users: [],
      success: '',


    }
  },
  created: function(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        console.log('Signed in as ', user);
        this.authUser = new User(user);
      } else {
        console.log('Not Signed in.')
        this.authUser = null;
      }
    });
  },

  firestore: {
    decks: db.collection('decks'),
    users: db.collection('users'),
  },

  methods: {
    showAccountModal(){
      this.$refs['account-modal'].show()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['account-modal'].toggle('#toggle-account-btn')
      this.$refs['login-modal'].toggle('#toggle-login-btn')
    },
    showLoginModal(){
      this.$refs['login-modal'].show()
    },

    // create account method that uses email and password model from account modal for creation
      createUser(){
        let email = this.email;
        let password = this.password;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(){
              this.$refs['account-modal'].hide();
              console.log("Account Created! username: " + email + " password: " + password);
              db.collection('users').add({email: email, password: password});

            })
        .catch(function(error){
          let errorMessage = error.message;
          console.log(errorMessage)
        })
      },
    // uses email and password model from login modal form for signup
      login(){
        let email = this.email;
        let password = this.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
          this.success = 'Successfully Logged in';
          console.log('Successfully Logged in')

        })
        .catch(function(error){
          let errorMessage = error.message;
          console.log(errorMessage);
        })
      },
    // logout method for firebase account
      logout(){
        firebase.auth().signOut()
        .then(function(){
          console.log('Logged Out successfully');
        });
      },
// This method executes based on events emitted from child components
    // takes parameters of a card to add to firebase deck,
    // and dek Id to find specific deck to insert card into
      addCardToDeck(card, deckId){

        card.quantity = 1;
        card.standardLegal = card.legalities.standard;
        console.log(card.id);
        db.collection('decks')
            .doc(deckId)
            .collection('cards').add(card);
        console.log('Added To sub collection')

      },
// api call method to query cards
    searchCards(){

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

  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
