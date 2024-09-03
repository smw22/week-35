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
import {useMovies} from '../modules/useMovies'

const { movies, addMovie, deleteMovie, newMovieTitle } = useMovies() //The methods you will use from useMovies
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
