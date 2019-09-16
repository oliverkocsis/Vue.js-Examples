var px = 600;
var dim = 12;

Vue.component('conway-game', {
    props: [],
    data: function () {
        return {
            inProgress: false
        }
    },
    methods: {
        start: function () {
            this.inProgress = true;
        },
        stop: function () {
            this.inProgress = false;
        }
    },
    template: `<div><conway-grid></conway-grid><p><button v-if="!inProgress" @click="start()">Start</button><button v-else @click="stop()">Stop</button></p></div>`
});

Vue.component('conway-grid', {
    props: [],
    data: function () {
        return {
            px: px,
            dim: dim,
            grid: []
        }
    },
    methods: {
        updateState: function (x, y) {
            this.grid[y][x] = !this.grid[y][x];
            console.log(this.grid[y][x]);
        }
    },
    created: function () {
        for (i = 0; i < this.dim; i++) {
            this.grid.push(Array.apply(null, new Array(this.dim)).map(Boolean.prototype.valueOf, false))
        }
    },
    template: `<svg :width="px + 2 + 'px'" :height="px + 2 + 'px'"><template v-for="(cells,y) in grid"><conway-cell v-for="(state,x) in cells" :x="x" :y="y" :state="state" @cell-clicked="updateState(x, y)"></conway-cell></template></svg>`
});

Vue.component('conway-cell', {
    props: ['x', 'y', 'state'],
    data: function () {
        return {
            scale: px / dim,
        }
    },
    computed: {
        fill: function () {
            return this.state ? 'black' : 'white'
        }
    },
    methods: {},
    template: `<rect :x="x * scale + 1" :y="y * scale + 1" :width="scale + 'px'" :height="scale + 'px'" style="stroke:gray;stroke-width:1;" :style="{fill:fill}" @click="$emit('cell-clicked', x, y)"></rect>`
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});