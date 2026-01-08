import './App.css';
import './css/Nav.css';
import { HashRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Projects from "./components/Projects";
import Writings from "./components/Writings";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="wip-banner">
          🚧 Work in Progress 🚧
        </div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/writings">Writings</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writings" element={<Writings />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
