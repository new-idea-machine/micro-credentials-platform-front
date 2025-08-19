// ===============================================================================================
// IMPORTS
// ===============================================================================================

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Question } from "../scripts/databaseSchemas.js";
import QuestionForm from "./QuestionForm.jsx";

// ===============================================================================================
// COMPONENT DEFINITION
// ===============================================================================================

/************************************************************************************************/

function AssessmentForm({ assessmentData, onChange, onDelete }) {
  const [localAssessmentData, setLocalAssessmentData] = useState(assessmentData);

  // Update local state when assessmentData prop changes
  useEffect(() => {
    setLocalAssessmentData(assessmentData);
  }, [assessmentData]);

  // Handle input changes and update parent
  function handleInputChange(event) {
    const { name, value } = event.target;
    const updatedAssessment = {
      ...localAssessmentData,
      [name]: value
    };

    setLocalAssessmentData(updatedAssessment);
    onChange(updatedAssessment);
  }

  function addQuestion() {
    const newQuestion = new Question({
      question: "",
      options: ["", ""],
      correctOption: 0,
      explanation: ""
    });
    const updatedAssessment = {
      ...localAssessmentData,
      questions: [...localAssessmentData.questions, newQuestion]
    };

    setLocalAssessmentData(updatedAssessment);
    onChange(updatedAssessment);
  }

  function deleteQuestion(questionIndex) {
    const updatedAssessment = {
      ...localAssessmentData,
      questions: localAssessmentData.questions.filter((_, index) => index !== questionIndex)
    };

    setLocalAssessmentData(updatedAssessment);
    onChange(updatedAssessment);
  }

  function updateQuestion(questionIndex, updatedQuestion) {
    const updatedQuestions = [...localAssessmentData.questions];

    updatedQuestions[questionIndex] = updatedQuestion;

    const updatedAssessment = {
      ...localAssessmentData,
      questions: updatedQuestions
    };

    setLocalAssessmentData(updatedAssessment);
    onChange(updatedAssessment);
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0" }}>
      <h3>Assessment</h3>

      <label htmlFor={`title-${assessmentData.id}`}>Assessment Title</label>
      <br />
      <input
        id={`title-${assessmentData.id}`}
        name="title"
        type="text"
        value={localAssessmentData.title || ""}
        onChange={handleInputChange}
      />
      <br />

      <h4>Questions ({localAssessmentData.questions.length})</h4>
      {localAssessmentData.questions.map((question, index) => (
        <QuestionForm
          key={index}
          questionData={question}
          questionNumber={index + 1}
          onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
          onDelete={() => deleteQuestion(index)}
        />
      ))}

      <button
        type="button"
        onClick={addQuestion}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "5px 10px",
          margin: "5px"
        }}
      >
        Add Question
      </button>

      <button
        type="button"
        onClick={onDelete}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "5px 10px",
          margin: "5px"
        }}
      >
        Delete Assessment
      </button>
    </div>
  );
}

AssessmentForm.propTypes = {
  assessmentData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// ===============================================================================================
// EXPORTS
// ===============================================================================================

export default AssessmentForm;
