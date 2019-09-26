<template>
  <svg :width="px + 2 + 'px'" :height="px + 2 + 'px'">
    <ConwayGridRow v-for="(cells, y) in grid" :key="y" :px="px" :dim="dim" :y="y" :cells="cells" />
  </svg>
</template>

<script>
import ConwayGridRow from "./ConwayGridRow";
export default {
  components: {
    ConwayGridRow
  },
  props: ["px", "dim"],
  data() {
    let grid = new Array(this.dim);
    for (let i = 0; i < this.dim; i++) {
      let row = new Array(this.dim);
      row.fill(false);
      grid[i] = row;
    }
    return {
      grid
    };
  },
  methods: {}
};
</script>