import findElement from "./helpers/findElement.js";

export const BASE_URL = "https://63d79d2eafbba6b7c94093d4.mockapi.io/";
const elTemplate = findElement("#product-template");
const elCards = findElement(".product-cards");
const elLoader = findElement(".loaderBtn");

function renderProducts() {
	const fragment = document.createDocumentFragment();

	const template = elTemplate.content.cloneNode(true);

	const image = findElement(".product-image", template);
	const title = findElement(".product-name", template);
	const category = findElement(".product-category", template);
	const price = findElement(".product-price", template);
	const overwiev = findElement(".product-overwiev", template);

	const id = localStorage.getItem("id");

	let data = {
		image: image.value,
		name: title.value,
		price: price.value,
		overwiev: overwiev.value,
		category: category.value,
	};

	fetch(BASE_URL + "products/" + id, {
		method: "PUT",
		body: JSON.stringify(data),

		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((json) => json.json())
		.then((res) => {
			console.log(res);
			data = res;

			image.src = data.image;
			title.textContent = data.name;
			overwiev.textContent = data.overwiev;
			category.textContent = data.category;
			price.textContent = data.price + "$";
		});

	fragment.appendChild(template);

	elCards.appendChild(fragment);

	elLoader.style.display = "none";
}

renderProducts();
