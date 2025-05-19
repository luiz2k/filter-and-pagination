import { API_URL } from "@/constants/api-url";
import { SearchParams } from "@/types/search-params";
import { PaginationAndCounter } from "./components/pagination-and-counter/pagination-and-counter";
import { SearchAndStatus } from "./components/search-and-status/search-and-status";
import { Table } from "./components/table/table";
import { FetchData } from "./types/fetch-data";

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

export async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchParamsInstance = new URLSearchParams(params);

  const url = new URL(`${API_URL}/task`);
  url.search = searchParamsInstance.toString();

  const res = await fetch(url);
  const data: FetchData = await res.json();
  const tasks = data.data;

  return (
    <div className="m-auto mt-20 max-w-6xl space-y-5">
      <SearchAndStatus />

      <Table tasks={tasks} />

      <PaginationAndCounter
        metadata={data.metadata}
        searchParams={searchParamsInstance}
      />
    </div>
  );
}
