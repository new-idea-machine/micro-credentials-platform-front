// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Module({ moduleData }) {
  return (
    <>
      <h2>{moduleData?.title}</h2>

      <p>{moduleData?.description}</p>

      {moduleData.url && (
        <p>
          <a href={moduleData.url} target="_blank" rel="noreferrer">
            Show
          </a>
        </p>
      )}
    </>
  );
}

Module.propTypes = {
  moduleData: PropTypes.object.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Module;
