// components/CopyResultButton.js
const CopyResultButton = ({ text }) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(text);
      alert("Результат скопирован в буфер обмена!");
    };
  
    return (
      <button onClick={copyToClipboard} className="copy-result-button">
        📋 Скопировать результат
      </button>
    );
  };
  
  export default CopyResultButton;
  