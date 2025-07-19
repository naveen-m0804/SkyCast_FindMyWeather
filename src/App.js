import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>SkyCast 🌤️</h2>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
