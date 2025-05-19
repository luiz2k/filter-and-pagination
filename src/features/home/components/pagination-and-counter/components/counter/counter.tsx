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
import { Metadata } from "@/features/home/types/metadata";
import { useRouter, useSearchParams } from "next/navigation";

type CounterProps = {
  metadata?: Metadata;
};

export function Counter({ metadata }: CounterProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const router = useRouter();

  const handleChangeSelect = (value: string) => {
    params.delete("page");
    params.set("limit", value);

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {metadata ? (
        <Select
          defaultValue={String(metadata.perPage)}
          onValueChange={handleChangeSelect}
        >
          <SelectTrigger>
            <SelectValue placeholder="Por página">
              {metadata.perPage}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Por página</SelectLabel>
              {Array.from({ length: metadata.totalItems }).map((_, index) => (
                <SelectItem key={index} value={String(index + 1)}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Select defaultValue="0">
          <SelectTrigger disabled className="pointer-events-none">
            <SelectValue placeholder="Por página">0</SelectValue>
          </SelectTrigger>
        </Select>
      )}
    </>
  );
}
