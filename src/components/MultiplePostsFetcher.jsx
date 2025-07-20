import axios from "axios";
import { useQueries } from "@tanstack/react-query";

// Fetch individual post by ID
const fetchPostById = async (id) => {
  const response = await axios.get(`http://localhost:3001/posts/${id}`);
  return response.data;
};

// Component to fetch and display multiple posts
const MultiplePosts = ({ postIds }) => {
  const postQueries = useQueries({
    queries: postIds.map((id) => ({
      queryKey: ["posts", id],
      queryFn: () => fetchPostById(id),
    })),
  });

  console.log(postQueries)

  return (
    <div>
      <h4>Fetched Posts:</h4>
      {postQueries.map((query, index) => {
        if (query.isLoading) return <p key={index}>Loading post {postIds[index]}...</p>;
        if (query.isError) return <p key={index}>Error loading post {postIds[index]}</p>;

        return (
          <div key={query.data.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h5>{query.data.title}</h5>
            <p>{query.data.body}</p>
          </div>
        );
      })}
    </div>
  );
};

// Main component to render the demo
const MultiplePostsFetcher = () => {
  const postIds = [1, 3, 5, 4];

  return (
    <div className="container">
      <h3>useQueries Demo</h3>
      <MultiplePosts postIds={postIds} />
    </div>
  );
};

export default MultiplePostsFetcher;
