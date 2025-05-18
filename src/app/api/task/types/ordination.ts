import { Order } from "@/types/order";
import { TaskKeys } from "@/types/task-keys";

export type Ordination = {
  [key in TaskKeys]?: Order;
};
