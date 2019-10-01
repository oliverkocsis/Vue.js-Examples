<template>
  <div class="row">
    <div class="eleven columns">
      <svg :width="px + 2 + 'px'" :height="px + 2 + 'px'">
        <ConwayGridRow
          v-for="(cells, y) in grid"
          :key="y"
          :px="px"
          :dim="dim"
          :y="y"
          :cells="cells"
        />
      </svg>
    </div>
    <div class="one column">
      <button type="button" @click="step()">Step</button>
    </div>
  </div>
</template>

<script>
import ConwayGridRow from "./ConwayGridRow";
import { ConwaysGameOfLife } from "./conway-s-game-of-life";
export default {
  components: {
    ConwayGridRow
  },
  props: ["px", "dim"],
  data() {
    let game = new ConwaysGameOfLife(this.dim);
    let grid = game.grid;
    return {
      game,
      grid
    };
  },
  methods: {
    step() {
      this.game.step();
      this.grid = this.game.step;
    }
  }
};
</script>