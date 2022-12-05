import { modalProduct } from "./elements.js";

export default function renderModal(product) {
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
  modalProductImage.src = product.image;
  modalProductDescription.textContent = product.description;
  modalProductPrice.textContent = product.price;
  ingredientsCalories.textContent = `${product.weight}г, ${product.calories}ккал`;

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
