import './App.css';
import './components/Nav.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Writings from "./components/Writings";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/writings">Writings</Link>
          <Link to="/resume">Resume</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
