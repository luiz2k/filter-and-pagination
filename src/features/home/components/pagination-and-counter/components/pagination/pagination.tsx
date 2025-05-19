import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PagnationUI,
} from "@/components/ui/pagination";
import { Metadata } from "@/features/home/types/metadata";

type PaginationProps = {
  metadata?: Metadata;
  searchParams: URLSearchParams;
};

export function Pagination({ metadata, searchParams }: PaginationProps) {
  const getPageUrl = (page: number) => {
    searchParams.set("page", String(page));
    return `/?${searchParams.toString()}`;
  };

  return (
    <>
      {metadata ? (
        <PagnationUI>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={!metadata.prevPage}
                href={getPageUrl(metadata.prevPage || 1)}
                aria-label="Página anterior"
                aria-disabled={!metadata.prevPage}
              />
            </PaginationItem>

            {metadata.currentPage > 2 && metadata.totalPages > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={metadata.currentPage === 1}
                    disabled={metadata.currentPage === 1}
                    href={getPageUrl(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {metadata.currentPage === metadata.totalPages &&
              metadata.prevPage &&
              metadata.prevPage - 1 >= 1 && (
                <PaginationItem>
                  <PaginationLink href={getPageUrl(metadata.prevPage - 1 || 1)}>
                    {metadata.prevPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

            {metadata.prevPage && (
              <PaginationItem>
                <PaginationLink href={getPageUrl(metadata.prevPage || 1)}>
                  {metadata.prevPage}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive
                disabled
                href={getPageUrl(metadata.currentPage)}
              >
                {metadata.currentPage}
              </PaginationLink>
            </PaginationItem>

            {metadata.nextPage && (
              <PaginationItem>
                <PaginationLink href={getPageUrl(metadata.nextPage || 1)}>
                  {metadata.nextPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {metadata.currentPage === 1 &&
              metadata.nextPage &&
              metadata.nextPage + 1 <= metadata.totalPages && (
                <PaginationItem>
                  <PaginationLink href={getPageUrl(metadata.nextPage + 1 || 1)}>
                    {metadata.nextPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

            {metadata.currentPage + 1 < metadata.totalPages &&
              metadata.totalPages > 3 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={metadata.currentPage === metadata.totalPages}
                      disabled={metadata.currentPage === metadata.totalPages}
                      href={getPageUrl(metadata.totalPages)}
                    >
                      {metadata.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

            <PaginationItem>
              <PaginationNext
                disabled={!metadata.nextPage}
                href={getPageUrl(metadata.nextPage || 1)}
                aria-label="Página seguinte"
                aria-disabled={!metadata.nextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </PagnationUI>
      ) : (
        <PagnationUI>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={true}
                href="#"
                aria-label="Página anterior"
                aria-disabled={true}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive={true} disabled={true} href="#">
                0
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                disabled={true}
                href="#"
                aria-label="Página seguinte"
                aria-disabled={true}
              />
            </PaginationItem>
          </PaginationContent>
        </PagnationUI>
      )}
    </>
  );
}
