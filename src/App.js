import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Компоненты
import Sidebar from "./components/Sidebar";

// Страницы
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import ProductivityTest from "./pages/ProductivityTest";
import ChronotypeTest from "./pages/ChronotypeTest";
import ProcrastinationTest from "./pages/ProcrastinationTest";
import Journal from "./pages/Journal";
import Coaching from "./pages/Coaching";
import About from "./pages/About";
import CoachingTopic from "./pages/CoachingTopic";

import "./App.css";

// Хедер с переключением темы
const Header = ({ toggleTheme, theme }) => (
  <header className="header">
    <div className="header-inner">
      <h1 className="logo">🧠 Productivity Hub</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
      </button>
    </div>
  </header>
);

// Контент приложения с анимацией и роутингом
const AppContent = ({ toggleTheme, theme }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Sidebar setSidebarOpen={setSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="page-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/productivity" element={<ProductivityTest />} />
                <Route path="/chronotype" element={<ChronotypeTest />} />
                <Route path="/procrastination" element={<ProcrastinationTest />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/coaching/:categoryId/:stepId"
                  element={<CoachingTopic />}
                />
                <Route path="*" element={<h2>Страница не найдена 😢</h2>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

// Главный компонент с темами и маршрутизацией
const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.body.classList.toggle("dark-theme", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <AppContent toggleTheme={toggleTheme} theme={theme} />
      </div>
    </Router>
  );
};

export default App;