<template>
  <div>
    <div class="game-list-header py-3 py-xl-4">
      <div class="container-xl">
        <div class="game-list-name">Games list ({{ gamesArray.length }})</div>
      </div>
    </div>
    <div
      class="game-list py-3 py-xl-5"
      :style="{
        backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
      }"
    >
      <div class="container-xl">
        <div class="games-list-div">
          <div v-for="(game, index) in gamesArray" :key="index" class="game">
            <game-overview :game="game"></game-overview>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gameOverview from "../components/gameOverview.vue";
export default {
  components: { gameOverview },
  data() {
    return {};
  },
  computed: {
    gamesArray: function() {
      return this.$store.state.games;
    },
  },
};
</script>

<style lang="scss">
.game-list {
  background-color: $primaryGreen;
  background-blend-mode: darken;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.5),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.5);
  background-position-y: 55%;
}
.game-list-name {
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 5px;
}
.game {
  display: inline-block;
  width: calc((100% / 4) - 18px);
  margin: 24px 0;
  margin-right: 24px;
  &:nth-child(4n) {
    margin-right: 0;
  }
}

@media (max-width: 1200px) {
}
@media (max-width: 992px) {
  .game {
    width: calc((100% / 3) - 16px);
    margin-right: 24px;
    &:nth-child(4n) {
      margin-right: 24px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
@media (max-width: 768px) {
  .game {
    width: calc((100% / 2) - 10px);
    margin: 20px 0;
    margin-right: 20px;
    &:nth-child(3n) {
      margin-right: 20px;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
@media (max-width: 576px) {
}
</style>
