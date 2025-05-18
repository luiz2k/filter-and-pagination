import { TaskStatus } from "@/generated/prisma";

export const isTaskStatus = (status: string): status is TaskStatus => {
  return Object.values(TaskStatus).includes(status as TaskStatus);
};
