import { API_URL } from "./key.js";

export default function createProductCard(product) {
  const productItem = document.createElement("li");
  productItem.classList.add("catalog__item");
  productItem.innerHTML = `
    <article class="product">
      <img class="product__image" src="${API_URL}/${product.image}" alt="${product.title}">

      <p class="product__price">${product.price}<span class="currency">₴</span></p>

      <h3 class="product__title">
        <button class="product__detail">${product.title}</button>
      </h3>

      <p class="product__weight">${product.weight}г</p>

      <button class="product__add">Добавить</button>
    </article>
`;
  return productItem;
}
