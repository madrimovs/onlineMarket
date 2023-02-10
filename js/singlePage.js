import findElement from "./helpers/findElement.js";

export const BASE_URL = "https://fakestoreapi.com/";
const elTemplate = findElement("#product-template");
const elCards = findElement(".product-cards");
const elLoader = findElement(".loaderBtn");

/////////////////// renderProducts ///////////////////////
function renderProducts() {
	const fragment = document.createDocumentFragment();

	const template = elTemplate.content.cloneNode(true);

	const image = findElement(".product-image", template);
	const title = findElement(".product-title", template);
	const category = findElement(".product-category", template);
	const price = findElement(".product-price", template);
	const description = findElement(".product-description", template);

	const id = localStorage.getItem("id");

	let data = {
		image: image.value,
		title: title.value,
		price: price.value,
		description: description.value,
		category: category.value,
	};

	fetch(BASE_URL + "products/" + id)
		.then((json) => json.json())
		.then((res) => {
			data = res;

			image.src = data.image;
			title.textContent = data.title;
			description.textContent = data.description;
			category.textContent = data.category;
			price.textContent = data.price + "$";
		});

	fragment.appendChild(template);

	elCards.appendChild(fragment);

	elLoader.style.display = "none";
}

renderProducts();
