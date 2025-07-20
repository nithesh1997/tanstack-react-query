import React, { useEffect, useState } from "react";
import "./RegularFetch.css";
import axios from "axios";

const RegularFetch = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    } catch (error) {
      setIsError(true);
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong while fetching posts.</p>;

  return (
   <div className="posts-container">
  <h2>Posts</h2>
  <ul>
    {posts.map((post) => (
      <li key={post.id}>
        <strong>{post.title}</strong>
        <p>{post.body}</p>
      </li>
    ))}
  </ul>
</div>

  );
};

export default RegularFetch;
