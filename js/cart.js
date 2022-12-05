import {
  catalogList,
  countAmount,
  modalProductBtn,
  orderCount,
  orderList,
} from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PRODUCT_PREFIX } from "./key.js";

export const getCart = () => {
  const cartList = localStorage.getItem(`YOUR_MEAL-cart`);
  if (cartList) return JSON.parse(cartList);
  else return [];
};

export const renderCartList = async () => {
  const cartList = getCart();
  const allProductId = cartList.map(item => item.id);
  const data = cartList.length
    ? await getData(`${API_URL}${PRODUCT_PREFIX}?list=${allProductId}`)
    : [];
  const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
  orderCount.textContent = countProduct;

  const cartItems = data.map(item => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("order__item");
    cartItem.dataset.idProduct = item.id;

    const product = cartList.find(el => el.id === item.id);

    cartItem.innerHTML = `
      <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">
      <div class="order__product">
        <h3 class="order__product-title">${item.title}</h3>
        <p class="order__product-weight">${item.weight}г</p>
        <p class="order__product-price">${item.price}₴</p>
      </div>
      <div class="order__product-count count">
        <button class="count__minus">-</button>
        <p class="count__amount">${product.count}</p>
        <button class="count__plus">+</button>
      </div>
    `;

    return cartItem;
  });
  orderList.textContent = "";
  orderList.append(...cartItems);
};

const updateCartList = cartList => {
  localStorage.setItem(`YOUR_MEAL-cart`, JSON.stringify(cartList));
  renderCartList();
};

const addCartItem = (id, count = 1) => {
  const cartList = getCart();
  const product = cartList.find(item => item.id === id);
  if (product) product.count += count;
  else cartList.push({ id, count });

  updateCartList(cartList);
};

const removeCartItem = id => {};

const cartController = () => {
  catalogList.addEventListener("click", ({ target }) => {
    if (target.closest(".product__add")) {
      addCartItem(target.closest(".product").dataset.idProduct);
    }
  });
  modalProductBtn.addEventListener("click", () => {
    addCartItem(modalProductBtn.dataset.idProduct, +countAmount.textContent);
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
};
