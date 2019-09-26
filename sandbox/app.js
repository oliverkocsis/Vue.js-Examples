var app = new Vue({
    el: '#app',
    data: {
        messages: ['Lorem ipsum', 'dolor sit amet', 'consectetur adipiscing elit']
    },
    methods: {
        clicked: function () {
            this.messages.splice(0, 1, 'This has been changed'); 
            console.log("The array element has been changed", this.messages);
        }
    }
})