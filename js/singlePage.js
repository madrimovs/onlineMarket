// import findElement from "./helpers/findElement.js";

// const elTemplate = findElement("#product-template");
// const elCards = findElement(".product-cards ");

// ////////////////////////// renderProducts ////////////////////
// function renderProducts(array, parent = elCards) {
// 	parent.textContent = "";

// 	const fragment = document.createDocumentFragment();

// 	array.forEach((product) => {
// 		const template = elTemplate.content.cloneNode(true);

// 		const image = findElement(".product-image", template);
// 		const title = findElement(".product-name", template);
// 		const category = findElement(".product-category", template);
// 		const price = findElement(".product-price", template);
// 		const overwiev = findElement(".product-overwiev", template);
// 		const cardProduct = findElement(".productCard", template);

// 		cardProduct.dataset.id = product.id;

// 		cardProduct.addEventListener("click", targetCard(cardProduct));

// 		image.src = product.image;
// 		title.textContent = product.name;
// 		overwiev.textContent = product.overwiev;
// 		category.textContent = product.category;
// 		price.textContent = product.price + "$";

// 		fragment.appendChild(template);
// 	});

// 	parent.appendChild(fragment);
// }

// renderProducts();
