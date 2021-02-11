<template>
  <div>
    <div class="py-3 py-xl-5">
      <div class="container-xl">
        <div class="memory-sequence-name">{{ gameDetails.name }}</div>
        <div class="memory-sequence-description">
          {{ gameDetails.description }}
        </div>
      </div>
    </div>
    <transition name="transition-slide-down" mode="out-in">
      <div v-if="showMenu" key="menu">
        <div
          class="memory-sequence-menu py-3 py-xl-5"
          :style="{
            backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
          }"
        >
          <div class="container-xl">
            <div class="memory-sequence-menu-div">
              <div class="game-mode-header mb-3 mb-xl-5">
                Select game mode
              </div>
              <div class="row d-flex justify-content-between mb-3 mb-xl-5">
                <input
                  type="radio"
                  name="gameMode"
                  id="inOrder"
                  value="inOrder"
                  v-model="gameMode"
                  class="game-mode-input"
                />
                <label
                  for="inOrder"
                  class="game-mode-label"
                  :class="{ error: gameModeNotSelectedError }"
                  @click="gameModeNotSelectedError = false"
                >
                  <div class="game-mode-label-text">
                    Memorize sequence in given order
                  </div>
                </label>
                <input
                  type="radio"
                  name="gameMode"
                  id="notInOrder"
                  value="notInOrder"
                  v-model="gameMode"
                  class="game-mode-input"
                />
                <label
                  for="notInOrder"
                  class="game-mode-label"
                  :class="{ error: gameModeNotSelectedError }"
                  @click="gameModeNotSelectedError = false"
                >
                  <div class="game-mode-label-text">
                    Sequence order doesn't matter
                  </div>
                </label>
              </div>

              <div class="sequence-time-header mb-3 mb-xl-5">
                Choose sequence display time
              </div>
              <div class="row position-relative mb-3 mb-xl-5">
                <input
                  type="range"
                  id="sequenceTimeSlider"
                  :min="sliderMin"
                  :max="sliderMax"
                  :step="sliderStep"
                  class="sequence-time-slider"
                  v-model="sequenceDisplayTime"
                />
                <div
                  class="sequence-time-slider-value"
                  id="sequenceTimeSliderValue"
                >
                  {{ sequenceDisplayTime }}s
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="button memory-sequence-button" @click="setOptions">
                  <p>play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else key="game">
        <div
          class="memory-sequence py-3 py-xl-5"
          :style="{
            backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
          }"
        >
          <div class="container-xl">
            <div class="memory-sequence-header mb-3 mb-xl-5">
              <transition
                name="memory-sequence-header-transition"
                mode="out-in"
              >
                <div
                  class="memory-sequence-header-text"
                  :key="memorySequenceHeader"
                >
                  {{ memorySequenceHeader }}
                </div>
              </transition>
            </div>

            <div class="d-flex justify-content-center mb-2 mb-xl-3">
              <div
                class="button memory-sequence-button"
                :class="{ disabled: startButtonDisabled }"
                v-on="startButtonDisabled ? {} : { click: showSequence }"
              >
                <p>{{ memorySequenceButtonText }}</p>
              </div>
              <div class="level-div">level: {{ numberOfShownTiles - 2 }}</div>
            </div>

            <div class="memory-sequence-div">
              <div
                v-for="tile in tilesArray"
                :key="tile.id"
                class="memory-sequence-tile-div"
              >
                <div
                  class="memory-sequence-tile"
                  :class="{
                    enabled: tile.enabled,
                    shown: tile.shown,
                    wrong: tile.wrongTile,
                  }"
                  :key="tile.shown"
                  v-on="tile.enabled ? { click: () => tileClicked(tile) } : {}"
                >
                  {{ tile.number }}
                </div>
              </div>
              <transition name="countdown-transition">
                <div v-show="countdownStarted" class="countdown-div">
                  {{ countdownNumber }}
                </div>
              </transition>
              <transition name="level-completed-transition">
                <div v-show="levelCompleted" class="level-completed-div">
                  <i class="fas fa-check"></i>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="py-3 py-xl-5">
      <div class="container-xl">
        <div class="memory-sequence-instructions-header">How to play</div>
        <div class="memory-sequence-instructions-text">
          First select game mode. You have to choose between memorizing pattern
          with specified order or without it. Then decide for how long the
          sequence will be visible to memorize it by moving slider. If
          everything is fine, press the BEGIN buttn on start the game.
        </div>
      </div>
    </div>
    <transition name="transition-fade">
      <div v-if="gameLost" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">Oopss, you've lost!</div>
            <div class="modal-body ">
              You've beaten {{ numberOfShownTiles - 3 }} out of 13 levels.
            </div>
            <div class="modal-footer">
              <div class="button" @click="pageReload">
                <p>close</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="transition-fade">
      <div v-if="gameFinished" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">Congratulations, you've won!</div>
            <div class="modal-body ">
              Good job! You've passed all 13 levels.
            </div>
            <div class="modal-footer">
              <div class="button">
                <p>close</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MemorySequence",
  data() {
    return {
      gameMode: "",
      sequenceDisplayTime: 0.1,
      sliderMin: 0.1,
      sliderMax: 2,
      sliderStep: 0.1,
      showMenu: true,
      gameModeNotSelectedError: false,
      tilesArray: [],
      memorySequenceHeader: "Press START button to show sequence",
      memorySequenceButtonText: "Start",
      numberOfShownTiles: 3,
      countdownStarted: false,
      countdownNumber: "",
      startButtonDisabled: false,
      numberOfTilesClicked: 0,
      levelCompleted: false,
      gameFinished: false,
      gameLost: false,
      currentTileNumber: 0,
    };
  },
  methods: {
    setOptions() {
      if (this.gameMode == "") {
        this.gameModeNotSelectedError = true;
      } else {
        this.showMenu = false;
        this.gameModeNotSelectedError = false;
        this.setGameBoard();
      }
    },
    setGameBoard() {
      for (let i = 0; i < 25; i++) {
        let element = {
          id: i,
          shown: false,
          number: "",
          inPattern: false,
          wrongTile: false,
          enabled: false,
        };
        this.tilesArray.push(element);
      }
    },
    showSequence() {
      this.startButtonDisabled = true;
      this.countdownStarted = true;
      this.countdownNumber = 3;
      setTimeout(() => {
        this.countdownStarted = false;
      }, 500);
      setTimeout(() => {
        this.countdownStarted = true;
        this.countdownNumber = 2;
      }, 1000);
      setTimeout(() => {
        this.countdownStarted = false;
      }, 1500);
      setTimeout(() => {
        this.countdownStarted = true;
        this.countdownNumber = 1;
      }, 2000);
      setTimeout(() => {
        this.countdownStarted = false;
      }, 2500);
      setTimeout(() => {
        for (let i = 0; i < this.numberOfShownTiles; i++) {
          do {
            var index = Math.floor(Math.random() * this.tilesArray.length);
            console.log(index, this.tilesArray[index].shown);
          } while (this.tilesArray[index].shown == true);
          this.tilesArray[index].shown = true;
          this.tilesArray[index].inPattern = true;
          if (this.gameMode == "inOrder") {
            this.tilesArray[index].number = i + 1;
          }
        }
      }, 3000);

      setTimeout(() => {
        this.tilesArray.forEach((tile) => {
          tile.shown = false;
          tile.enabled = true;
        });
      }, 3000 + this.sequenceDisplayTime * 1000);
    },
    tileClicked(tile) {
      tile.enabled = false;
      tile.shown = true;
      this.numberOfTilesClicked++;
      if (!tile.inPattern) {
        tile.wrongTile = true;
        this.tilesArray.forEach((tile) => {
          tile.enabled = false;
        });
        setTimeout(() => {
          this.gameLost = true;
        }, 300);
        return 0;
      }
      if (this.gameMode == "inOrder") {
        this.currentTileNumber += 1;
        if (tile.number != this.currentTileNumber) {
          tile.wrongTile = true;
          this.tilesArray.forEach((tile) => {
            tile.enabled = false;
          });
          setTimeout(() => {
            this.gameLost = true;
          }, 300);
          return 0;
        }
      }
      if (this.numberOfTilesClicked == this.numberOfShownTiles) {
        this.levelCompleted = true;
        this.currentTileNumber = 0;
        this.numberOfTilesClicked = 0;
        this.startButtonDisabled = false;
        setTimeout(() => {
          this.levelCompleted = false;
          if (this.numberOfShownTiles > 15) {
            this.gameFinished = true;
          }
          this.tilesArray.forEach((tile) => {
            tile.shown = false;
            tile.number = "";
            tile.enabled = false;
            tile.inPattern = false;
          });
          this.memorySequenceHeader = "Press START button to show sequence";
          this.numberOfShownTiles++;
        }, 1000);
      }
    },
    pageReload() {
      this.gameMode = "";
      this.tilesArray = [];
      this.showMenu = true;
      this.memorySequenceHeader = "Press START button to show sequence";
      this.memorySequenceButtonText = "Start";
      this.numberOfShownTiles = 3;
      this.numberOfTilesClicked = 0;
      this.currentTileNumber = 0;
      this.sequenceDisplayTime = 0.1;
      this.gameLost = false;
      this.startButtonDisabled = false;
    },
  },
  computed: {
    gameDetails: function() {
      return this.$store.state.games[4];
    },
  },
  watch: {
    sequenceDisplayTime: function() {
      var sliderWidth = document.getElementById("sequenceTimeSlider")
        .offsetWidth;
      var sliderValuePosition =
        (this.sequenceDisplayTime / this.sliderMin - 1) *
        ((this.sliderMin * sliderWidth) / this.sliderMax);
      document.getElementById("sequenceTimeSliderValue").style.left =
        sliderValuePosition + "px";
    },
  },
};
</script>

<style lang="scss">
.memory-sequence-instructions-header,
.memory-sequence-name {
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  margin-top: -20px;
  letter-spacing: 5px;
}
.memory-sequence-menu,
.memory-sequence {
  background-color: $primaryGreen;
  background-blend-mode: darken;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.5),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.5);
  background-position-y: 55%;
}
.memory-sequence-header,
.game-mode-header,
.sequence-time-header {
  display: flex;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  background: rgba($primaryGrey, 0.6);
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 5px;
  padding: 10px 20px;
  overflow: hidden;
}
.memory-sequence-header-transition {
  &-enter {
    transform: translateY(-110%);
  }
  &-leave-to {
    transform: translateY(-110%);
  }
  &-enter-active {
    transition: all 0.3s;
  }
  &-leave-active {
    transition: all 0.3s;
  }
}
.memory-sequence-instructions-text,
.memory-sequence-description {
  color: $primaryGreen;
  font-size: 22px;
  font-weight: 100;
}
.game-mode-input {
  display: none;
  &:checked + .game-mode-label {
    background: $primaryGreen !important;
    color: $primaryGrey !important;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
}
.game-mode-label {
  margin-bottom: 0;
  display: inline-block;
  width: 49%;
  background: $primaryGrey;
  color: $primaryGreen;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    background: rgba($primaryGrey, 0.6);
  }
  &.error {
    background: rgba(rgb(255, 60, 60), 0.6);
    color: rgb(130, 0, 0);
    &:hover {
      background: rgba($primaryGrey, 0.6);
      color: $primaryGreen;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }
  }
}
.game-mode-label-text {
  @include flex-center;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 100;
  padding: 2% 5%;
}

.sequence-time-slider {
  appearance: none;
  width: 100%;
  height: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  outline: none;
  background: $primaryGrey;
  z-index: 4;
  &:hover {
    & + .sequence-time-slider-value {
      transform: scale(1.5);
      top: 160%;
      opacity: 1;
    }
  }
  &::-webkit-slider-thumb {
    appearance: none;
    position: relative;
    top: 0;
    cursor: pointer;
    width: 5%;
    height: 40px;
    background: $primaryGreen;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
  }
}
.sequence-time-slider-value {
  @include flex-center;
  top: 0;
  position: absolute;
  transform: scale(0.9);
  width: 5%;
  height: 40px;
  background: $primaryGreen;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  color: $primaryGrey;
  font-size: 20px;
  font-weight: 100;
  letter-spacing: 3px;
  opacity: 0;
  transition: all 0.2s ease-in-out, left 0.5s cubic-bezier(0.4, 0.07, 0, 1.4);
  z-index: 3;
}
.memory-sequence-button {
  height: 75px;
  width: 225px;
  font-size: 25px;
  font-weight: 100;
  background: rgba($primaryGreen, 0.8);
  letter-spacing: 10px;
  padding-left: 5px;
  color: $primaryGrey;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  &.disabled {
    cursor: default;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    background: rgba(180, 180, 180, 0.4);
    color: rgba(160, 160, 160, 0.4);
    border-color: rgba(160, 160, 160, 0.4);
    &:hover {
      &::after {
        opacity: 0;
      }
    }
  }
}
.memory-sequence-div {
  padding: 0% 15%;
  position: relative;
}
.level-div {
  @include flex-center;
  font-size: 40px;
  font-weight: 1000;
  letter-spacing: 10px;
  color: $primaryGrey;
  text-shadow: 5px 5px rgba($primaryGreen, 1);
  text-transform: uppercase;
  padding-left: 20px;
}
.countdown-div {
  @include flex-center;
  position: absolute;
  width: 70%;
  height: calc(100% - 10px);
  left: 15%;
  top: 5px;
  background: rgba(255, 60, 60, 0.3);
  color: rgb(130, 0, 0);
  font-size: 100px;
  font-weight: 1000;
}
.countdown-transition {
  &-enter {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.5s ease-in-out;
  }
  &-leave-active {
    transition: all 0.5s ease-in-out;
  }
}
.level-completed-div {
  @include flex-center;
  position: absolute;
  width: 70%;
  height: calc(100% - 10px);
  left: 15%;
  top: 5px;
  background: rgba(60, 255, 60, 0.2);
  color: rgba(0, 130, 0, 0.8);
  font-size: 200px;
  font-weight: 1000;
}
.level-completed-transition {
  &-enter {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.4s ease-in-out;
  }
  &-leave-active {
    transition: all 0.4s ease-in-out;
  }
}

.memory-sequence-tile-div {
  position: relative;
  display: inline-block;
  width: 19%;
  padding-bottom: 19%;
  margin-right: calc(5% / 4);
  margin-top: calc((5% / 4) - 5px);
  &:nth-child(5n) {
    margin-right: 0;
  }
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    margin-top: 0;
  }
}
.memory-sequence-tile {
  @include flex-center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  background: rgba($primaryGrey, 0.6);
  font-size: 80px;
  font-weight: 800;
  color: transparent;
  transition: all 0.2s ease-in-out;
  &.shown {
    background: rgba($primaryGrey, 1);
    color: $primaryGreen;
    &.wrong {
      animation: vibrate 0.3s linear both;
      &::after {
        content: "";
        @include flex-center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(rgb(255, 60, 60), 0.3);
      }
    }
  }
  &.enabled {
    background: rgba($primaryGrey, 0.6);
    color: transparent;
    cursor: pointer;

    &:hover {
      background: rgba($primaryGreen, 0.8);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }
    &.shown {
      background: rgba($primaryGrey, 1);
      color: $primaryGreen;
    }
  }
}
@keyframes vibrate {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-3px, 3px);
    transform: translate(-3px, 3px);
  }
  40% {
    -webkit-transform: translate(-3px, -3px);
    transform: translate(-3px, -3px);
  }
  60% {
    -webkit-transform: translate(3px, 3px);
    transform: translate(3px, 3px);
  }
  80% {
    -webkit-transform: translate(3px, -3px);
    transform: translate(3px, -3px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}

@media (max-width: 1200px) {
  .memory-sequence-instructions-header,
  .memory-sequence-name {
    margin-top: -10px;
  }
}
@media (max-width: 992px) {
  .sequence-time-slider-value {
    height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
  }
  .memory-sequence-div {
    padding: 0% 10%;
  }
  .countdown-div {
    width: 80%;
    left: 10%;
  }
  .level-completed-div {
    width: 80%;
    left: 10%;
  }
}
@media (max-width: 768px) {
  .game-mode-header,
  .sequence-time-header,
  .memory-sequence-header {
    font-size: 25px;
  }
  .game-mode-label-text {
    @include flex-center;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 100;
    padding: 2% 5%;
  }
  .memory-sequence-button {
    height: 50px;
    width: 150px;
    letter-spacing: 5px;
  }
  .level-div {
    font-size: 30px;
    letter-spacing: 5px;
  }
  .sequence-time-slider-value {
    height: 30px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .memory-sequence-div {
    padding: 0% 5%;
  }
  .countdown-div {
    width: 90%;
    left: 5%;
  }
  .level-completed-div {
    width: 90%;
    left: 5%;
  }
}
@media (max-width: 576px) {
  .memory-sequence-instructions-header,
  .memory-sequence-name {
    font-size: 30px;
    margin-top: -5px;
  }
  .memory-sequence-instructions-text,
  .memory-sequence-description {
    font-size: 16px;
  }
  .sequence-time-slider-value {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .memory-sequence-div {
    padding: 0% 0%;
  }
  .countdown-div {
    width: 100%;
    left: 0%;
  }
  .level-completed-div {
    width: 100%;
    left: 0%;
  }
}
@media (max-width: 400px) {
  .sequence-time-slider-value {
    font-size: 11px;
    letter-spacing: 1px;
  }
  .level-div {
    font-size: 25px;
    letter-spacing: 4px;
  }
}
</style>
