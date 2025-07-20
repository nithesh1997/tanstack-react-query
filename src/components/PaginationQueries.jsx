import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

// Fetch function
const fetchItems = async (pageNumber) => {
  const response = await axios.get(`http://localhost:3001/items?_limit=10&_page=${pageNumber}`);
  return response.data;
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["items", page],
    queryFn: () => fetchItems(page),
    placeholderData: keepPreviousData,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3 style={{ marginBottom: "10px" }}>Pagination Example</h3>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((item) => (
            <li key={item.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <strong>{item.name}</strong> - {item.color} - {item.vitamin}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          style={{ padding: "6px 12px", marginRight: "10px" }}
        >
          Previous
        </button>

        {Array.from({ length: 10 }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            disabled={page === pageNumber}
            style={{
              padding: "6px 10px",
              margin: "0 5px",
              backgroundColor: page === pageNumber ? "#5D62DE" : "#eee",
              color: page === pageNumber ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={page === 10}
          style={{ padding: "6px 12px", marginLeft: "10px" }}
        >
          Next
        </button>

        <span style={{ marginLeft: "20px" }}>
          Page: <strong>{page}</strong> {isFetching ? "..." : ""}
        </span>
      </div>
    </div>
  );
};

export default PaginatedQueries;
