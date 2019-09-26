<template>
  <rect
    :x="x * scale + 1"
    :y="y * scale + 1"
    :width="scale + 'px'"
    :height="scale + 'px'"
    style="stroke:gray;stroke-width:1;"
    :style="{fill:fill}"
    @click="clicked"
  ></rect>
</template>

<script>
export default {
  props: ["x", "y", "alive", "scale", "change"],
  data() {
    return {};
  },
  computed: {
    fill() {
      return this.alive ? "black" : "white";
    }
  },
  methods: {
    clicked() {
      this.change(this.x, this.y);
    }
  }
};
</script>