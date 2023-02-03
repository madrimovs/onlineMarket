import findElement from "./helpers/findElement.js";

const BASE_URL = "https://63d79d2eafbba6b7c94093d4.mockapi.io/";
const elTemplate = findElement("#product-template");
const elCards = findElement(".product-cards");
const elSelect = findElement("#select");
const elSearch = findElement("#search");

const elForm = findElement("#product-form");
const editeForm = findElement("#edite-form");

export let products = [];

////////////////////////// renderProducts /////////////////////////
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
export default renderProducts;

////////////////////////// asyncFunction /////////////////////////
export const asyncFunction = async function () {
	const res = await fetch(BASE_URL + "products/");

	let data = await res.json();

	products = data;

	for (let i = 0; i < products.length; i++) {
		const element = products[i];

		const elOption = document.createElement("option");
		elOption.textContent = element.category;

		elSelect.appendChild(elOption);
	}

	renderProducts(products);
};
asyncFunction();

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
		image: image.value,
		name: title.value,
		category: category.value,
		price: price.value,
		overwiev: overwiev.value,
	};

	fetch(BASE_URL + "/products", {
		method: "POST",
		body: JSON.stringify(newProduct),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			asyncFunction();

			alert("Mahsulot qo'shildi");

			elForm.reset();
		})
		.catch((err) => {
			alert("Xatolik yuz berdi qaytadan urinib ko'ring");
		});
});

/////////////////////////== elSearch /////////////////////////
elSearch.addEventListener("input", (evt) => {
	evt.preventDefault();

	const searchProduct = [];

	const value = elSearch.value;

	products.forEach((product) => {
		if (product.name.toLowerCase().includes(value.toLowerCase())) {
			searchProduct.push(product);
		}
	});

	renderProducts(searchProduct);
});

///////////////////////// elSelect /////////////////////////
elSelect.addEventListener("change", () => {
	const value = elSelect.value;

	const filteredPost = [];

	if (value == "All Products") {
		renderProducts(products);
	} else {
		products.forEach((product) => {
			if (value == product.category) {
				filteredPost.push(product);
			}
		});

		renderProducts(filteredPost);
	}
});

//////////////////////// elCards/DELETE /////////////////////////
elCards.addEventListener("click", (evt) => {
	const target = evt.target;

	if (target.className.includes("deleteBtn")) {
		const id = target.dataset.id;

		fetch(BASE_URL + "products/" + id, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				asyncFunction();

				alert("Mahsulot o'chirildi");
			})
			.catch((err) => {
				alert("Xatolik yuz berdi qaytadan urinib ko'ring");
			});
	}

	/////////////////////// EDITE PRODUCTS //////////////////
	if (target.className.includes("editeBtn")) {
		const id = target.dataset.id;

		products.forEach((product) => {
			if (product.id === id) {
				const image = editeForm.image;
				const title = editeForm.title;
				const category = editeForm.category;
				const price = editeForm.price;
				const overwiev = editeForm.overwiev;
				const editeImg = findElement(".editeImg");
				const editeButton = findElement("#editeButton");

				editeImg.src = product.image;
				image.alt = product.name;

				image.value = product.image;
				title.value = product.name;
				category.value = product.category;
				price.value = product.price;
				overwiev.value = product.overwiev;

				editeButton.addEventListener("click", () => {
					const newArr = {
						image: image.value,
						name: title.value,
						price: price.value,
						overwiev: overwiev.value,
						category: category.value,
					};

					fetch(BASE_URL + "products/" + id, {
						method: "PUT",
						body: JSON.stringify(newArr),

						headers: {
							"Content-Type": "application/json",
						},

					})
						.then((res) => {
							asyncFunction();

							alert("Mahsulot o'zgartirildi");
							return res.json();
						})
						.then((response) => console.log("Success:", response))
						.catch((error) => console.error(error));
				});
			}
		});
	}
});
