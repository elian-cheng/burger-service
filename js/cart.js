import {
  catalogList,
  countAmount,
  modalDelivery,
  modalProductBtn,
  order,
  orderCount,
  orderList,
  orderSubmit,
  orderTotalAmount,
  orderWrapTitle,
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

  orderSubmit.disabled = !cartList.length;
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
        <button class="count__minus" data-id-product=${product.id}>-</button>
        <p class="count__amount">${product.count}</p>
        <button class="count__plus" data-id-product=${product.id}>+</button>
      </div>
    `;

    return cartItem;
  });
  orderList.textContent = "";
  orderList.append(...cartItems);

  orderTotalAmount.textContent = data.reduce((acc, item) => {
    const product = cartList.find(el => el.id === item.id);
    return acc + item.price * product.count;
  }, 0);
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

const removeCartItem = id => {
  const cartList = getCart();
  const productIndex = cartList.findIndex(item => item.id === id);
  cartList[productIndex].count -= 1;
  if (cartList[productIndex].count < 1) {
    cartList.splice(productIndex, 1);
  }
  updateCartList(cartList);
};

const cartController = () => {
  catalogList.addEventListener("click", ({ target }) => {
    if (target.closest(".product__add")) {
      addCartItem(target.closest(".product").dataset.idProduct);
    }
  });
  modalProductBtn.addEventListener("click", () => {
    addCartItem(modalProductBtn.dataset.idProduct, +countAmount.textContent);
  });
  orderList.addEventListener("click", ({ target }) => {
    const targetPlus = target.closest(".count__plus");
    const targetMinus = target.closest(".count__minus");

    if (targetPlus) {
      addCartItem(targetPlus.dataset.idProduct);
    }

    if (targetMinus) {
      removeCartItem(targetMinus.dataset.idProduct);
    }
  });

  orderWrapTitle.addEventListener("click", () => {
    order.classList.toggle("order_open");
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
};
