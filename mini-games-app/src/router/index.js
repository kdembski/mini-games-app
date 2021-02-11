import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ImagePuzzle from "../views/ImagePuzzle.vue";
import MemoryGame from "../views/MemoryGame.vue";
import Hangman from "../views/Hangman.vue";
import GamesList from "../views/GamesList.vue";
import MemorySequence from "../views/MemorySequence.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/imagePuzzle",
    name: "ImagePuzzle",
    component: ImagePuzzle,
  },
  {
    path: "/memoryGame",
    name: "MemoryGame",
    component: MemoryGame,
  },
  {
    path: "/hangman",
    name: "Hangman",
    component: Hangman,
  },
  {
    path: "/memorySequence",
    name: "MemorySequence",
    component: MemorySequence,
  },
  {
    path: "/gamesList",
    name: "GamesList",
    component: GamesList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
