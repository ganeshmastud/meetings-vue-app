<template>
  <div id="app">
    <AppNavbar />
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Navbar from './components/Navbar';
export default {
  name: "App",
  components:{
    AppNavbar: Navbar
  }
};
</script>

<style scoped>
</style>
