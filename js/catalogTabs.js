export default function tabsController() {
  const navigationList = document.querySelector(".navigation__list");
  const navigationButtons = document.querySelectorAll(".navigation__button");
  const catalogTitle = document.querySelector(".catalog__title");
  navigationList.addEventListener("click", e => {
    const tabButton = e.target.closest(".navigation__button");
    if (!tabButton) return;
    navigationButtons.forEach(button => {
      if (button === tabButton) {
        button.classList.add("navigation__button_active");
        catalogTitle.innerText = button.innerText;
      } else {
        button.classList.remove("navigation__button_active");
      }
    });
  });
}
