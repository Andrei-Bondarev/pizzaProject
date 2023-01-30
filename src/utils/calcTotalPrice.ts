import { CartItem } from "../redux/cartSlice";

export const CalcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.count * obj.price + sum;
  }, 0);
};
