import { Metadata } from "@/features/home/types/metadata";
import { Counter } from "./components/counter/counter";
import { Pagination } from "./components/pagination/pagination";

type PaginationAndCounterProps = {
  metadata?: Metadata;
  searchParams: URLSearchParams;
};

export function PaginationAndCounter({
  metadata,
  searchParams,
}: PaginationAndCounterProps) {
  return (
    <div className="m-auto flex w-fit gap-2">
      <Pagination metadata={metadata} searchParams={searchParams} />
      <Counter metadata={metadata} />
    </div>
  );
}
