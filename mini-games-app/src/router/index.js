import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ImagePuzzle from "../views/ImagePuzzle.vue";
import MemoryGame from "../views/MemoryGame.vue";
import Hangman from "../views/Hangman.vue";

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
];

const router = new VueRouter({
  routes,
});

export default router;
