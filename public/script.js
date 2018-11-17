window.addEventListener("load", function () {
	"use strict";

	const app = new Vue({
		el: "#app",

		data: {
			showForm: false,
			posts: [],
			newPost: "",
			isError: false,
			editKey: -1,
			editPostText: ""
		},

		methods: {
			add: function () {
				if (this.newPost !== "") {
					this.posts.unshift(this.newPost);
					this.hide();
				} else {
					this.isError = true;
				}
			},

			hide: function () {
				this.newPost = "";
				this.showForm = false;
				this.isError = false;
			},

			remove: function (i) {
				this.posts.splice(i, 1);
			},

			edit: function (i) {
				this.editKey = i;
				this.editNoteText = this.posts[i];
			},

			save: function () {
				Vue.set(this.posts, this.editKey, this.editPostText);
				this.cancel(); 
			},

			cancel: function () {
				this.editKey = -1;
			}
		}
	});

    let saveStatistics = () => {
        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:4000/save?posts=" + totalPosts);
        req.send();
        req.onload = () => console.log("Успешно сохранена статистика на сервере!");
        req.onerror = () => console.log("Ошибка при отправке запроса на сохранение");
    };
});