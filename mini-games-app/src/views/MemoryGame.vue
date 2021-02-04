<template>
  <div>
    <div class="memory-game-header py-3 py-xl-5">
      <div class="container-xl">
        <div class="memory-game-name">{{ gameDetails.name }}</div>
        <div class="memory-game-description">
          {{ gameDetails.description }}
        </div>
      </div>
    </div>

    <transition name="transition-slide-down" mode="out-in">
      <div v-if="!cardsNumberSelected" key="selectNumber">
        <div
          class="memory-game-select-number py-3 py-xl-5"
          :style="{
            backgroundImage:
              'url(' + require('../assets/memory_game/background.jpg') + ')',
          }"
        >
          <div class="container-xl">
            <div class="memory-game-select-number-div">
              <div class="memory-game-number" @click="selectCardsNumber(12)">
                12
              </div>
              <div class="memory-game-number" @click="selectCardsNumber(16)">
                16
              </div>
              <div class="memory-game-number" @click="selectCardsNumber(20)">
                20
              </div>
            </div>
          </div>
        </div>
        <div class="memory-game-instructions py-3 py-xl-5">
          <div class="container-xl">
            <div class="memory-game-instructions-div">
              <div class="memory-game-instructions-header ">How to play</div>
              <div class="memory-game-instructions-text ">
                Pick number of cards you want to play with from rectangles
                displayed above. Set of cards face down will appear. To flip a
                card just click on it. If you flip two cards in a row with the
                same symbol on it, you will get a match and that pair of cards
                will disappear. To finish the game you have to find all pairs.
                Goodluck!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else key="memoryGame" mode="out-in">
        <div
          class="memory-game py-3 py-xl-5"
          :style="{
            backgroundImage:
              'url(' + require('../assets/memory_game/background.jpg') + ')',
          }"
        >
          <div class="container-xl">
            <div class="memory-game-div">
              <div
                v-for="card in cardsArray"
                :key="card.id"
                class="memory-game-card-div"
                @click="flipCard(card)"
              >
                <transition
                  :name="
                    card.paired
                      ? 'memory-game-card-transition-hide'
                      : 'memory-game-card-transition-flip'
                  "
                >
                  <div
                    v-if="!card.flipped"
                    key="back"
                    class="memory-game-card back"
                  >
                    <div
                      class="w-100 h-100 d-flex justify-content-center align-items-center"
                    >
                      <i class="fas fa-question memory-game-card-icon back"></i>
                    </div>
                  </div>

                  <div
                    v-else
                    :key="'front' + card.paired"
                    class="memory-game-card front"
                    :class="card.paired ? 'paired' : ''"
                  >
                    <div
                      class="w-100 h-100 d-flex justify-content-center align-items-center"
                    >
                      <i
                        class="fas memory-game-card-icon front"
                        :class="iconsArray[card.pairId]"
                      ></i>
                    </div>
                  </div>
                </transition>
                <transition name="match-transition-fade">
                  <div v-show="card.correctMatch" class="correct-match-div">
                    <i class="fas fa-check"></i>
                  </div>
                </transition>
                <transition name="match-transition-fade">
                  <div v-show="card.errorMatch" class="error-match-div">
                    <i class="fas fa-times"></i>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div class="memory-game-instructions py-3 py-xl-5">
          <div class="container-xl"></div>
        </div>
      </div>
    </transition>

    <transition name="transition-fade">
      <div v-if="gameFinished" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">Congratulations, you've done it!</div>
            <div class="modal-body ">
              You've found all pairs.
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
  </div>
</template>

<script>
export default {
  name: "MemoryGame",
  data() {
    return {
      cardsNumberSelected: false,
      cardsNumber: "",
      cardsArray: [],
      iconsArray: [
        "fa-star",
        "fa-cheese",
        "fa-cookie",
        "fa-dice-six",
        "fa-dragon",
        "fa-hamburger",
        "fa-hippo",
        "fa-moon",
        "fa-rocket",
        "fa-skull",
      ],
      flippedCard: "",
      cardIsFlipped: false,
      gameFinished: false,
    };
  },

  methods: {
    selectCardsNumber(number) {
      this.cardsNumber = number;
      this.cardsNumberSelected = true;
      this.setCardsArray(number);
    },
    setCardsArray(length) {
      for (let i = 0; i < length; i += 2) {
        var card1 = {
          id: i,
          pairId: i / 2,
          flipped: false,
          paired: false,
          correctMatch: false,
          errorMatch: false,
        };
        var card2 = {
          id: i + 1,
          pairId: i / 2,
          flipped: false,
          paired: false,
          correctMatch: false,
          errorMatch: false,
        };
        this.cardsArray.push(card1, card2);
      }
      this.randomizeCardsArray();
    },
    flipCard(card) {
      if (!card.paired && !this.cardIsFlipped) {
        this.cardIsFlipped = true;
        card.flipped = true;
        if (this.flippedCard == "") {
          this.flippedCard = card;
          this.cardIsFlipped = false;
        } else {
          if (this.flippedCard.id == card.id) {
            this.cardIsFlipped = false;
          } else {
            setTimeout(() => {
              if (this.flippedCard.pairId == card.pairId) {
                this.flippedCard.correctMatch = true;
                card.correctMatch = true;
              } else {
                this.flippedCard.errorMatch = true;
                card.errorMatch = true;
              }
            }, 800);
            setTimeout(() => {
              this.flippedCard.correctMatch = false;
              card.correctMatch = false;
              this.flippedCard.errorMatch = false;
              card.errorMatch = false;
            }, 1400);
            setTimeout(() => {
              if (this.flippedCard.pairId == card.pairId) {
                this.flippedCard.paired = true;
                card.paired = true;
                this.flippedCard = "";
              } else {
                this.flippedCard.flipped = false;
                card.flipped = false;
                this.flippedCard = "";
              }
              this.cardIsFlipped = false;
              this.winCondition();
            }, 1600);
          }
        }
      }
    },
    randomizeCardsArray() {
      for (var i = this.cardsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cardsArray[i];
        this.cardsArray[i] = this.cardsArray[j];
        this.cardsArray[j] = temp;
      }
      this.$forceUpdate;
    },
    pageReload() {
      this.cardsNumberSelected = false;
      this.cardsNumber = "";
      this.cardsArray = [];
      this.flippedCard = "";
      this.cardIsFlipped = false;
      this.gameFinished = false;
    },
    winCondition() {
      this.gameFinished = this.cardsArray.every((card) => {
        return card.paired == true;
      });
    },
  },
  computed: {
    gameDetails: function() {
      return this.$store.state.games[1];
    },
  },
};
</script>

<style lang="scss">
.memory-game-instructions-header,
.memory-game-name {
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  margin-top: -20px;
  letter-spacing: 5px;
}
.memory-game,
.memory-game-select-number {
  background-color: $primaryGreen;
  background-blend-mode: multiply;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.8),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.8);
  background-position-y: 55%;
}
.memory-game-instructions-text,
.memory-game-description {
  color: $primaryGreen;
  font-size: 22px;
  font-weight: 100;
}
.memory-game-select-number-div {
  display: flex;
  justify-content: space-between;
}
.memory-game-number {
  @include flex-center;
  position: relative;
  height: 400px;
  width: calc((100% / 3) - 20px);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  transition: all 0.15s ease-in-out;
  background: $primaryGrey;
  color: $primaryGreen;
  font-size: 60px;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    background: rgba($primaryGrey, 0.8);
  }
}
.memory-game-div {
  padding: 0% 15%;
}

.memory-game-card-div {
  position: relative;
  display: inline-block;
  width: calc((100% / 4) - 2%);
  height: 180px;
  margin: 1% 1%;
  perspective: 800px;
}
.memory-game-card {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.back {
    background-color: $primaryGrey;
  }
  &.front {
    background-color: $primaryGreen;
    pointer-events: none;
    &:hover {
      opacity: 1;
    }
  }
  &.paired {
    opacity: 0;
    pointer-events: none;
  }
}

.memory-game-card-icon {
  font-size: 80px;
  &.back {
    color: $primaryGreen;
  }
  &.front {
    color: $primaryGrey;
  }
}

.error-match-div,
.correct-match-div {
  @include flex-center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  font-size: 120px;
  font-weight: 800;
}
.correct-match-div {
  background: rgba(rgb(0, 255, 0), 0.8);
  color: rgba(rgb(0, 100, 0), 0.8);
}
.error-match-div {
  background: rgba(red, 0.8);
  color: rgba(rgb(100, 0, 0), 0.8);
}
.memory-game-card-transition-flip {
  &-enter {
    transform: rotateY(90deg);
  }
  &-leave-to {
    transform: rotateY(-90deg);
  }
  &-enter-active {
    transition: all 0.6s 0.3s cubic-bezier(0.2, 0.4, 0.6, 0.8);
  }
  &-leave-active {
    position: absolute;
    transition: all 0.3s cubic-bezier(0.4, 0.2, 0.8, 0.6);
  }
}
.match-transition-fade {
  &-enter {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.3s ease-in-out;
  }
  &-leave-active {
    position: absolute;
    transition: all 0.3s ease-in-out;
  }
}
.memory-game-card-transition-hide {
  &-leave-to {
    opacity: 0;
    transform: rotateY(-90deg);
  }
  &-leave-active {
    position: absolute;
    transition: all 0.5s ease-in-out;
  }
}

@media (max-width: 1200px) {
  .memory-game-instructions-header,
  .memory-game-name {
    margin-top: -10px;
  }
  .memory-game-div {
    padding: 0% 10%;
  }
}
@media (max-width: 992px) {
  .memory-game-number {
    height: 300px;
  }
  .memory-game-div {
    padding: 5%;
  }
}
@media (max-width: 768px) {
  .memory-game-number {
    height: 200px;
  }
  .memory-game-div {
    padding: 0%;
  }
}
@media (max-width: 576px) {
  .memory-game-instructions-header,
  .memory-game-name {
    font-size: 30px;
    margin-top: -5px;
  }
  .memory-game-instructions-text,
  .memory-game-description {
    font-size: 16px;
  }
  .memory-game-number {
    height: 100px;
    font-size: 40px;
  }
  .memory-game-card-div {
    height: 150px;
  }
  .memory-game-card-icon {
    font-size: 50px;
  }
  .correct-match-div,
  .error-match-div {
    font-size: 60px;
  }
}
@media (max-width: 350px) {
  .memory-game-card-div {
    height: 120px;
  }
}
</style>
