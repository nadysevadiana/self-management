import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";

const ProcrastinationTest = () => {
  const sections = {
    "Откладывание важных задач": [
      "Я часто откладываю сложные или неприятные задачи на потом.",
      "Я начинаю выполнять работу в последний момент.",
      "Мне сложно заставить себя приступить к важным делам.",
      "Я отвлекаюсь на другие, менее важные задачи, чтобы избежать основной работы.",
      "Чем сложнее задача, тем дольше я откладываю её выполнение."
    ],
    "Прокрастинация в повседневной жизни": [
      "Я часто трачу время на соцсети, видео и другие отвлекающие факторы.",
      "Мне сложно придерживаться запланированного распорядка дня.",
      "Я откладываю даже простые дела (ответ на сообщения, уборка, звонки).",
      "Если задача требует много усилий, я стараюсь избегать её.",
      "Я обещаю себе начать работать «завтра», но не делаю этого."
    ],
    "Эмоциональная реакция на прокрастинацию": [
      "Я испытываю чувство вины за то, что откладываю дела.",
      "Из-за прокрастинации я часто чувствую стресс.",
      "Я боюсь не успеть выполнить задачу в срок.",
      "Чем больше я откладываю задачу, тем сложнее мне за неё взяться.",
      "Когда срок сдачи задачи подходит, я испытываю панику и стресс."
    ]
  };

  const totalQuestions = Object.values(sections).flat().length;
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("procrastinationAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [result, setResult] = useState(() => localStorage.getItem("procrastinationResult") || null);
  const [showError, setShowError] = useState(false);

  const handleAnswerChange = (questionIndex, value) => {
    const updatedAnswers = { ...answers, [questionIndex]: value };
    setAnswers(updatedAnswers);
    setResult(null);
    setShowError(false);
    localStorage.setItem("procrastinationAnswers", JSON.stringify(updatedAnswers));
  };

  const calculateProcrastinationScore = () => {
    if (Object.keys(answers).length < totalQuestions) {
      setShowError(true);
      return;
    }

    let score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    let resultText =
      score >= 60 ? "🔥 Высокий уровень прокрастинации. Вам необходимо срочно внедрять методы борьбы с откладыванием дел." :
      score >= 40 ? "⚡ Средний уровень прокрастинации. Вы часто откладываете дела, но можете справляться с этим." :
      score >= 25 ? "✅ Низкий уровень прокрастинации. Иногда вы прокрастинируете, но в целом умеете управлять своим временем." :
      "🏆 Минимальная прокрастинация. Вы эффективно справляетесь с задачами.";

    const finalResult = `Ваш результат: ${score} баллов. ${resultText}`;
    setResult(finalResult);
    localStorage.setItem("procrastinationResult", finalResult);
  };

  const copyResultToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Результат скопирован в буфер обмена!");
    }
  };

  return (
    <motion.div className="test-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="test-header-card">
        <Link to="/tests" className="back-button">← Назад</Link>
        <h2 className="test-title">🕒 Тест: Уровень прокрастинации</h2>
        <p className="test-subtitle">Ответьте на утверждения, выбирая степень согласия от 1 до 5.</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}></div>
      </div>

      {showError && <p className="error-message">⚠️ Пожалуйста, ответьте на все вопросы.</p>}

      <div className="test-grid-layout">
        {Object.entries(sections).map(([sectionTitle, questions], sectionIndex) => (
          <div key={sectionIndex} className="test-section">
            <h3 className="section-heading">{sectionTitle}</h3>
            {questions.map((question, questionIndex) => {
              let globalIndex = sectionIndex * 5 + questionIndex;
              return (
                <div key={globalIndex} className="question-box">
                  <p className="question-text">{globalIndex + 1}. {question}</p>
                  <div className="scale-options">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className={`scale-label ${answers[globalIndex] == value ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name={`q${globalIndex}`}
                          value={value}
                          onChange={() => handleAnswerChange(globalIndex, value)}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="submit-container">
        <motion.button type="button" className="primary-button" onClick={calculateProcrastinationScore} whileHover={{ scale: 1.05 }}>
          📊 Получить результат
        </motion.button>
      </div>

      {result && (
        <motion.div className="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="result-text">{result}</h3>
          <button onClick={copyResultToClipboard} className="copy-result-button">📋 Скопировать результат</button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProcrastinationTest;