import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchItems = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`);
  return response.data;
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If lastPage has less than 10 items, assume no more pages
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data)

  return (
    <div>
      <h2>Items</h2>
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{ marginTop: "12px", padding: "6px 12px" }}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more items"}
      </button>
    </div>
  );
};

export default InfiniteQueries;
