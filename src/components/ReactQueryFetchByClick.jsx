import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


async function fetchPosts() {
    const response = await axios.get("http://localhost:3001/posts");
    return response.data;
}

const ReactQueryFetchByClick = () => {
    const { data = [], isLoading, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        //********* */ Optional configuration options: *****************************
        enabled: false, // ❌ Disable auto-fetch
    });


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="posts-container">
            <div style={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                <h2>ReactQueryFetchByClick - Posts</h2>
                <button style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }} onClick={() => refetch()}>Load Data</button>
            </div>
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

export default ReactQueryFetchByClick;
