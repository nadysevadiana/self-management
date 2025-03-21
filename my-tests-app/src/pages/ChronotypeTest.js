import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";

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
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    setResult(null);
    setShowError(false);
  };

  const calculateChronotypeScore = () => {
    if (Object.keys(answers).length < totalQuestions) {
      setShowError(true);
      return;
    }

    const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    let resultText =
      score >= 21 ? "☀️ Жаворонок – ваша продуктивность максимальна утром." :
      score >= 14 ? "🌤 Голубь – у вас сбалансированный ритм." :
      "🌙 Сова – ваша активность нарастает к вечеру.";

    setResult(`Ваш результат: ${score} баллов. ${resultText}`);
  };

  return (
    <motion.div className="test-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="test-header-card">
        <Link to="/tests" className="back-button">← Назад</Link>
        <h2 className="test-title">🕒 Тест: Определение хронотипа</h2>
        <p className="test-subtitle">Выберите наиболее подходящие для вас варианты ответов.</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}></div>
      </div>

      {showError && <p className="error-message">⚠️ Пожалуйста, ответьте на все вопросы.</p>}

      <div className="test-grid-layout">
        {Object.entries(sections).map(([section, questions], sectionIndex) => (
          <div key={sectionIndex} className="test-section">
            <h3 className="section-heading">{section}</h3>
            {questions.map(([question, options], questionIndex) => {
              const globalIndex = Object.values(sections).slice(0, sectionIndex).flat().length + questionIndex;
              return (
                <div key={globalIndex} className="question-box">
                  <p className="question-text">{globalIndex + 1}. {question}</p>
                  <div className="scale-options-column">
                    {options.map((option, i) => (
                      <div key={i} className="option-row">
                        <label
                          className={`scale-label ${answers[globalIndex] === 3 - i ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`q${globalIndex}`}
                            value={3 - i}
                            onChange={() => handleAnswerChange(globalIndex, 3 - i)}
                          />
                          <span>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="submit-container">
        <motion.button type="button" className="primary-button" onClick={calculateChronotypeScore} whileHover={{ scale: 1.05 }}>
          📊 Получить результат
        </motion.button>
      </div>

      {result && (
        <motion.div className="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="result-text">{result}</h3>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChronotypeTest;