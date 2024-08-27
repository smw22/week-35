<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="newMovieTitle" placeholder="Add new movie" />
    <button @click="addMovie">Add movie</button>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        Title: {{ movie.title }}
        {{ movie.id }}
        <button @click="deleteMovie(movie.id)">Delete me</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
/*
setup firebase project
setup vue
npm install firebase + npm install firebase-tools
firebase login (bash)
open firebase console and "create a new project" + "create a new database"
Change firebase Rules (tab) - the date
Made placeholder collection, movies in this case (data)
imported firebase firebaseConfig (Step Firebase)
imported firebase functions (addDoc, collection, onSnapshot...)
imported vue functions (ref, onMounted)
Created input field to add a new movie
Created a list of movies 
Created a function to retrieve a new movie to the list
Created a function to add a new movie to the list
Created a function to delete a movie from the list
install dotenv: npm install dotenv (security)

*/


import { ref, onMounted } from 'vue';
import {getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc} from 'firebase/firestore';

// Import the functions you need from the SDKs you need (Step Firebase)
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//new movie title and stored in a ref
const newMovieTitle = ref('');

//list of movies stored in a li in a ref
const movies = ref([]);

// create a reference to the movies collection in firebase
const moviesFirebaseCollectionRef = 'movies';

// create a function to retrieve a new movie from te list
const moviesCollection = collection(db, moviesFirebaseCollectionRef);
onMounted(() => {
  onSnapshot(moviesCollection, (snapshot) => {
    movies.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() //spread operator
      // title: doc.data().title,
    }))
  })
});

// create a function to add a new movie to the list
const addMovie = async () => {
  if (newMovieTitle.value.trim() == '') 
  return; //checks if input is empty, then returns(stop function)

  await addDoc(moviesCollection, {
    title: newMovieTitle.value
  })

  newMovieTitle.value = '';
}

// create a function to delete a movie from the list
const deleteMovie = async (id) => {
  console.log("deleting movie with id", id)
  await deleteDoc(doc(db, moviesFirebaseCollectionRef, id))
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
