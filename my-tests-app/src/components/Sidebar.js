import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar-hover-area">
      <nav className="sidebar hover-reveal">
        <ul>
          <li><Link to="/">🏠 Главная</Link></li>
          <li className="dropdown">
            <div className="dropdown-title">📊 Тесты ▼</div>
            <ul className="dropdown-menu show">
              <li><Link to="/productivity">🚀 Продуктивность</Link></li>
              <li><Link to="/chronotype">🌙 Хронотип</Link></li>
              <li><Link to="/procrastination">⏳ Прокрастинация</Link></li>
            </ul>
          </li>
          <li><Link to="/guides">📖 Гайды</Link></li>
          <li><Link to="/journal">📝 Дневник</Link></li>
          <li><Link to="/coaching">🎯 Коучинг</Link></li>
          <li><Link to="/about">🔍 О проекте</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
