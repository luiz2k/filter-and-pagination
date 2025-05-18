import { TaskStatus } from "@/generated/prisma";

export type Filter = {
  title?: {
    startsWith: string;
  };
  status?: TaskStatus;
};
