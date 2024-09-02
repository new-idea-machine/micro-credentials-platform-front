import React, { useState, useEffect } from "react";
import { sendRequest } from "../scripts/sendrequest.js"; // Import sendRequest

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT; // Import the server URL from environment variables

function FilePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all uploaded files when the component mounts
    fetchUploadedFiles();
  }, []);

  /**
   * Fetches all uploaded files from the server and generates preview URLs for them.
   */
  const fetchUploadedFiles = async () => {
    try {
      const [response, data] = await sendRequest("GET", `${serverURL}/files`);
      if (response && response.ok) {
        setUploadedFiles(data);
      } else {
        throw new Error("Failed to fetch files");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Handles the file selection and generates preview URLs for the selected files.
   */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFilePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  /**
   * Handles the file upload process, sending the selected files to the server.
   */
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError("Please select one or more files to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const [response, data] = await sendRequest(
        "POST",
        `${serverURL}/files/upload`,
        null,
        formData
      );

      if (response && response.ok) {
        setError(null);
        setUploadedFiles([...uploadedFiles, ...data]); // Add the new files to the list
        setSelectedFiles([]); // Clear the selected files
        setFilePreviews([]); // Clear the previews
      } else {
        throw new Error(data || "File upload failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Handles the file deletion process, removing the file from both the server and Google Drive.
   */
  const handleFileDelete = async (fileID) => {
    try {
      const [response] = await sendRequest("DELETE", `${serverURL}/files/${fileID}`);
      if (response && response.ok) {
        setUploadedFiles(uploadedFiles.filter((file) => file._id !== fileID));
      } else {
        throw new Error("Failed to delete file");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Renders previews of the files that have been selected for upload but not yet uploaded.
   */
  const renderPreviews = () => {
    if (filePreviews.length === 0) return null;

    return (
      <div>
        <h2>File Previews</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {filePreviews.map((preview, index) => {
            const fileType = selectedFiles[index].type.split("/")[0];
            return (
              <div key={index} style={{ maxWidth: "200px" }}>
                {fileType === "image" && (
                  <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
                )}
                {fileType === "video" && (
                  <video controls src={preview} style={{ maxWidth: "100%" }} />
                )}
                {fileType === "audio" && <audio controls src={preview} />}
                {fileType !== "image" && fileType !== "video" && fileType !== "audio" && (
                  <p>Preview not available for this file type.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * Renders the list of uploaded files, including the option to delete them and preview.
   */
  const renderUploadedFiles = () => {
    if (uploadedFiles.length === 0) {
      return <p>No files uploaded yet.</p>;
    }

    return (
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file._id}>
            <a
              href={`${serverURL}/drive/file/${file.driveId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.filename}
            </a>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {renderPreviewForFile(file)}
            </div>
            <button onClick={() => handleFileDelete(file._id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  };

  /**
   * Renders a preview for the file based on its MIME type.
   */
  const renderPreviewForFile = (file) => {
    const fileType = file.mimeType.split("/")[0];
    const fileUrl = `${serverURL}/drive/file/${file.driveId}`;

    switch (fileType) {
      case "image":
        return (
          <img
            src={fileUrl}
            alt="File Preview"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        );
      case "video":
        return (
          <video controls src={fileUrl} style={{ maxWidth: "100%", maxHeight: "300px" }} />
        );
      case "audio":
        return <audio controls src={fileUrl} />;
      default:
        return <p>Preview not available for this file type.</p>;
    }
  };

  return (
    <div>
      <h1>Upload and Manage Files</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Upload</button>
      </form>

      <div style={{ marginTop: "20px" }}>{renderPreviews()}</div>

      <div style={{ marginTop: "20px" }}>
        <h2>Uploaded Files</h2>
        {renderUploadedFiles()}
      </div>
    </div>
  );
}

export default FilePage;
