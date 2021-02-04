import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [
      {
        name: "Image puzzles",
        description:
          "The rules of the game are simple. You need to swap image pieces in a way that it forms the correct image. The number of steps will be counted. So, you may wish to think and try to do it in minimum possible steps.",
        image: "image_puzzle/puzzle2.jpg",
        path: "/imagePuzzle",
      },
      {
        name: "Memory game",
        description:
          "You are given a set of cards containing images which are turned to the back, when you click on a card, it flips over and reveals the image. If you click on two images that are exactly the same, that is a win for you.",
        image: "memory_game/memory.jpg",
        path: "/memoryGame",
      },
      {
        name: "Hangman",
        description:
          "The word to guess is represented by a row of rectangles, representing each letter of the word. If the player suggests a letter which occurs in the word, it is written in all its correct positions. If the suggested letter does not occur in the word, one element of a hanged man stick figure appers.",
        image: "hangman/hangman.jpg",
        path: "/hangman",
      },
      {
        name: "Drawing game",
        description:
          "The rules of the game are simple. You need to swap them in a way that it forms the correct image. The number of steps will be counted. So, you may wish to think and try to do it in minimum possible steps.",
        image: "drawing_game/drawing.jpg",
        path: "/drawingGame",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
