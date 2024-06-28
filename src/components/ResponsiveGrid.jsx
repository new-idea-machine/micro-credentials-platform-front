// ============================================================================
// IMPORTS
// ============================================================================

import PropTypes from "prop-types";

function ResponsiveGrid({ minColumnWidth, rowGap, children }) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, ${minColumnWidth})`,
    rowGap,
    placeItems: "center start",
    minHeight: "fit-content"
  };

  return <div style={style}>{children}</div>;
}

ResponsiveGrid.propTypes = {
  minColumnWidth: PropTypes.string.isRequired,
  rowGap: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ResponsiveGrid;
