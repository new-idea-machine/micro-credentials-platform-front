// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Assessment({ assessmentData }) {
  return (
    <>
      <h2>{assessmentData.title}</h2>

      <ol>
        {assessmentData.questions.map((question, index) => {
          return (
            <li key={index}>
              <p>{question.question}</p>
              {question.choices.map((choice, index) => {
                return <div key={index}>{choice}</div>;
              })}
              <p>
                The correct answer: <b>{question.choices[question.correctChoice]}</b>
              </p>

              <p>{question.explanation}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}

Assessment.propTypes = {
  assessmentData: PropTypes.object.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Assessment;
