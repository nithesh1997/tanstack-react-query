import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


async function fetchPosts() {
  const response = await axios.get("http://localhost:3001/posts");
  return response.data; 
}

const ReactQueryFetch = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div  className="posts-container">
      <h2>ReactQueryFetch - Posts</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQueryFetch;
