import { TaskStatus } from "@/generated/prisma";

export const taskStatusTranslate: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "Pendente",
  [TaskStatus.IN_PROGRESS]: "Em Andamento",
  [TaskStatus.COMPLETED]: "Completo",
  [TaskStatus.CANCELLED]: "Cancelado",
};
