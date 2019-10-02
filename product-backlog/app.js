"use strict";

var app = new Vue({
    el: '#app',
    data: {
        items: [],
        item: { title: "", description: "", criteria: "" },
        selected: 0,
        viewList: "list",
        viewForm: "form",
        view: "list",
        modeEdit: "edit",
        modeNew: "new",
        mode: ""
    },
    methods: {
        select(index) {
            console.log('selected', index);
            this.item = this.items[index];
            this.selected = index;
            this.view = this.viewForm;
            this.mode = this.modeEdit;
        },
        create() {
            console.log('create');
            this.item = { title: "", description: "", criteria: "" };
            this.view = this.viewForm;
            this.mode = this.modeNew;
        },
        save() {
            console.log('save', this.mode);
            this.mode == this.modeNew ? this.items.push(this.item) : this.items.splice(this.selected, 1, this.item);
            this.view = this.viewList;
        },
        cancel() {
            console.log('cancel');
            this.view = this.viewList;
        },
        remove() {
            console.log('remove', this.selected);
            this.items.splice(this.selected, 1);
            this.view = this.viewList;
        }
    }
})