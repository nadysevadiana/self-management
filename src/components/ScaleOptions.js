// components/ScaleOptions.js
const ScaleOptions = ({ questionId, selected, options, onChange }) => (
    <div className="scale-options">
      {options.map(({ value, label }) => (
        <label
          key={value}
          className={`scale-label full ${selected == value ? "selected" : ""}`}
        >
          <input
            type="radio"
            name={`q${questionId}`}
            value={value}
            onChange={() => onChange(questionId, value)}
          />
          <span className="label">{label}</span>
        </label>
      ))}
    </div>
  );
  
  export default ScaleOptions;
  