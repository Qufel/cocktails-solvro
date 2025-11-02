import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  setPage: (page: number) => void;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function CocktailsPagination({
  page,
  setPage,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: Props) {
  return (
    <Pagination className="cocktails-pagination">
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                fetchPreviousPage();
                setPage(page - 1);
              }}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                fetchNextPage();
                setPage(page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
