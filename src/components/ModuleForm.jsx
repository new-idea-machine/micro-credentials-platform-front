// ===============================================================================================
// IMPORTS
// ===============================================================================================

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// ===============================================================================================
// COMPONENT DEFINITION
// ===============================================================================================

/************************************************************************************************/

function ModuleForm({ moduleData, onChange, onDelete }) {
  const [localModuleData, setLocalModuleData] = useState(moduleData);

  // Update local state when moduleData prop changes
  useEffect(() => {
    setLocalModuleData(moduleData);
  }, [moduleData]);

  // Handle input changes and update parent
  function handleInputChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    const updatedModule = {
      ...localModuleData,
      [name]: value
    };

    setLocalModuleData(updatedModule);
    onChange(updatedModule);
  }

  // Handle file input changes
  function handleFileChange(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const updatedModule = {
      ...localModuleData,
      file: file,
      url: file ? URL.createObjectURL(file) : ""
    };

    setLocalModuleData(updatedModule);
    onChange(updatedModule);
  }

  // Handle module type selection
  function handleTypeChange(event) {
    event.preventDefault();

    const { value } = event.target;
    const updatedModule = {
      ...localModuleData,
      type: value
    };

    setLocalModuleData(updatedModule);
    onChange(updatedModule);
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0" }}>
      <h3>Module</h3>

      <label htmlFor={`title-${moduleData.id}`}>Module Title</label>
      <br />
      <input
        id={`title-${moduleData.id}`}
        name="title"
        type="text"
        value={localModuleData.title || ""}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor={`description-${moduleData.id}`}>Description</label>
      <br />
      <textarea
        id={`description-${moduleData.id}`}
        name="description"
        value={localModuleData.description || ""}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor={`type-${moduleData.id}`}>Module Type</label>
      <br />
      <select
        id={`type-${moduleData.id}`}
        name="type"
        value={localModuleData.type || "Markdown"}
        onChange={handleTypeChange}
      >
        <option value="Markdown">Markdown</option>
        <option value="Audio">Audio</option>
        <option value="Video">Video</option>
      </select>
      <br />

      <label htmlFor={`url-${moduleData.id}`}>URL (if external)</label>
      <br />
      <input
        id={`url-${moduleData.id}`}
        name="url"
        type="url"
        value={localModuleData.url || ""}
        onChange={handleInputChange}
        placeholder="https://example.com/resource"
      />
      <br />

      <label htmlFor={`file-${moduleData.id}`}>Upload File</label>
      <br />
      <input
        id={`file-${moduleData.id}`}
        name="file"
        type="file"
        onChange={handleFileChange}
        accept={
          localModuleData.type === "Audio"
            ? "audio/*"
            : localModuleData.type === "Video"
            ? "video/*"
            : ".md,.txt"
        }
      />
      <br />

      {localModuleData.file && <p>Selected file: {localModuleData.file.name}</p>}

      <button
        type="button"
        onClick={onDelete}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "5px 10px",
          marginTop: "10px"
        }}
      >
        Delete Module
      </button>
    </div>
  );
}

ModuleForm.propTypes = {
  moduleData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// ===============================================================================================
// EXPORTS
// ===============================================================================================

export default ModuleForm;
