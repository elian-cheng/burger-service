import renderModal from "./renderModal.js";
import { catalogList, modalProduct } from "./elements.js";
import { scrollController } from "./scrollControl.js";
import { renderCatalog } from "./renderCatalog.js";
import tabsController from "./catalogTabs.js";

const burger = {
  title: "Бургер Макс",
  price: 1000,
  weight: 500,
  calories: 800,
  description: "Огромный бургер, сьешь сам или поделись с компанией",
  image: "img/megaburger.jpg",
  ingredients: [
    "Пшеничная булочка",
    "Огромная котлета из говядины",
    "Салатинка",
    "Полкила сыра",
    "Какой-то соус",
  ],
};

//========================================================================================================================================================

const closeModal = ({ target, currentTarget }) => {
  if (target.closest(".modal__close") || target === currentTarget) {
    currentTarget.classList.remove("modal_open");
    setTimeout(() => {
      scrollController.enabledScroll();
    }, 300);
  }
};

catalogList.addEventListener("click", e => {
  const target = e.target;
  if (target.closest(".product__detail") || target.closest(".product__image")) {
    renderModal(burger);
    scrollController.disabledScroll();
  }
});

modalProduct.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (
    e.which == 27 &&
    e.code === "Escape" &&
    modalProduct.classList.contains("modal_open")
  ) {
    e.preventDefault();
    modalProduct.classList.remove("modal_open");
    scrollController.enabledScroll();
    return;
  }
});

function init() {
  renderCatalog();
  tabsController();
}
init();
