"use client";

import {
  TableHead,
  TableHeader as TableHeaderUI,
  TableRow,
} from "@/components/ui/table";
import { ORDER_BY_TRANSLATE } from "@/constants/order-by-translate";
import { ORDER_BY_VALUES } from "@/constants/order-by-values";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const ARROW = {
  SIZE: 14,
  CLASS: "text-muted-foreground ml-2 inline",
} as const;

const arrows = {
  up: <ArrowUp size={ARROW.SIZE} className={ARROW.CLASS} />,
  down: <ArrowDown size={ARROW.SIZE} className={ARROW.CLASS} />,
  upDown: <ArrowDownUp size={ARROW.SIZE} className={ARROW.CLASS} />,
} as const;

export function TableHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentOrderBy = searchParams.get("orderBy");
  const currentOrder = searchParams.get("order");

  const handleOrder = (orderBy: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    params.delete("page");
    params.set("orderBy", orderBy);
    params.set("order", newOrder);

    router.push(`/?${params.toString()}`);
  };

  const getDirection = (orderBy: string) => {
    const isCurrentOrderBy = orderBy === currentOrderBy;

    if (isCurrentOrderBy) {
      return currentOrder === "asc" ? arrows.down : arrows.up;
    }

    return arrows.upDown;
  };

  const ariaSort = (orderBy: string) =>
    orderBy === currentOrderBy
      ? currentOrder === "asc"
        ? "ascending"
        : "descending"
      : "none";

  return (
    <TableHeaderUI>
      <TableRow>
        <TableHead>ID</TableHead>

        {ORDER_BY_VALUES.map((orderBy) => (
          <TableHead
            key={orderBy}
            onClick={() => handleOrder(orderBy)}
            className="hover:bg-muted/50 cursor-pointer transition-colors duration-200"
            aria-sort={ariaSort(orderBy)}
          >
            <span className="flex items-center justify-between">
              {ORDER_BY_TRANSLATE[orderBy]} {getDirection(orderBy)}
            </span>
          </TableHead>
        ))}
      </TableRow>
    </TableHeaderUI>
  );
}
