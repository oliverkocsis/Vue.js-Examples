<template>
  <g>
    <conway-cell
      v-for="(state, x) in cells"
      :key="y + ':' + x"
      :x="x"
      :y="y"
      :alive="state"
      :scale="px / dim"
      :change="changeCellState"
    />
  </g>
</template>

<script>
import ConwayCell from "./ConwayCell";

export default {
  components: {
    ConwayCell
  },
  props: ["px", "dim", "y", "cells"],
  methods: {
    changeCellState(x) {
      this.$set(this.cells, x, !this.cells[x]);
      console.log(`[${this.y}][${x}]: ${this.cells[x]}`);
    }
  }
};
</script>