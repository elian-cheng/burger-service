import { getData } from "./getData.js";
import { API_URL, PRODUCT_PREFIX } from "./key.js";
import { catalogList } from "./elements.js";
import createProductCard from "./createProductCard.js";

export const renderCatalog = async () => {
  catalogList.textContent = "";
  const catalogData = await getData(`${API_URL}${PRODUCT_PREFIX}`);
  const catalogCard = catalogData.map(createProductCard);
  catalogList.append(...catalogCard);
};
