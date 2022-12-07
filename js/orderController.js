import { clearCart, getCart } from "./cart.js";
import { modalDeliveryContainer, modalDeliveryForm } from "./elements.js";

export const orderController = () => {
  const checkDelivery = () => {
    if (modalDeliveryForm.format.value === "pickup") {
      modalDeliveryForm["address-info"].classList.add(
        "modal-delivery__fieldset-input_hide"
      );
    }

    if (modalDeliveryForm.format.value === "delivery") {
      modalDeliveryForm["address-info"].classList.remove(
        "modal-delivery__fieldset-input_hide"
      );
    }
  };

  modalDeliveryForm.addEventListener("change", checkDelivery);

  modalDeliveryForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(modalDeliveryForm);
    const data = Object.fromEntries(formData);
    data.order = getCart();

    fetch("https://reqres.in/api/users", {
      method: "post",
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        clearCart();
        modalDeliveryContainer.innerHTML = `
        <h2>Спасибо за заказ!</h2>
        <h3>Ваш номер заказа ${response.id}</h3>
        <p>Наш менеджер свяжется с Вами в ближайшее время!</p>
        <button class="modal__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)" />
          <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)" />
        </svg>
        </button>
        `;

        console.log(response);
      });
  });
};
