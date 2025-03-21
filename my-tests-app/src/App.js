import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import ProductivityTest from "./pages/ProductivityTest";
import ChronotypeTest from "./pages/ChronotypeTest";
import ProcrastinationTest from "./pages/ProcrastinationTest";
import Guides from "./pages/Guides";
import Journal from "./pages/Journal";
import Coaching from "./pages/Coaching";
import About from "./pages/About";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Sidebar />
        <motion.header

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/productivity" element={<ProductivityTest />} />
            <Route path="/chronotype" element={<ChronotypeTest />} />
            <Route path="/procrastination" element={<ProcrastinationTest />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};
