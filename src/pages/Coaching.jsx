import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import selfmanStep1Content from "../content/self-management/selfman_step1"; // Импортируем текст для шага 1
import sportsStep1Content from "../content/sports-development/sports_step1"; // Импортируем текст для шага 1

const categories = [
  {
    id: "self-management",
    title: "Самоменеджмент",
    steps: [
      {
        id: "selfman_step1",
        title: "Шаг 1. Осознанность и мягкий старт",
        emoji: "🧘",
        content: selfmanStep1Content,
      },
      {
        id: "selfman_step2",
        title: "Шаг 2. Продуктивность",
        emoji: "📊",
        content: "Здесь будет текст для шага 2...",
      },
      {
        id: "selfman_step3",
        title: "Шаг 3. Фокус",
        emoji: "🎯",
        content: "Здесь будет текст для шага 3...",
      },
    ],
  },
  {
    id: "sports-development",
    title: "Спорт и развитие",
    steps: [
      {
        id: "sports_step1",
        title: "Шаг 1. Фитнес",
        emoji: "💪",
        content: sportsStep1Content,
      },
      {
        id: "sports_step2",
        title: "Шаг 2. Питание",
        emoji: "🍏",
        content: "Здесь будет текст для шага 2...",
      },
    ],
  },
];

const Coaching = () => {
  return (
    <div className="page-container">
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>🧭 Выбери категорию</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <h2 className="category-title">{category.title}</h2>
            <div className="guide-grid">
              {category.steps.map((step) => (
                <Link key={step.id} to={`/coaching/${category.id}/${step.id}`} className="guide-card">
                  <span className="guide-emoji">{step.emoji}</span>
                  <h3 className="guide-title">{step.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coaching;
