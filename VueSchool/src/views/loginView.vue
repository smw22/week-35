<template>
    <div class="container">
        <h1>Login</h1>
        <input v-model="email" type="text" placeholder="Your email" />
        <input v-model="password" type="password" placeholder="Your password" />

        <button v-if="!user" @click="login(email, password)">Login</button>
        <button v-if="user" @click="logout">Logout</button>
        <p v-if="user">Logged in as: {{ user.email }}</p>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useUsers } from '../modules/useUsers'
const { user, login, logout } = useUsers()

const email = ref('');
const password = ref('');


</script>

<style>

</style>