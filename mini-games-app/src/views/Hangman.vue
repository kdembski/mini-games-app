<template>
  <div>
    <div class="hangman-header py-3 py-xl-5">
      <div class="container-xl">
        <div class="hangman-name">{{ gameDetails.name }}</div>
        <div class="hangman-description">
          {{ gameDetails.description }}
        </div>
      </div>
    </div>
    <div
      class="hangman py-3 py-xl-5"
      :style="{
        backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
      }"
    >
      <div class="container-xl">
        <transition-group
          name="hangman-letter-list-transition"
          class="hangman-word"
          :class="{ 'game-won': gameWon }"
        >
          <div
            v-for="(letter, index) in lettersArray"
            :key="index"
            class="hangman-letter-container"
          >
            <div class="hangman-letter-div" :class="{ 'game-won': gameWon }">
              <transition name="hangman-letter-transition">
                <div
                  class="hangman-letter"
                  :class="{
                    hidden: letter.isHidden,
                    correct: letter.isCorrect,
                  }"
                  :key="letter.isHidden"
                >
                  {{ letter.letter }}
                </div>
              </transition>
            </div>
          </div>
        </transition-group>

        <div class="row pt-3 pt-xl-5">
          <div class="col-xl-8 p-0 d-flex align-items-center">
            <div class="hangman-keyboard">
              <div class="row d-flex justify-content-center">
                <div
                  v-for="index in 10"
                  :key="index"
                  class="hangman-keyboard-key"
                  :class="keyboard[index - 1].isPressed ? 'pressed' : ''"
                  @click="keyPressed(keyboard[index - 1])"
                >
                  {{ keyboard[index - 1].letter }}
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div
                  v-for="index in 9"
                  :key="index"
                  class="hangman-keyboard-key"
                  :class="keyboard[10 + index - 1].isPressed ? 'pressed' : ''"
                  @click="keyPressed(keyboard[10 + index - 1])"
                >
                  {{ keyboard[10 + index - 1].letter }}
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div
                  v-for="index in 7"
                  :key="index"
                  class="hangman-keyboard-key"
                  :class="keyboard[19 + index - 1].isPressed ? 'pressed' : ''"
                  @click="keyPressed(keyboard[19 + index - 1])"
                >
                  {{ keyboard[19 + index - 1].letter }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-xl-4 p-0 d-flex align-items-center justify-content-center pl-0 pl-xl-4 pt-3 pt-xl-0"
          >
            <div class="hangman-figure swing">
              <div v-for="index in 12" :key="index">
                <div
                  :class="'hangman-figure-element e' + index"
                  :style="
                    missesCounter > index - 1 ? 'opacity: 1' : 'opacity:0'
                  "
                  :key="index"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hangman-instructions py-3 py-xl-5">
      <div class="container-xl">
        <div class="hangman-instructions-div">
          <div class="hangman-instructions-header ">How to play</div>
          <div class="hangman-instructions-text ">
            Choose letter you want to guess by clicking it on keyboard displayed
            above. To win you need to find all of word's letters. Be careful
            cause with every wrong guess one part of hangman will appear. If the
            hangman will be fully completed you'll lose.
          </div>
        </div>
      </div>
    </div>
    <transition name="hangman-transition-game-won-modal">
      <div v-if="gameWon" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">Congratulations, you've won!</div>
            <div class="modal-body ">
              You've guessed the whole word. Good job!
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
    <transition name="hangman-transition-game-lost-modal">
      <div v-if="gameLost" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">Upss, you've lost!</div>
            <div class="modal-body ">
              You are hanging on a rope. The word that beat you was:
              <br />
              <p style="font-size:40px; font-weight: 300">
                {{ randomWord }}
              </p>
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
  name: "Hangman",
  data() {
    return {
      wordsList: require("word-list-json"),
      randomWord: "",
      lettersArray: [],
      keyboard: [
        { letter: "q", isPressed: false },
        { letter: "w", isPressed: false },
        { letter: "e", isPressed: false },
        { letter: "r", isPressed: false },
        { letter: "t", isPressed: false },
        { letter: "y", isPressed: false },
        { letter: "u", isPressed: false },
        { letter: "i", isPressed: false },
        { letter: "o", isPressed: false },
        { letter: "p", isPressed: false },
        { letter: "a", isPressed: false },
        { letter: "s", isPressed: false },
        { letter: "d", isPressed: false },
        { letter: "f", isPressed: false },
        { letter: "g", isPressed: false },
        { letter: "h", isPressed: false },
        { letter: "j", isPressed: false },
        { letter: "k", isPressed: false },
        { letter: "l", isPressed: false },
        { letter: "z", isPressed: false },
        { letter: "x", isPressed: false },
        { letter: "c", isPressed: false },
        { letter: "v", isPressed: false },
        { letter: "b", isPressed: false },
        { letter: "n", isPressed: false },
        { letter: "m", isPressed: false },
      ],
      missesCounter: 0,
      gameWon: false,
      gameLost: false,
    };
  },
  created() {
    this.getRandomWord();
  },
  methods: {
    getRandomWord() {
      do {
        var index = Math.floor(Math.random() * this.wordsList.length);
      } while (
        this.wordsList[index].length < 7 ||
        this.wordsList[index].length > 15
      );
      var randomWord = this.wordsList[index];
      this.randomWord = randomWord;
      for (let i = 0; i < randomWord.length; i++) {
        this.lettersArray.push({
          letter: randomWord[i],
          isHidden: true,
          isCorrect: false,
        });
      }
    },
    keyPressed(key) {
      if (!key.isPressed) {
        key.isPressed = true;
        var missed = true;
        this.lettersArray.forEach((letter) => {
          if (letter.letter === key.letter) {
            letter.isCorrect = true;
            missed = false;
            setTimeout(() => {
              letter.isCorrect = false;
              letter.isHidden = false;
              this.winCondition();
            }, 500);
          }
        });
        if (missed) {
          this.missesCounter++;
        }
        this.winCondition();
      }
    },
    winCondition() {
      if (
        this.lettersArray.every((letter) => {
          return letter.isHidden == false;
        })
      ) {
        this.gameWon = true;
        this.keyboard.forEach((key) => {
          key.isPressed = true;
        });
      }
      if (this.missesCounter >= 12) {
        this.gameLost = true;
        this.keyboard.forEach((key) => {
          key.isPressed = true;
        });
      }
    },
    pageReload() {
      this.gameWon = false;
      this.gameLost = false;
      this.missesCounter = 0;
      this.lettersArray.length = 0;
      this.keyboard.forEach((key) => {
        key.isPressed = false;
      });
      this.getRandomWord();
    },
  },
  computed: {
    gameDetails: function() {
      return this.$store.state.games[2];
    },
  },
};
</script>

<style lang="scss">
.hangman-instructions-header,
.hangman-name {
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  margin-top: -20px;
  letter-spacing: 5px;
}
.hangman {
  background-color: $primaryGreen;
  background-blend-mode: multiply;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.8),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.8);
  background-position-y: 55%;
}
.hangman-instructions-text,
.hangman-description {
  color: $primaryGreen;
  font-size: 22px;
  font-weight: 100;
}
.hangman-word {
  position: relative;
  display: flex;
  justify-content: center;
  &.game-won {
    @for $i from 1 to 15 {
      & .hangman-letter-container:nth-child(#{$i}) {
        animation: hangman-letter-animation 0.8s ease-in-out;
        animation-delay: $i * 0.08s;
      }
    }
  }
}
@keyframes hangman-letter-animation {
  50% {
    transform: translateY(-40px);
  }
}
.hangman-letter-container {
  position: relative;
  max-width: 100px;
  margin: 0px 10px;
}
.hangman-letter-div {
  position: relative;
  height: 150px;
  width: 100px;
  perspective: 500px;
}
.hangman-letter {
  @include flex-center;
  width: 100%;
  height: 100%;
  background: $primaryGrey;
  color: $primaryGreen;
  font-size: 130px;
  font-weight: 1000;
  text-transform: uppercase;
  user-select: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
  &.hidden {
    color: $primaryGrey;
  }
  &.correct {
    background-color: $primaryGreen;
    color: $primaryGreen;
  }
}
.hangman-letter-list-transition {
  &-enter {
    opacity: 0;
    max-width: 0;
    margin: 0;
  }
  &-leave-to {
    opacity: 0;
    max-width: 0;
    margin: 0;
  }
  &-enter-active {
    transition: all 0.3s 0.6s ease-in-out;
  }
  &-leave-active {
    transition: all 0.3s 0.6s ease-in-out;
  }
}
.hangman-letter-transition {
  &-enter {
    transform: rotateY(-90deg);
  }
  &-leave-to {
    transform: rotateY(90deg);
  }
  &-enter-active {
    position: absolute;
    transition: transform 0.3s 0.3s cubic-bezier(0.2, 0.4, 0.6, 0.8);
  }
  &-leave-active {
    position: absolute;
    transition: transform 0.3s cubic-bezier(0.4, 0.2, 0.8, 0.6);
  }
}
.hangman-keyboard {
  background: rgba($primaryGrey, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 5px;
  width: 100%;
}
.hangman-keyboard-key {
  @include flex-center;
  height: 62px;
  width: 62px;
  margin: 4px;
  background: $primaryGrey;
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  user-select: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba($primaryGreen, 0.3);
  }
  &:active {
    transform: scale(0.8);
  }
  &.pressed {
    background: rgb(160, 160, 160);
    color: rgb(140, 140, 140);
    &:active {
      transform: scale(1);
    }
  }
}

$hangman-figure-transition-duration: 3s;

.hangman-figure {
  position: relative;
  height: 450px;
  width: 346px;
  background: rgba($primaryGrey, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  &.swing {
    & .hangman-figure-element {
      &.e6 {
        animation: animation-e6 $hangman-figure-transition-duration infinite;
      }
      &.e7 {
        animation: animation-e7 $hangman-figure-transition-duration infinite;
      }
      &.e8 {
        animation: animation-e8 $hangman-figure-transition-duration infinite;
      }
      &.e9 {
        animation: animation-e9 $hangman-figure-transition-duration infinite;
      }
      &.e10 {
        animation: animation-e10 $hangman-figure-transition-duration infinite;
      }
      &.e11 {
        animation: animation-e11 $hangman-figure-transition-duration infinite;
      }
      &.e12 {
        animation: animation-e12 $hangman-figure-transition-duration infinite;
      }
    }
  }
}
.hangman-figure-element {
  position: absolute;
  background: $primaryGrey;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  animation-timing-function: linear;
  transition: opacity 0.2s ease-in-out;
  &.e1 {
    top: 30px;
    left: 80px;
    height: 410px;
    width: 20px;
    z-index: 1;
    transform-origin: bottom;
  }
  &.e2 {
    bottom: 0;
    left: 45px;
    width: 20px;
    height: 105px;
    transform: rotate(45deg);
    z-index: 0;
  }
  &.e3 {
    bottom: 0;
    left: 115px;
    width: 20px;
    height: 105px;
    transform: rotate(-45deg);
    z-index: 0;
  }
  &.e4 {
    top: 20px;
    left: 60px;
    width: 250px;
    height: 20px;
    z-index: 2;
  }
  &.e5 {
    top: -5px;
    left: 110px;
    width: 20px;
    height: 140px;
    transform: rotate(45deg);
    z-index: 3;
  }
  &.e6 {
    top: 35px;
    right: 70px;
    width: 10px;
    height: 60px;
    z-index: 0;
    transform-origin: top;
    border-radius: 10px;
  }
  &.e7 {
    top: 80px;
    right: 45px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    z-index: 3;
  }
  &.e8 {
    top: 110px;
    right: 67.5px;
    width: 15px;
    height: 120px;
    z-index: 2;
    transform-origin: top;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  }
  &.e9 {
    top: 135px;
    right: 73px;
    width: 10px;
    height: 90px;
    z-index: 0;
    transform: rotate(10deg);
    transform-origin: top;
  }
  &.e10 {
    top: 135px;
    right: 67px;
    width: 10px;
    height: 90px;
    z-index: 0;
    transform: rotate(-10deg);
    transform-origin: top;
  }
  &.e11 {
    top: 230px;
    right: 67px;
    width: 10px;
    height: 100px;
    z-index: 0;
    transform: rotate(-5deg);
    transform-origin: top;
  }
  &.e12 {
    top: 230px;
    right: 73px;
    width: 10px;
    height: 100px;
    z-index: 0;
    transform: rotate(5deg);
    transform-origin: top;
  }
}
@keyframes animation-e6 {
  0% {
    transform: rotate(4deg);
  }
  50% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(4deg);
  }
}
@keyframes animation-e7 {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-5px);
  }
}
@keyframes animation-e8 {
  0% {
    transform: translateX(-5px) rotate(4deg);
  }
  50% {
    transform: translateX(5px) rotate(-4deg);
  }
  100% {
    transform: translateX(-5px) rotate(4deg);
  }
}
@keyframes animation-e9 {
  0% {
    transform: translateX(-7px) rotate(13deg);
  }
  50% {
    transform: translateX(7px) rotate(7deg);
  }
  100% {
    transform: translateX(-7px) rotate(13deg);
  }
}
@keyframes animation-e10 {
  0% {
    transform: translateX(-7px) rotate(-7deg);
  }
  50% {
    transform: translateX(7px) rotate(-13deg);
  }
  100% {
    transform: translateX(-7px) rotate(-7deg);
  }
}
@keyframes animation-e11 {
  0% {
    transform: translateX(-13px) rotate(3deg);
  }
  50% {
    transform: translateX(13px) rotate(-13deg);
  }
  100% {
    transform: translateX(-13px) rotate(3deg);
  }
}
@keyframes animation-e12 {
  0% {
    transform: translateX(-13px) rotate(13deg);
  }
  50% {
    transform: translateX(13px) rotate(-3deg);
  }
  100% {
    transform: translateX(-13px) rotate(13deg);
  }
}
.hangman-transition-game-won-modal {
  &-enter {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.2s 2s ease-in-out;
  }
  &-leave-active {
    transition: all 0.2s ease-in-out;
  }
}
.hangman-transition-game-lost-modal {
  &-enter {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.2s 0.6s ease-in-out;
  }
  &-leave-active {
    transition: all 0.2s ease-in-out;
  }
}

@media (max-width: 1850px) {
  .hangman-letter-container {
    max-width: 80px;
    margin: 0px 8px;
  }
  .hangman-letter-div {
    height: 120px;
    width: 80px;
    perspective: 400px;
  }
  .hangman-letter {
    font-size: 100px;
    font-weight: 1000;
  }
}
@media (max-width: 1500px) {
  .hangman-letter-container {
    max-width: 60px;
    margin: 0px 6px;
  }
  .hangman-letter-div {
    height: 90px;
    width: 60px;
    perspective: 300px;
  }
  .hangman-letter {
    font-size: 70px;
    font-weight: 1000;
  }
}
@media (max-width: 1200px) {
  .hangman-instructions-header,
  .hangman-name {
    margin-top: -10px;
  }
  .hangman-letter-container {
    max-width: 40px;
    margin: 0px 4px;
  }
  .hangman-letter-div {
    height: 60px;
    width: 40px;
    perspective: 200px;
  }
  .hangman-letter {
    font-size: 40px;
    font-weight: 1000;
  }
}
@media (max-width: 992px) {
}
@media (max-width: 768px) {
  .hangman-letter-container {
    max-width: 30px;
    margin: 0px 2px;
  }
  .hangman-letter-div {
    height: 45px;
    width: 30px;
    perspective: 100px;
  }
  .hangman-letter {
    font-size: 30px;
    font-weight: 800;
  }
  .hangman-keyboard-key {
    height: 45px;
    width: 45px;
    margin: 3px;
    font-size: 35px;
  }
}
@media (max-width: 576px) {
  .hangman-instructions-header,
  .hangman-name {
    font-size: 30px;
    margin-top: -5px;
  }
  .hangman-instructions-text,
  .hangman-description {
    font-size: 16px;
  }
  .hangman-letter-container {
    max-width: 24px;
    margin: 0px 2px;
  }
  .hangman-letter-div {
    height: 36px;
    width: 24px;
    perspective: 100px;
  }
  .hangman-letter {
    font-size: 25px;
    font-weight: 600;
  }
  .hangman-keyboard-key {
    height: 35px;
    width: 35px;
    margin: 3px;
    font-size: 25px;
    font-weight: 800;
  }
}
@media (max-width: 450px) {
  .hangman-letter-container {
    max-width: 20px;
    margin: 0px 2px;
  }
  .hangman-letter-div {
    height: 24px;
    width: 15px;
    perspective: 100px;
  }
  .hangman-letter {
    font-size: 20px;
  }
  .hangman-keyboard-key {
    height: 24px;
    width: 24px;
    margin: 2px;
    font-size: 20px;
    font-weight: 600;
  }
  .hangman-figure {
    transform: scale(0.9);
  }
  .hangman-figure-element.e4 {
    width: 200px;
  }
}
</style>
