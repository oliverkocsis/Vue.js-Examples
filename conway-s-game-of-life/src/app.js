

Vue.component('conway-game', {
    props: [],
    data: function () {
        return {
            px: 600,
            dim: 12,
            game: undefined,
            grid: undefined
        }
    },
    created: function () {
        this.game = new ConwaysGameOfLife(this.dim);
        this.grid = this.game.grid;
    },
    methods: {
        alive: function (x, y) {
            this.game.setAlive(y, x);
            this.grid = this.game.grid;
            console.log("alive", y, x, this.grid);
        },
        dead: function (x, y) {
            this.game.setDead(y, x);
            this.grid = this.game.grid;
            console.log("dead", y, x, this.grid);
        },
        step: function () {
            this.game.step();
            this.grid = this.game.grid;
            console.log("step", this.grid);
        }
    },
    template: `<div>
    <div class="row">
        <div class="col">
            <conway-grid :px="px" :dim="dim" :grid="grid" @cell-alive="alive" @cell-dead="dead"></conway-grid>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="step()">Step</button>
        </div>
    </div>
    </div>`
});

Vue.component('conway-grid', {
    props: ['px', 'dim', 'grid'],
    data: function () {
        return {}
    },
    methods: {
        alive: function (x, y) {
            this.$emit('cell-alive', x, y);
        },
        dead: function (x, y) {
            this.$emit('cell-dead', x, y);
        }
    },
    template: `<svg :width="px + 2 + 'px'" :height="px + 2 + 'px'"><template v-for="(cells,y) in grid"><conway-cell v-for="(state,x) in cells" :x="x" :y="y" :state="state" :scale="px / dim" @cell-alive="alive" @cell-dead="dead"></conway-cell></template></svg>`
});

Vue.component('conway-cell', {
    props: ['x', 'y', 'state', 'scale'],
    data: function () {
        return {}
    },
    computed: {
        fill: function () {
            return this.state ? 'black' : 'white'
        }
    },
    methods: {
        clicked: function () {
            this.state ? this.$emit('cell-dead', this.x, this.y) : this.$emit('cell-alive', this.x, this.y);
        }
    },
    template: `<rect :x="x * scale + 1" :y="y * scale + 1" :width="scale + 'px'" :height="scale + 'px'" style="stroke:gray;stroke-width:1;" :style="{fill:fill}" @click="clicked"></rect>`
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});