import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// Fetch posts
const fetchPosts = async () => {
  const response = await axios.get("http://localhost:3001/posts");
  return response.data;
};

// Fetch users
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3001/users");
  return response.data;
};

const DualFetchExample = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrorObj,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (postsLoading || usersLoading) return <p>Loading...</p>;
  if (postsError) return <p>Error fetching posts: {postsErrorObj.message}</p>;
  if (usersError) return <p>Error fetching users: {usersErrorObj.message}</p>;

  return (
    <div className="posts-container">
      <h2>ReactQueryFetch - Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/react-query-fetch/${post.id}`}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            👤 <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DualFetchExample;
