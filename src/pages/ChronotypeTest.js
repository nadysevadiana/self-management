import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";
import "./Test.css";

const ChronotypeTest = () => {
  const sections = {
    "Время пробуждения": [
      ["В какое время вы обычно просыпаетесь без будильника?", ["A) До 6:00", "B) 6:00–8:00", "C) После 8:00"]],
      ["Как легко вам просыпаться рано утром?", ["A) Очень легко, я чувствую себя бодрым.", "B) Не всегда легко, но если надо – могу.", "C) Очень тяжело, я чувствую себя уставшим."]]
    ],
    "Пик продуктивности": [
      ["Когда у вас максимальная работоспособность?", ["A) Утром (до 12:00)", "B) Днем (12:00–18:00)", "C) Вечером (после 18:00)"]],
      ["В какое время вам легче всего сосредоточиться на сложных задачах?", ["A) В ранние утренние часы", "B) Ближе к обеду", "C) Вечером"]],
      ["В какое время вам сложнее всего работать?", ["A) Вечером", "B) Днем", "C) Утром"]]
    ],
    "Энергия и усталость": [
      ["Как вы чувствуете себя в течение дня?", ["A) Бодр в первой половине дня, к вечеру устаю.", "B) Энергия ровная в течение дня.", "C) Утром чувствую усталость, вечером прихожу в тонус."]],
      ["Как вы относитесь к работе поздно вечером?", ["A) Не люблю, стараюсь не работать.", "B) Могу, но не слишком продуктивен.", "C) Люблю, чувствую прилив сил."]]
    ],
    "Отдых и сон": [
      ["Во сколько вы обычно ложитесь спать?", ["A) До 22:00", "B) 22:00–00:00", "C) После полуночи"]],
      ["Как вы чувствуете себя после 7-8 часов сна?", ["A) Полностью отдохнувшим.", "B) Иногда усталым, иногда бодрым.", "C) Все равно уставшим."]]
    ]
  };

  const totalQuestions = Object.values(sections).flat().length;

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("chronotypeAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  const [result, setResult] = useState(() => localStorage.getItem("chronotypeResult") || null);
  const [showError, setShowError] = useState(false);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);
    setResult(null);
    setShowError(false);
    localStorage.setItem("chronotypeAnswers", JSON.stringify(updatedAnswers));
  };

  const getResultText = (score) => {
    if (score >= 21) return "☀️ Жаворонок – ваша продуктивность максимальна утром.";
    if (score >= 14) return "🌤 Голубь – у вас сбалансированный ритм.";
    return "🌙 Сова – ваша активность нарастает к вечеру.";
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < totalQuestions) {
      setShowError(true);
      return;
    }

    const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    const finalResult = `Ваш результат: ${score} баллов. ${getResultText(score)}`;
    setResult(finalResult);
    localStorage.setItem("chronotypeResult", finalResult);
  };

  const copyResultToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Результат скопирован в буфер обмена!");
    }
  };

  return (
    <motion.div className="test-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Заголовок */}
      <div className="test-header-card">
        <Link to="/tests" className="back-button">← Назад</Link>
        <h2 className="test-title">🕒 Тест: Определение хронотипа</h2>
        <p className="test-subtitle">Выберите наиболее подходящие варианты ответов.</p>
      </div>

      {/* Прогресс */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {showError && <p className="error-message">⚠️ Пожалуйста, ответьте на все вопросы.</p>}

      {/* Вопросы */}
      <div className="test-grid-layout">
        {Object.entries(sections).map(([sectionTitle, questions], sectionIndex) => (
          <div key={sectionIndex} className="test-section">
            <h3 className="section-heading">{sectionTitle}</h3>
            {questions.map(([question, options], questionIndex) => {
              const globalIndex =
                Object.values(sections)
                  .slice(0, sectionIndex)
                  .flat().length + questionIndex;

              return (
                <div key={globalIndex} className="question-box">
                  <p className="question-text">{globalIndex + 1}. {question}</p>
                  <div className="scale-options-column">
                    {options.map((optionText, i) => {
                      const value = 3 - i; // A = 3, B = 2, C = 1
                      return (
                        <label
                          key={value}
                          className={`scale-label ${answers[globalIndex] === value ? "selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name={`q${globalIndex}`}
                            value={value}
                            onChange={() => handleAnswerChange(globalIndex, value)}
                          />
                          <span>{optionText}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Кнопка результата */}
      <div className="submit-container">
        <motion.button
          type="button"
          className="primary-button"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
        >
          📊 Получить результат
        </motion.button>
      </div>

      {/* Результат */}
      {result && (
        <motion.div
          className="result-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="result-text">{result}</h3>
          <button onClick={copyResultToClipboard} className="copy-result-button">
            📋 Скопировать результат
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChronotypeTest;
