import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPostById = async (postId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
};

const ReactQueryById = () => {
  const { postId } = useParams();

  const { data={}, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>Error fetching post.</p>;

  return (
  <div style={{
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto"
  }}>
    <h2 style={{
      fontSize: "24px",
      color: "#333",
      marginBottom: "16px"
    }}>
      Post Details
    </h2>

    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      <strong style={{ color: "#555" }}>ID:</strong> {data.id}
    </p>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      <strong style={{ color: "#555" }}>Title:</strong> {data.title}
    </p>
    <p style={{ fontSize: "16px" }}>
      <strong style={{ color: "#555" }}>Body:</strong> {data.body}
    </p>
  </div>
);

};

export default ReactQueryById;
