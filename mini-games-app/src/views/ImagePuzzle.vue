<template>
  <div>
    <div class="image-puzzle-header py-3 py-xl-5">
      <div class="container-xl">
        <div class="image-puzzle-name">{{ gameDetails.name }}</div>
        <div class="image-puzzle-description">
          {{ gameDetails.description }}
        </div>
      </div>
    </div>
    <transition name="transition-slide-down" mode="out-in">
      <div v-if="!imageChosen" key="choose-image">
        <div
          class="choose-image py-3 py-xl-5"
          :style="{
            backgroundImage:
              'url(' + require('../assets/image_puzzle/background.jpg') + ')',
          }"
        >
          <div class="container-xl">
            <div class="choose-image-div">
              <div
                class="choose-image-div-item"
                @click="getChosenImageIndex(0)"
              >
                <img
                  class="choose-image-img"
                  :src="require('../assets/image_puzzle/doggo.jpg')"
                />
              </div>
              <div
                class="choose-image-div-item"
                @click="getChosenImageIndex(1)"
              >
                <img
                  class="choose-image-img"
                  :src="require('../assets/image_puzzle/catto.jpg')"
                />
              </div>
              <div
                class="choose-image-div-item"
                @click="getChosenImageIndex(2)"
              >
                <img
                  class="choose-image-img"
                  :src="require('../assets/image_puzzle/froggo.jpg')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="image-puzzle-instructions py-3 py-xl-5">
          <div class="container-xl">
            <div class="image-puzzle-instructions-header">
              How to play
            </div>
            <div class="image-puzzle-instructions-text">
              Choose image you want to solve from above. Image will be split
              into 16 even pieces and then shuffled. To move certain piece just
              click on it. Remeber that steps are counted so make every move to
              be as efficient as possible.
            </div>
          </div>
        </div>
      </div>

      <div v-else key="image-puzzle">
        <div
          class="image-puzzle py-3 py-xl-5"
          :style="{
            backgroundImage:
              'url(' + require('../assets/image_puzzle/background.jpg') + ')',
          }"
        >
          <div class="container-xl d-flex justify-content-center">
            <div class="image-puzzle-div">
              <div v-for="row in 4" :key="row" class="row">
                <div
                  v-for="col in 4"
                  :key="boardArray[row - 1 + 4 * (col - 1)].id"
                  :class="{
                    active:
                      (row == emptyBoardElementY - 1 &&
                        col == emptyBoardElementX) ||
                      (row == emptyBoardElementY + 1 &&
                        col == emptyBoardElementX) ||
                      (row == emptyBoardElementY &&
                        col == emptyBoardElementX - 1) ||
                      (row == emptyBoardElementY &&
                        col == emptyBoardElementX + 1),
                    'image-tile': true,
                  }"
                  @click="
                    changeBoardElementPosition(
                      boardArray[row - 1 + 4 * (col - 1)],
                      row,
                      col
                    )
                  "
                >
                  <img
                    :class="{
                      'image-tile-img':
                        row != emptyBoardElementY || col != emptyBoardElementX,
                      '':
                        row == emptyBoardElementY && col == emptyBoardElementX,
                    }"
                    :src="boardArray[row - 1 + 4 * (col - 1)].path"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="steps-counter py-3 py-xl-5">
          <div class="container-xl">
            <div class="steps-counter-div">
              Steps counter: {{ stepsNumber }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="transition-fade">
      <div v-if="showImageFinishedModal" class="modal-overlay">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">Congratulations, you've done it!</div>
            <div class="modal-body ">
              It took you
              {{ stepsNumber }}
              steps to finish image puzzle
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
  name: "ImagePuzzle",
  data() {
    return {
      imagesList: ["doggo.jpg", "catto.jpg", "froggo.jpg"],
      imageChosen: false,
      chosenImageIndex: "",
      startingImageTiles: [],
      boardArray: [
        { id: 0, path: "" },
        { id: 1, path: "" },
        { id: 2, path: "" },
        { id: 3, path: "" },
        { id: 4, path: "" },
        { id: 5, path: "" },
        { id: 6, path: "" },
        { id: 7, path: "" },
        { id: 8, path: "" },
        { id: 9, path: "" },
        { id: 10, path: "" },
        { id: 11, path: "" },
        { id: 12, path: "" },
        { id: 13, path: "" },
        { id: 14, path: "" },
        { id: 15, path: "" },
      ],
      emptyBoardElementX: 4,
      emptyBoardElementY: 4,
      showImageFinishedModal: false,
      stepsNumber: 0,
    };
  },
  computed: {
    gameDetails: function() {
      return this.$store.state.games[0];
    },
  },
  created() {},
  methods: {
    splitImagesIntoTiles() {
      var image = new Image();

      image.src = require(`../assets/image_puzzle/${
        this.imagesList[this.chosenImageIndex]
      }`);
      var widthOfOnePiece = 200;
      var heightOfOnePiece = 200;
      var numRowsToCut = 4;
      var numColsToCut = 4;
      var imageTiles = [];
      function cutImageUp() {
        return new Promise((resolve) => {
          for (var x = 0; x < numColsToCut; ++x) {
            for (var y = 0; y < numRowsToCut; ++y) {
              var canvas = document.createElement("canvas");
              canvas.width = widthOfOnePiece;
              canvas.height = heightOfOnePiece;
              var context = canvas.getContext("2d");
              context.drawImage(
                image,
                x * widthOfOnePiece,
                y * heightOfOnePiece,
                widthOfOnePiece,
                heightOfOnePiece,
                0,
                0,
                canvas.width,
                canvas.height
              );
              imageTiles.push(canvas.toDataURL());
            }
          }
          resolve();
        });
      }
      image.onload = cutImageUp().then(
        this.setImageTilesToBoardAndShuffle(imageTiles)
      );
    },
    getChosenImageIndex(index) {
      this.imageChosen = true;
      this.chosenImageIndex = index;
      this.splitImagesIntoTiles();
    },
    setImageTilesToBoardAndShuffle(imageTiles) {
      for (let i = 0; i < imageTiles.length; i++) {
        this.boardArray[i].path = imageTiles[i];
      }
      this.boardArray[this.boardArray.length - 1].path = "";
      for (var i = this.boardArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.boardArray[i];
        this.boardArray[i] = this.boardArray[j];
        this.boardArray[j] = temp;
      }
      var emptyBoardElementIndex = this.boardArray.findIndex(
        (element) => element.id === 15
      );
      this.boardArray[emptyBoardElementIndex] = this.boardArray[
        this.boardArray.length - 1
      ];
      this.boardArray[this.boardArray.length - 1] = {
        id: 15,
        path: "",
      };
      this.$forceUpdate();
    },
    changeBoardElementPosition(boardElement, y, x) {
      if (
        (x + 1 == this.emptyBoardElementX && y == this.emptyBoardElementY) ||
        (x - 1 == this.emptyBoardElementX && y == this.emptyBoardElementY) ||
        (x == this.emptyBoardElementX && y + 1 == this.emptyBoardElementY) ||
        (x == this.emptyBoardElementX && y - 1 == this.emptyBoardElementY)
      ) {
        this.stepsNumber++;
        var emptyBoardElementIndex =
          this.emptyBoardElementY - 1 + 4 * (this.emptyBoardElementX - 1);
        var clickedBoardElementIndex = y - 1 + 4 * (x - 1);
        this.boardArray[clickedBoardElementIndex] = this.boardArray[
          emptyBoardElementIndex
        ];
        this.boardArray[emptyBoardElementIndex] = boardElement;
        this.emptyBoardElementX = x;
        this.emptyBoardElementY = y;
        this.$forceUpdate();
        var imageFinished = true;
        for (let i = 1; i < this.boardArray.length; i++) {
          if (!(this.boardArray[i - 1].id < this.boardArray[i].id)) {
            imageFinished = false;
          }
        }
        this.showImageFinishedModal = imageFinished;
      }
    },
    sortBoardArray() {
      this.boardArray.sort((a, b) => {
        return a.id - b.id;
      });
      this.$forceUpdate;
    },
    pageReload() {
      this.showImageFinishedModal = false;
      this.imageChosen = false;
      this.chosenImageIndex = "";
      this.startingImageTiles = [];
      this.boardArray = [
        { id: 0, path: "" },
        { id: 1, path: "" },
        { id: 2, path: "" },
        { id: 3, path: "" },
        { id: 4, path: "" },
        { id: 5, path: "" },
        { id: 6, path: "" },
        { id: 7, path: "" },
        { id: 8, path: "" },
        { id: 9, path: "" },
        { id: 10, path: "" },
        { id: 11, path: "" },
        { id: 12, path: "" },
        { id: 13, path: "" },
        { id: 14, path: "" },
        { id: 15, path: "" },
      ];
      this.emptyBoardElementX = 4;
      this.emptyBoardElementY = 4;
      this.showImageFinishedModal = false;
      this.stepsNumber = 0;
    },
  },
};
</script>

<style lang="scss">
.image-puzzle-instructions-header,
.image-puzzle-name {
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  margin-top: -20px;
  letter-spacing: 5px;
}
.image-puzzle-instructions-text,
.image-puzzle-description {
  color: $primaryGreen;
  font-size: 22px;
  font-weight: 100;
}
.image-puzzle,
.choose-image {
  background-color: $primaryGreen;
  background-blend-mode: multiply;
  background-size: cover;
  box-shadow: inset 0px 11px 10px -10px rgba(0, 0, 0, 0.8),
    inset 0px -11px 10px -10px rgba(0, 0, 0, 0.8);
  background-position-y: 55%;
}
.choose-image-div {
  display: flex;
  justify-content: space-between;
}
.choose-image-div-item {
  position: relative;
  height: auto;
  width: calc((100% / 3) - 20px);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background: rgba($primaryGrey, 0.95);
    transition: all 0.15s ease-in-out;
  }
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s 0.05s ease-in-out;
    z-index: 1;
    &::after {
      opacity: 0;
      transition: all 0.2s 0.05s ease-in-out;
    }
  }
}
.choose-image-img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.steps-counter {
  background: $primaryGrey;
}
.steps-counter-div {
  @include flex-center;
  color: $primaryGreen;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 5px;
}
.image-puzzle-div {
  background: rgba($primaryGrey, 0.6);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
.image-tile {
  position: relative;
  width: 204px;
  height: 204px;
  padding: 2px;
  user-select: none;
  object-fit: scale-down;
  &.active {
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      opacity: 0;
      background: rgba($primaryGreen, 0.4);
      transition: all 0.15s ease-in-out;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
}

@media (max-width: 1200px) {
  .image-puzzle-instructions-header,
  .image-puzzle-name {
    margin-top: -10px;
  }
}
@media (max-width: 992px) {
  .image-tile {
    width: 184px;
    height: 184px;
    padding: 2px;
  }
  .image-tile-img {
    width: 180px;
    height: 180px;
  }
}
@media (max-width: 768px) {
  .image-tile {
    width: 134px;
    height: 134px;
    padding: 2px;
  }
  .image-tile-img {
    width: 130px;
    height: 130px;
  }
  .steps-counter-div {
    font-size: 30px;
    letter-spacing: 4px;
  }
}
@media (max-width: 576px) {
  .choose-image-div-item {
    height: auto;
    width: 100%;
    margin-bottom: 16px;
  }
  .choose-image-div {
    display: block;
  }
  .image-puzzle-instructions-header,
  .image-puzzle-name {
    font-size: 30px;
    margin-top: -5px;
  }
  .image-puzzle-instructions-text,
  .image-puzzle-description {
    font-size: 16px;
  }
  .image-tile {
    width: 84px;
    height: 84px;
    padding: 2px;
  }
  .image-tile-img {
    width: 80px;
    height: 80px;
  }
  .steps-counter-div {
    font-size: 25px;
    letter-spacing: 3px;
  }
}
@media (max-width: 400px) {
  .image-tile {
    width: 64px;
    height: 64px;
    padding: 2px;
  }
  .image-tile-img {
    width: 60px;
    height: 60px;
  }
}
</style>
