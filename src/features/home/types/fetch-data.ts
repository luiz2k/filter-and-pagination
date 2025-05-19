import { Task } from "@/generated/prisma";
import { Metadata } from "./metadata";

export type FetchData = {
  success: boolean;
  message: string;
  data?: Task[];
  metadata?: Metadata;
  available?: string[];
};
