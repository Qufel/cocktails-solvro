import { useState } from "react";
import { getCocktails } from "@/queries";
import CocktailCard from "./CocktailCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import CocktailsPagination from "./CocktailsPagination";
import CocktailsOptions from "./CocktailsOptions";
import { PulseLoader } from "react-spinners";

export default function Cocktails() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const [category, setCategory] = useState<string | null>(null);
  const [glass, setGlass] = useState<string | null>(null);

  // Get infinite scroll for pagination that takes into an account applied filters
  const {
    data: cocktails,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["cocktails", perPage, category, glass],
    queryFn: ({ pageParam = { page: page, perPage: perPage } }) =>
      getCocktails(pageParam.page, pageParam.perPage, category, glass),
    initialPageParam: { page: page, perPage: perPage },
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (lastPageParam.page === lastPage?.meta.lastPage) return undefined;

      return { page: lastPageParam.page + 1, perPage: perPage };
    },
    getPreviousPageParam: (_firstPage, _pages, firstPageParam) => {
      if (firstPageParam.page === 1) return undefined;

      return { page: firstPageParam.page - 1, perPage: perPage };
    },
  });

  return (
    <div className="cocktails-container">
      <div className="cocktails-header">
        <CocktailsPagination
          page={page}
          setPage={setPage}
          fetchNextPage={fetchNextPage}
          fetchPreviousPage={fetchPreviousPage}
          hasNextPage={hasNextPage && !isFetching}
          hasPreviousPage={page > 1 && !isFetching}
        />
        <CocktailsOptions
          perPage={perPage}
          category={category}
          glass={glass}
          updatePerPage={(value) => {
            setPerPage(value);
          }}
          updateCategory={(value) => {
            setCategory(value);
          }}
          updateGlasses={(value) => {
            setGlass(value);
          }}
          resetPage={() => {
            setPage(1);
            refetch();
          }}
        />
      </div>
      {isLoading && <PulseLoader className="loader" color="#171717" />}
      <div className="cocktails-grid">
        {cocktails && cocktails.pages[page - 1]?.data.length === 0 && (
          <p>No results matching filters.</p>
        )}
        {cocktails &&
          cocktails.pages[page - 1]?.data.map(
            (cocktail: any, index: number) => (
              <CocktailCard cocktail={cocktail} key={index} />
            )
          )}
      </div>
      <CocktailsPagination
        page={page}
        setPage={setPage}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={page > 1}
        isFetching={isFetching}
      />
    </div>
  );
}
