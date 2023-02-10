import findElement from "./helpers/findElement.js";
import { BASE_URL } from "./app.js";

const elForm = findElement("#form");
const elEmail = findElement("#email");
const elPassword = findElement("#password");
const errorText = findElement("#errorText");
const errorPas = findElement("#errorPas");
const elCheckbox = findElement("#checkbox");
const checkText = findElement("#chekcText");

errorText.style.display = "none";
errorPas.style.display = "none";

///////////////////// GENERATE ERROR TEXT FUNCTION //////////////////////
function generateError(element, text) {
	element.textContent = text;
	element.style.display = "block";

	const timer = setTimeout(() => {
		element.style.display = "none";

		clearTimeout(timer);
	}, 3000);
}

/////////////////////////////// LOGIN ELFORM ///////////////////////////////
elForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	if (elEmail.value.length === 0) {
		generateError(errorText, "Iltimos e-mailingizni kiriting");
	}

	if (elPassword.value.length < 6) {
		generateError(errorPas, "Parol 6 ta belgidan kam bo'lmasligi kerak");
	}

	if (elCheckbox.checked == false) {
		generateError(checkText, "Login parol eslab qolinsinmi?");
	}
});
