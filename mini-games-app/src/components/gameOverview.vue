<template>
  <div class="game-overview" @click="pushRouter">
    <div class="game-image-div">
      <img :src="require('../assets/' + game.image)" class="game-image" />
    </div>
    <div class="game-name">
      {{ game.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "gameOverview",
  props: ["game"],
  data() {
    return {};
  },
  methods: {
    pushRouter() {
      this.$router.push(this.game.path);
    },
  },
};
</script>

<style lang="scss">
.game-overview {
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  &:hover .game-name {
    background: $primaryGrey;
  }
}
.game-image-div {
  width: 100%;
  height: 100%;
}
.game-image {
  width: 100%;
  height: 100%;
}
.game-name {
  background: rgba($primaryGrey, 0.6);
  color: $primaryGreen;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 3px;
  padding: 10px;
  transition: all 0.1s ease-in-out;
}
</style>
