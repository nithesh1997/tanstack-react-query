
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/regular">Regular Fetch</NavLink>
      </nav>

      <Routes>
        {/* Example Routes (Replace with your actual components) */}
        <Route path="/" element={<Home />} />
        <Route path="/regular" element={<RegularFetch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
