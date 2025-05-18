import { ORDER_VALUES } from "@/constants/order-values";
import { Order } from "@/types/order";

export const isOrder = (order: string): order is Order => {
  return ORDER_VALUES.includes(order as Order);
};
