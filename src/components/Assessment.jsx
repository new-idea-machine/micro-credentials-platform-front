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
    <div>
      <h3>{assessmentData.title}</h3>

      <ol>
        {assessmentData.questions.map((question, index) => {
          return <li key={index}>
            {question.question}
            {question.choices.map((choice, index) => {
              return <div key={index}>{choice}</div>;
            })}
            <p>The correct answer is: <b>{question.choices[question.correctChoice]}</b></p>
            {/* <p>The correct answer is: <b>{element.correctChoice}</b></p> */}

            <p>{question.explanation}</p>
          </li>;
        })}
      </ol>
    </div>
  );
}

Assessment.propTypes = {
  assessmentData: PropTypes.object.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Assessment;
