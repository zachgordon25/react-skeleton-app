import React, { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
      });
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={submitForm}>
      <input type="file" onChange={onFileChange} />
      <input type="submit" value="Upload" />
    </form>
  );
}

export default UploadForm;
