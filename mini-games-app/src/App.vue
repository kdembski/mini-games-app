<template>
  <div id="app">
    <div id="nav">
      <div class="container-xl">
        <router-link class="custom-router-link" to="/">Home</router-link>
        <router-link class="custom-router-link" to="/about">About</router-link>
      </div>
    </div>

    <transition name="transition-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  background: $primaryGrey;
  min-height: 100vh;
  font-family: "Oswald", sans-serif;
}
#app .row,
#app p {
  margin: 0;
}
#nav {
  padding: 30px 0px;
  background: $primaryGreen;

  a {
    font-weight: bold;
    font-size: 24px;
    padding: 30px 30px;
    position: relative;
    transition: all 0.2s ease-out;
    color: $primaryGrey;
    &.router-link-exact-active {
      background: $primaryGrey;
      color: $primaryGreen;
    }
    &:hover {
      background: $primaryGrey;
      color: $primaryGreen;
    }
  }
}
</style>
