import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'; // Importing ReactMarkdown
import selfmanStep1Content from "../content/self-management/selfman_step1"; // Content for step 1
import sportsStep1Content from "../content/sports-development/sports_step1"; // Content for step 1

// Structure of categories and steps
const categories = {
  "self-management": {
    title: "Самоменеджмент",
    steps: {
      selfman_step1: {
        title: "Шаг 1. Осознанность и мягкий старт",
        content: selfmanStep1Content,  // Content from file
      },
      selfman_step2: {
        title: "Шаг 2. Продуктивность",
        content: "Здесь будет текст для шага 2...",
      },
      selfman_step3: {
        title: "Шаг 3. Фокус",
        content: "Здесь будет текст для шага 3...",
      },
    },
  },
  "sports-development": {
    title: "Спорт и развитие",
    steps: {
      sports_step1: {
        title: "Шаг 1. Фитнес",
        content: sportsStep1Content,  // Content from the sports file
      },
      sports_step2: {
        title: "Шаг 2. Питание",
        content: "Здесь будет текст для шага 2...",
      },
    },
  },
  // Add other categories if necessary...
};

const CoachingTopic = () => {
  // Retrieve the parameters from the URL
  const { categoryId, stepId } = useParams();

  // Find the category by categoryId
  const category = categories[categoryId];
  
  // Find the step by stepId
  const step = category?.steps[stepId];

  // If the step is not found, display an error message
  if (!step) {
    return <h2>Гайд не найден 😢</h2>;
  }

  return (
    <div className="page-container">
      <h1>{step.title}</h1>
      {/* Render markdown content */}
      <ReactMarkdown>{step.content}</ReactMarkdown>
    </div>
  );
};

export default CoachingTopic;
