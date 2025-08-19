// ===============================================================================================
// IMPORTS
// ===============================================================================================

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// ===============================================================================================
// COMPONENT DEFINITION
// ===============================================================================================

/************************************************************************************************/

function QuestionForm({ questionData, onChange, onDelete }) {
  const [localQuestionData, setLocalQuestionData] = useState(questionData);

  // Update local state when questionData prop changes
  useEffect(() => {
    setLocalQuestionData(questionData);
  }, [questionData]);

  // Handle input changes and update parent
  function handleInputChange(event) {
    const { name, value } = event.target;
    const updatedQuestion = {
      ...localQuestionData,
      [name]: value
    };

    setLocalQuestionData(updatedQuestion);
    onChange(updatedQuestion);
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#f9f9f9"
      }}
    >
      <hr />

      <label htmlFor={`question-${questionData.id}`}>Question</label>
      <br />
      <input
        id={`question-${questionData.id}`}
        name="question"
        type="text"
        value={localQuestionData.question || ""}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor={`correctOption-${questionData.id}`}>Correct Answer</label>
      <br />
      <input
        id={`correctOption-${questionData.id}`}
        name="correctOption"
        type="text"
        value={localQuestionData.correctOption || ""}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor={`explanation-${questionData.id}`}>Explanation</label>
      <br />
      <textarea
        id={`explanation-${questionData.id}`}
        name="explanation"
        value={localQuestionData.explanation || ""}
        onChange={handleInputChange}
      />
      <br />

      <button
        type="button"
        onClick={onDelete}
        style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px" }}
      >
        Delete
      </button>
    </div>
  );
}

QuestionForm.propTypes = {
  questionData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// ===============================================================================================
// EXPORTS
// ===============================================================================================

export default QuestionForm;
