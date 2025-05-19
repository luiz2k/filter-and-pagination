import { Search } from "./components/search/search";
import { Status } from "./components/status/status";

export function SearchAndStatus() {
  return (
    <div className="flex gap-2">
      <Search />

      <Status />
    </div>
  );
}
