import findElement from "./helpers/findElement.js";
import { asyncFunction } from "./app.js";
import { BASE_URL } from "./app.js";

const elForm = findElement("#product-form");

elForm.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const target = evt.target;

	const image = target.image.value;
	const title = target.title.value;
	const category = target.category.value;
	const price = target.price.value;
	const overwiev = target.image.value;

	const newProduct = {
		image,
		title,
		category,
		price,
		overwiev,
	};

	fetch(BASE_URL + "/products", {
		method: "POST",
		BODY: JSON.stringify(newProduct),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			asyncFunction();
			alert("Mahsulot qo'shildi");
			elForm.reset();
		})
		.catch((err) => {
			alert("Xatolik yuz berdi qaytadan urinib ko'ring");
		});
});
