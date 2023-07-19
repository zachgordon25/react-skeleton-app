import React, { useState } from 'react';
import Result from './Result';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [resultData, setResultData] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();
    if (!file) return;

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
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="file" onChange={onFileChange} />
        <input type="submit" value="Upload" />
      </form>
      {resultData && <Result filename={resultData.filename} imageData={resultData.imageData} />}
    </div>
  );
}

export default UploadForm;
