import { Task } from "@/generated/prisma";

export type TaskKeys = keyof Omit<Task, "id">;
