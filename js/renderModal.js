import { modalProduct, modalProductBtn } from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PRODUCT_PREFIX } from "./key.js";

export default async function renderModal(id) {
  const product = await getData(`${API_URL}${PRODUCT_PREFIX}/${id}`);
  const modalProductTitle = document.querySelector(".modal-product__title");
  const modalProductImage = document.querySelector(".modal-product__image");
  const modalProductDescription = document.querySelector(
    ".modal-product__description"
  );
  const modalProductPrice = document.querySelector(
    ".modal-product__price-count"
  );
  const ingredientsList = document.querySelector(".ingredients__list");
  const ingredientsCalories = document.querySelector(".ingredients__calories");

  modalProductTitle.textContent = product.title;
  modalProductImage.src = `${API_URL}/${product.image}`;
  modalProductDescription.textContent = product.description;
  modalProductPrice.textContent = product.price;
  ingredientsCalories.textContent = `${product.weight}г, ${product.calories}ккал`;
  modalProductBtn.dataset.idProduct = product.id;

  ingredientsList.textContent = "";

  const ingredientsItems = product.ingredients.map(ingredient => {
    const ingredientsItem = document.createElement("li");
    ingredientsItem.classList.add("ingredients__item");
    ingredientsItem.textContent = ingredient;
    return ingredientsItem;
  });

  ingredientsList.append(...ingredientsItems);

  modalProduct.classList.add("modal_open");
}
