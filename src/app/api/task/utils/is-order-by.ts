import { ORDER_BY_VALUES } from "@/constants/order-by-values";
import { TaskKeys } from "@/types/task-keys";

export const isOrderBy = (orderBy: string): orderBy is TaskKeys => {
  return ORDER_BY_VALUES.includes(orderBy as TaskKeys);
};
