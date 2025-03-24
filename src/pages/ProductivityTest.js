import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";
import "./Test.css";

const ProductivityTest = () => {
  const sections = {
    "Планирование и организация": [
      "У меня есть четкий распорядок дня, которому я стараюсь следовать.",
      "Я планирую свой день заранее (вечером или утром).",
      "У меня есть список дел, которым я пользуюсь ежедневно.",
      "Я умею правильно расставлять приоритеты в задачах.",
      "Я не откладываю важные задачи на потом."
    ],
    "Управление временем": [
      "Я использую техники тайм-менеджмента (матрица Эйзенхауэра, Pomodoro и т. д.).",
      "Я могу сосредоточиться на одной задаче, не отвлекаясь.",
      "Я минимизирую влияние социальных сетей и других отвлекающих факторов.",
      "Я эффективно использую свое наиболее продуктивное время суток.",
      "Я умею контролировать свое расписание и избегать перегрузки."
    ],
    "Самодисциплина и мотивация": [
      "Я умею заставить себя работать, даже если не хочется.",
      "Я не поддаюсь прокрастинации и знаю, как с ней бороться.",
      "У меня есть долгосрочные цели, и я последовательно к ним иду.",
      "Я не испытываю стресса из-за несделанных задач, так как у меня есть четкая система работы.",
      "Я умею держать себя в тонусе и находить мотивацию."
    ],
    "Управление энергией": [
      "Я слежу за своим уровнем энергии и знаю, когда делать перерывы.",
      "Я практикую осознанные перерывы, а не просто листаю соцсети.",
      "Я уделяю внимание физической активности и питанию для поддержания работоспособности.",
      "Я использую вечерний ритуал для завершения рабочего дня.",
      "Я хорошо высыпаюсь и чувствую себя отдохнувшим."
    ]
  };

  const totalQuestions = Object.values(sections).flat().length;

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("productivityAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  const [result, setResult] = useState(() => localStorage.getItem("productivityResult") || null);
  const [showError, setShowError] = useState(false);

  const handleAnswerChange = (questionIndex, value) => {
    const updatedAnswers = { ...answers, [questionIndex]: value };
    setAnswers(updatedAnswers);
    setResult(null);
    setShowError(false);
    localStorage.setItem("productivityAnswers", JSON.stringify(updatedAnswers));
  };

  const calculateScore = () => {
    if (Object.keys(answers).length < totalQuestions) {
      setShowError(true);
      return;
    }

    const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    let resultText =
      score >= 80
        ? "🚀 Вы отлично управляете своим временем и продуктивностью!"
        : score >= 60
        ? "✅ Хороший уровень, но есть области, требующие внимания."
        : score >= 40
        ? "⚠️ Ваш уровень продуктивности оставляет желать лучшего."
        : "⏳ Ваша продуктивность на низком уровне. Начните с малого.";

    const finalResult = `Ваш результат: ${score} баллов. ${resultText}`;
    setResult(finalResult);
    localStorage.setItem("productivityResult", finalResult);
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
        <h2 className="test-title">📊 Тест: Оценка уровня продуктивности</h2>
        <p className="test-subtitle">Ответьте на утверждения, выбирая степень согласия от 1 до 5.</p>
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

            {questions.map((question, questionIndex) => {
              const globalIndex =
                Object.values(sections)
                  .slice(0, sectionIndex)
                  .flat().length + questionIndex;

              return (
                <div key={globalIndex} className="question-box">
                  <p className="question-text">{globalIndex + 1}. {question}</p>

                  <div className="scale-options">
                    {[
                      { value: 1, label: "Совсем не согласен" },
                      { value: 2, label: "Скорее не согласен" },
                      { value: 3, label: "Нейтрально" },
                      { value: 4, label: "Скорее согласен" },
                      { value: 5, label: "Полностью согласен" }
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className={`scale-label full ${answers[globalIndex]=== value ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`q${globalIndex}`}
                          value={value}
                          onChange={() => handleAnswerChange(globalIndex, value)}
                        />
                        <span className="label">{label}</span>
                      </label>
                    ))}
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
          onClick={calculateScore}
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

export default ProductivityTest;
