import React, { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Fetch paginated data
const fetchItems = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:3001/items?_limit=10&_page=${pageParam}`
  );
  return response.data;
};

const InfiniteQueriesScroll = () => {
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
      // Stop fetching if fewer than 10 items returned
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Items</h2>

      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                marginBottom: "6px",
                borderRadius: "4px",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      ))}

      {/* Trigger loading more when visible */}
      <div ref={ref} style={{ height: "1px", marginTop: "20px" }} />

      {/* Show loading text */}
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p style={{ color: "gray" }}>No more items to load</p>}
    </div>
  );
};

export default InfiniteQueriesScroll;
