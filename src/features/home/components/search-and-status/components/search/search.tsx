"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const DEBOUNCE_DELAY = 300;
const SEARCH_PARAM = "title";
const PAGE_PARAM = "page";

export function Search() {
  const isFirstRender = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearch] = useState(
    searchParams.get(SEARCH_PARAM) ?? "",
  );

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!searchValue) {
        params.delete(SEARCH_PARAM);
      } else {
        params.set(SEARCH_PARAM, searchValue);
      }

      params.delete(PAGE_PARAM);

      router.push(`/?${params.toString()}`);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [searchValue, router, searchParams]);

  return (
    <Input
      value={searchValue}
      onChange={handleChangeInput}
      placeholder="Buscar pelo título..."
      aria-label="Buscar pelo título"
    />
  );
}
