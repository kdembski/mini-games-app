<template>
  <div class="example-game-div">
    <transition name="example-game-transition-slide-down">
      <div
        class="example-game-image"
        :style="{
          backgroundImage: 'url(' + require(`../assets/${game.image}`) + ')',
        }"
        :key="exampleGameIndex"
        @click="pushRouter"
      >
        <div class="example-game-name">{{ game.name }}</div>
        <div class="example-game-description">{{ game.description }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "exampleGame",
  props: ["game", "exampleGameIndex"],
  methods: {
    pushRouter() {
      this.$router.push(this.game.path);
    },
  },
};
</script>

<style lang="scss">
.example-game-div {
  position: relative;
  width: 350px;
  height: 350px;
}
.example-game-image {
  width: 350px;
  height: 350px;
  background-size: cover;
  background-color: black;
  background-blend-mode: luminosity;
  position: relative;
  transition: all 0.15s ease-in-out;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 25%;
    background: rgba($primaryGrey, 0.9);
    transition: all 0.15s ease-in-out;
  }
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
    transform: scale(1.5);
    z-index: 2;
    background-color: transparent;
    transition: all 0.35s 0.1s cubic-bezier(0.3, 0.5, 0.5, 1);
    &::after {
      transform: scale(1.05);
      height: 70%;
      background: rgba($primaryGrey, 1);
      transition: all 0.35s 0.1s cubic-bezier(0.3, 0.5, 0.5, 1);
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    }
    & .example-game-name {
      bottom: 45%;
      transition: all 0.35s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1);
    }
    & .example-game-description {
      opacity: 1;
      bottom: 0;
      transition: all 0.35s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1);
    }
  }
}
.example-game-description,
.example-game-name {
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.15s ease-in-out;
  position: absolute;
  width: 100%;
  color: $primaryGreen;
  z-index: 1;
}
.example-game-name {
  height: 25%;
  bottom: 0;
  font-size: 40px;
  font-weight: 800;
}
.example-game-description {
  height: 45%;
  bottom: -30%;
  font-size: 15px;
  font-weight: 200;
  opacity: 0;
  pointer-events: none;
}

.example-game-transition-slide-down {
  &-enter {
    opacity: 0;
    transform: translateY(-50%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
  &-enter-active {
    transition: all 0.5s ease-in-out;
  }
  &-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }
}

@media (max-width: 1200px) {
  .example-game-image {
    width: 100%;
    &:hover {
      transform: scale(1);
    }
  }
  .example-game-div {
    width: 100%;
  }
  .example-game-name {
    font-size: 50px;
  }
  .example-game-description {
    font-size: 22px;
  }
}
@media (max-width: 768px) {
  .example-game-name {
    font-size: 40px;
  }
  .example-game-description {
    font-size: 18px;
  }
}
@media (max-width: 576px) {
  .example-game-name {
    font-size: 30px;
  }
  .example-game-description {
    font-size: 16px;
  }
}
</style>
