import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";

const Home = () => {
  return (
    <motion.div className="home-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="home-title">Добро пожаловать в <span>SelfMastery Hub</span></h1>
      <p className="home-subtitle">Твой путь к продуктивности, самодисциплине и успеху!</p>
      
      <div className="home-grid">
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>📊 Пройди тесты</h3>
          <p>Определи свои сильные стороны и зоны роста.</p>
          <Link to="/tests" className="home-button">Перейти →</Link>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>📖 Читай гайды</h3>
          <p>Полезные советы и стратегии для продуктивности.</p>
          <Link to="/guides" className="home-button">Перейти →</Link>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>📝 Веди дневник</h3>
          <p>Записывай инсайты, ставь цели и отслеживай прогресс.</p>
          <Link to="/journal" className="home-button">Перейти →</Link>
        </motion.div>

        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <h3>🎯 Коучинг</h3>
          <p>Интерактивные упражнения и практики для изменений.</p>
          <Link to="/coaching" className="home-button">Перейти →</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;