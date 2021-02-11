<template>
  <div
    class="example-game-div"
    :style="zIndex"
    @mouseenter="setOnTop"
    @mouseleave="setUnder"
  >
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
  data() {
    return {
      zIndex: "",
    };
  },
  methods: {
    pushRouter() {
      this.$router.push(this.game.path);
    },
    setOnTop() {
      setTimeout(() => {
        this.zIndex = "z-index:3";
      }, 150);
    },
    setUnder() {
      this.zIndex = "z-index:2";
      setTimeout(() => {
        this.zIndex = "z-index:1";
      }, 200);
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
  background-size: 100% 100%;
  background-blend-mode: luminosity;
  position: relative;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 25%;
    background-color: rgba($primaryGrey, 0.9);
    transition: all 0.1s ease-in-out;
  }
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
    transform: scale(1.5);
    transition: all 0.45s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1);
    &::after {
      transform: scale(1.05);
      height: 70%;
      background-color: rgba($primaryGrey, 1);
      transition: all 0.45s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1), transform 0.2s ease-in-out,
        background-color 0.2s ease-in-out;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    }
    & .example-game-name {
      bottom: 45%;
      transition: all 0.45s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1);
    }
    & .example-game-description {
      opacity: 1;
      bottom: 0;
      transition: all 0.45s 0.15s cubic-bezier(0.3, 0.5, 0.5, 1);
    }
  }
}
.example-game-description,
.example-game-name {
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  position: absolute;
  width: 100%;
  color: $primaryGreen;
  z-index: 1;
}
.example-game-name {
  height: 25%;
  bottom: 0;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 4px;
}
.example-game-description {
  height: 45%;
  bottom: -20%;
  font-size: 15px;
  font-weight: 200;
  opacity: 0;
  pointer-events: none;
}

.example-game-transition-slide-down {
  &-enter {
    transform: translateY(-150%);
  }
  &-leave-to {
    transform: translateY(150%);
  }
  &-enter-active {
    transition: all 0.8s ease-in-out;
    pointer-events: none;
  }
  &-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.8s ease-in-out;
    pointer-events: none;
  }
}

@media (max-width: 1200px) {
  .example-game-image {
    height: 310px;
    width: 310px;
    &:hover {
      transform: scale(1);
    }
  }
  .example-game-div {
    height: 310px;
    width: 310px;
  }
  .example-game-name {
    font-size: 40px;
  }
  .example-game-description {
    font-size: 13px;
  }
}
@media (max-width: 992px) {
  .example-game-image {
    height: 240px;
    width: 240px;
  }
  .example-game-div {
    height: 240px;
    width: 240px;
  }
  .example-game-name {
    font-size: 30px;
  }
  .example-game-description {
    font-size: 10px;
  }
}
@media (max-width: 768px) {
  .example-game-image {
    height: 450px;
    width: 450px;
  }
  .example-game-div {
    display: flex;
    justify-content: center;
    height: 450px;
    width: 100%;
  }
  .example-game-name {
    font-size: 50px;
  }
  .example-game-description {
    font-size: 20px;
  }
  .example-game-transition-slide-down {
    &-enter {
      transform: translateX(-150%);
    }
    &-leave-to {
      transform: translateX(150%);
    }
  }
}
@media (max-width: 576px) {
  .example-game-image {
    height: 350px;
    width: 350px;
  }
  .example-game-div {
    height: 350px;
  }
  .example-game-name {
    font-size: 35px;
  }
  .example-game-description {
    font-size: 15px;
  }
}
@media (max-width: 450px) {
  .example-game-image {
    height: 290px;
    width: 290px;
  }
  .example-game-div {
    height: 290px;
  }
  .example-game-name {
    font-size: 30px;
  }
  .example-game-description {
    font-size: 12px;
  }
}
</style>
