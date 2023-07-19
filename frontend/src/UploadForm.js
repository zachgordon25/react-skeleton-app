import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Result from './Result';

function UploadForm() {
  // const [file, setFile] = useState(null); // unused vars
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true); // Set loading to true when the image is uploaded
    setError(null); // Clear any previous errors

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResultData(data);
        setLoading(false); // Set loading to false when the image is received
      })
      .catch((error) => {
        setError('An error occurred while processing the image. Please try again.');
        setResultData(null); // Clear any previously uploaded image
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          fontFamily: 'Creepster',
          border: '1px dashed orange',
          padding: '40px',
          color: 'orange',
          backgroundColor: 'black',
        }}
      >
        <label for="file-upload">Upload an image</label>
        <input {...getInputProps()} id="file-upload" />

        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {loading && <p>Processing image...</p>}
      {error && <p>{error}</p>}
      {resultData && <Result filename={resultData.filename} imageData={resultData.imageData} />}
    </div>
  );
}

export default UploadForm;
