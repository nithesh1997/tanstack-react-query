
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import ReactQueryFetch from "./components/ReactQueryFetch";
import "./App.css";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import ReactQueryById from "./components/ReactQueryFetchById";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/regular">Regular Fetch</NavLink>
        <NavLink to="/react-query-fetch">React Query Fetch</NavLink>
        <NavLink to="/react-query-fetch-click">Load Data on Click</NavLink>
      </nav>

      <Routes>
        {/* Example Routes (Replace with your actual components) */}
        <Route path="/" element={<Home />} />
        <Route path="/regular" element={<RegularFetch />} />
        <Route path="/react-query-fetch" element={<ReactQueryFetch />} />
        <Route path="/react-query-fetch/:postId" element={<ReactQueryById />} />
        <Route path="/react-query-fetch-click" element={<ReactQueryFetchByClick />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
