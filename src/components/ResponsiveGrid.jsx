// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

function ResponsiveGrid({ minColumnWidth, rowGap, children }) {
  /*
  Return a <div> element with a CSS grid whose number of columns changes to fit the containing
  element.

  "minColumnWidth" (string, required) is the minimum width that each column can be.  It MUST be
  a valid CSS length value, including unit (e.g.  "100px", "20em").  Columns will widen to fill
  the width of the containing element's content area.

  "rowGap" (string, required) is the size of the CSS grid row line(s) -- that is, the distance
  between CSS grid row tracks.  It MUST be a valid CSS length value, including unit (e.g.
  "20px", "1em").

  "children" (object, auto-generated) is this component's nested content.
  */

  const lengthFormat = /^(?:0|(?:\d+\D+))$/;

  if (!lengthFormat.test(minColumnWidth)) {
    throw new Error('"minColumnWidth" must be a valid CSS length', { cause: minColumnWidth });
  }

  if (!lengthFormat.test(rowGap)) {
    throw new Error('"rowGap" must be a valid CSS length', { cause: rowGap });
  }

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, ${minColumnWidth})`,
    justifyContent: "space-between",
    rowGap,
    placeItems: "center start",
    minHeight: "min-content"
  };

  return <div style={style}>{children}</div>;
}

ResponsiveGrid.propTypes = {
  minColumnWidth: PropTypes.string.isRequired,
  rowGap: PropTypes.string.isRequired,
  children: PropTypes.node
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default ResponsiveGrid;
