import { CalcTotalPrice } from "./calcTotalPrice";
export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  if (items.length) {
    return { items, total: CalcTotalPrice(items) };
  }
  return {
    items: [],
    total: 0,
  };
};
