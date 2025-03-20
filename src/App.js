import { useState } from "react";

export default function App() {
  const [text, setText] = useState("Нажми меня!");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{text}</h1>
      <button 
        onClick={() => setText("Ты нажал на кнопку!")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Нажать
      </button>
    </div>
  );
}
