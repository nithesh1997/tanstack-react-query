import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


async function fetchPosts() {
  const response = await axios.get("http://localhost:3001/posts");
  return response.data; 
}

const ReactQueryFetch = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, 
    //********* */ Optional configuration options: *****************************
    // staleTime: 5000,  // ⏱️ Data is considered "fresh" for 5 seconds
     // After 5 sec, data becomes "stale" and may refetch on remount/focus
    //  refetchInterval: 1000,        // 🔁 Automatically refetch data every 1 second (1000 ms)
    // Even if data is fresh, it will refetch in background every second
    // refetchIntervalInBackground: true, // ✅ Refetch even when tab is not focused
  });


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div  className="posts-container">
      <h2>ReactQueryFetch - Posts</h2>
      <ul>
        {data.map((post) => (
          <li>
          <Link key={post.id} to={`/react-query-fetch/${post.id}`}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQueryFetch;
