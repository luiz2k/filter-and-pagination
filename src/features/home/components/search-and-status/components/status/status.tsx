"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskStatusTranslate } from "@/constants/task-status-translate";
import { TaskStatus } from "@/generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";

export function Status() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const statusParam = searchParams.get("status");
  const defaultSelectValue =
    taskStatusTranslate[statusParam as TaskStatus] || "Todos";

  const handleChangeSelect = (value: string) => {
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={defaultSelectValue}
      onValueChange={handleChangeSelect}
    >
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Status">{defaultSelectValue}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          {Object.values(TaskStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {taskStatusTranslate[status]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
