import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";

const Tests = () => {
  return (
    <motion.div className="container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="page-title">📊 Тесты на продуктивность</h1>
      <p className="page-subtitle">Пройди тесты, чтобы узнать свои сильные и слабые стороны!</p>
      
      <div className="test-grid">
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>🚀 Тест на продуктивность</h3>
          <p>Определи, насколько эффективно ты управляешь своим временем.</p>
          <Link to="/productivity" className="test-button">Пройти →</Link>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>🌙 Тест на хронотип</h3>
          <p>Выясни, когда твоя продуктивность достигает пика.</p>
          <Link to="/chronotype" className="test-button">Пройти →</Link>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>⏳ Тест на прокрастинацию</h3>
          <p>Определи, насколько сильно ты откладываешь дела на потом.</p>
          <Link to="/procrastination" className="test-button">Пройти →</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Tests;