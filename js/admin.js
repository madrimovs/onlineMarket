import findElement from "./helpers/findElement.js";
import { asyncFunction } from "./app.js";
import { BASE_URL } from "./app.js";
import { elTemplate } from "./app.js";
import { elCards } from "./app.js";
import { products } from "./app.js";

const elForm = findElement("#product-form");

////////////////// renderProducts ///////////////////////
function renderProducts(array, parent = elCards) {
	parent.textContent = "";

	const fragment = document.createDocumentFragment();

	array.forEach((product) => {
		const template = elTemplate.content.cloneNode(true);

		const image = findElement(".product-image", template);
		const title = findElement(".product-name", template);
		const category = findElement(".product-category", template);
		const price = findElement(".product-price", template);
		const overwiev = findElement(".product-overwiev", template);

		const deleteBtn = findElement("#deleteBtn", template);
		const editeBtn = findElement("#editeBtn", template);

		deleteBtn.dataset.id = product.id;
		editeBtn.dataset.id = product.id;

		image.src = product.image;
		title.textContent = product.name;
		overwiev.textContent = product.overwiev;
		category.textContent = product.category;
		price.textContent = product.price + "$";

		fragment.appendChild(template);
	});

	parent.appendChild(fragment);
}

//////////////////////// elForm ////////////////////////////
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
			data = products;
			asyncFunction();

			alert("Mahsulot qo'shildi");

			renderProducts(products);

			elForm.reset();
		})
		.catch((err) => {
			alert("Xatolik yuz berdi qaytadan urinib ko'ring");

			console.log(err);
		});
});

//////////////////////// elCards/DELETE /////////////////////////
elCards.addEventListener("click", (evt) => {
	const target = evt.target;

	if (target.className.includes("deleteBtn")) {
		const id = target.dataset.id;
		console.log(id);

		fetch(BASE_URL + "products/" + id, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				alert("o'chdi");
				console.log(data);
			})
			.catch((err) => {
				alert("xato");
			});
	}
});
