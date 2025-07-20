
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import ReactQueryFetch from "./components/ReactQueryFetch";
import "./App.css";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import ReactQueryById from "./components/ReactQueryFetchById";
import PaginatedQueries from "./components/PaginationQueries";
import InfiniteQueries from "./components/InfiniteQueries";
import InfiniteQueriesScroll from "./components/InfiniteQueriesScroll";
import MultiplePostsFetcher from "./components/MultiplePostsFetcher";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/regular">Regular Fetch</NavLink>
        <NavLink to="/react-query-fetch">React Query Fetch</NavLink>
        <NavLink to="/react-query-fetch-click">Load Data on Click</NavLink>
        <NavLink to="/react-paginated">Pagination Data</NavLink>
        <NavLink to="/react-infinite">Infinite Load</NavLink>
        <NavLink to="/react-infinite-scroll">Infinite Scroll</NavLink>
        <NavLink to="/react-multiple-posts">Multiple Posts Fetcher</NavLink>
      </nav>

      <Routes>
        {/* Example Routes (Replace with your actual components) */}
        <Route path="/" element={<Home />} />
        <Route path="/regular" element={<RegularFetch />} />
        <Route path="/react-query-fetch" element={<ReactQueryFetch />} />
        <Route path="/react-query-fetch/:postId" element={<ReactQueryById />} />
        <Route path="/react-query-fetch-click" element={<ReactQueryFetchByClick />} />
        <Route path="/react-paginated" element={<PaginatedQueries />} />
        <Route path="/react-infinite" element={<InfiniteQueries />} />
        <Route path="/react-infinite-scroll" element={<InfiniteQueriesScroll />} />
        <Route path="/react-multiple-posts" element={<MultiplePostsFetcher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
