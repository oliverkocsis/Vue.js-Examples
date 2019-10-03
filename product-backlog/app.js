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
        mode: "",
        db: firebase.firestore(),
        collectionItems: "items"
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
            let _this = this;
            this.db.collection(this.collectionItems).add({
                title: this.item.title ? this.item.title : '',
                description: this.item.description ? this.item.description : '',
                criteria: this.item.criteria ? this.item.criteria : ''
            }).then(function (docRef) {
                console.log("Item saved with ID: ", docRef.id);
                _this.mode == _this.modeNew ? _this.items.push(_this.item) : _this.items.splice(_this.selected, 1, _this.item);
                _this.view = _this.viewList;
            }).catch(function (error) {
                console.error("Error sacing document: ", error);
            });
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
    },
    created() {
        let _this = this;
        this.db.collection(this.collectionItems).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, doc.data());
                    _this.items.push(doc.data());
                });
            });
    }
})