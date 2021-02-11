<template>
  <div>
    <div class="home-introduction">
      <div class="container-xl py-3 py-xl-5">
        <div class="home-introduction-header">Mini games app</div>
        <div class="home-introduction-text">
          Application contains a few simple mini games
        </div>
      </div>
    </div>
    <div
      class="example-games"
      :style="{
        backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
        overflow: overflow,
      }"
    >
      <div
        class="container-xl example-games-div py-3 py-xl-5"
        @mouseover="exampleGameIsChanging = false"
        @mouseleave="exampleGameIsChanging = true"
      >
        <example-game
          :game="gamesArray[exampleGameIndex1]"
          class="mb-3 mb-md-0"
          :exampleGameIndex="exampleGameIndex1"
        ></example-game
        ><example-game
          :game="gamesArray[exampleGameIndex2]"
          class="mb-3 mb-md-0"
          :exampleGameIndex="exampleGameIndex2"
        ></example-game
        ><example-game
          :game="gamesArray[exampleGameIndex3]"
          :exampleGameIndex="exampleGameIndex3"
        ></example-game>
      </div>
    </div>
    <div class="technologies">
      <div class="container-xl py-3 py-xl-5">
        <div class="technologies-div">
          <div class="technologies-item">
            <div class="technologies-item-text">
              javascript
            </div>
          </div>
          <div class="technologies-item">
            <div class="technologies-item-text">
              html5
            </div>
          </div>
          <div class="technologies-item">
            <div class="technologies-item-text">
              css3
            </div>
          </div>
          <div class="technologies-item">
            <div class="technologies-item-text">
              sass
            </div>
          </div>
          <div class="technologies-item">
            <div class="technologies-item-text">
              vuejs
            </div>
          </div>
          <div class="technologies-item">
            <div class="technologies-item-text">
              bootstrap4
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exampleGame from "../components/exampleGame.vue";
export default {
  name: "Home",
  components: { exampleGame },
  data() {
    return {
      exampleGameIndex1: 0,
      exampleGameIndex2: 1,
      exampleGameIndex3: 2,
      intervalCounter: 0,
      changeExampleGameTimer: "",
      exampleGameIsChanging: true,
      overflow: "initial",
    };
  },
  mounted() {
    this.startChangeExampleGameTimer();
  },
  methods: {
    randExampleGameIndex() {
      var randomIndex = -1;
      do {
        randomIndex = Math.floor(Math.random() * this.gamesArray.length);
      } while (
        randomIndex === this.exampleGameIndex1 ||
        randomIndex === this.exampleGameIndex2 ||
        randomIndex === this.exampleGameIndex3
      );
      return randomIndex;
    },
    startChangeExampleGameTimer() {
      window.clearInterval(this.changeExampleGameTimer);
      this.changeExampleGameTimer = setInterval(() => {
        if (this.exampleGameIsChanging && !document.hidden) {
          if (this.intervalCounter == 0) {
            this.exampleGameIndex1 = this.randExampleGameIndex();
            this.overflow = "hidden";
            setTimeout(() => {
              this.overflow = "initial";
            }, 900);
            this.intervalCounter++;
          } else if (this.intervalCounter == 1) {
            this.exampleGameIndex2 = this.randExampleGameIndex();
            this.overflow = "hidden";
            setTimeout(() => {
              this.overflow = "initial";
            }, 900);
            this.intervalCounter++;
          } else if (this.intervalCounter == 2) {
            this.exampleGameIndex3 = this.randExampleGameIndex();
            this.overflow = "hidden";
            setTimeout(() => {
              this.overflow = "initial";
            }, 900);
            this.intervalCounter++;
          } else if (this.intervalCounter == 3) {
            this.intervalCounter = 0;
          }
        }
      }, 5000);
    },
  },
  computed: {
    gamesArray: function() {
      return this.$store.state.games;
    },
  },
};
</script>

<style lang="scss">
.home-introduction {
  color: $primaryGreen;
}
.home-introduction-header {
  font-size: 80px;
  font-weight: 800;
  margin-top: -20px;
  letter-spacing: 5px;
}
.home-introduction-text {
  font-size: 30px;
  font-weight: 100;
}
.example-games {
  background-color: $primaryGreen;
  background-blend-mode: darken;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.5),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.5);
  padding: 30px 0px;
  background-position-y: 55%;
}
.example-games-div {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.technologies-item {
  display: inline-block;
  width: calc(calc(100% / 6) - 20px);
  margin: 10px 10px;
  height: 60px;
  background: $primaryGreen;
  color: $primaryGrey;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
}
.technologies-item-text {
  @include flex-center;
  width: 100%;
  height: 100%;
}

@media (max-width: 1200px) {
  .home-introduction-header {
    font-size: 70px;
  }
  .home-introduction-text {
    font-size: 25px;
  }
}
@media (max-width: 992px) {
  .technologies-item {
    width: calc(calc(100% / 3) - 20px);
  }
}
@media (max-width: 768px) {
  .home-introduction-header {
    font-size: 60px;
  }
  .home-introduction-text {
    font-size: 20px;
  }
  .technologies-item {
    width: calc(calc(100% / 2) - 20px);
  }
  .example-games-div {
    display: block;
  }
  .example-games {
    padding: 0;
  }
}
@media (max-width: 576px) {
  .home-introduction-header {
    margin-top: -8px;
    font-size: 40px;
  }
  .home-introduction-text {
    font-size: 16px;
  }
}
</style>
