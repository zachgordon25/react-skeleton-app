import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Result from './Result';

function UploadForm() {
  const [resultData, setResultData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResultData(data);
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
          padding: '20px',
          color: 'orange',
          backgroundColor: 'black',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {resultData && <Result filename={resultData.filename} imageData={resultData.imageData} />}
    </div>
  );
}

export default UploadForm;
