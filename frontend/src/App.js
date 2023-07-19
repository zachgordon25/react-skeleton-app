import React from 'react';
import './App.css';
import UploadForm from './UploadForm';

function App() {
  return (
    <div className="App">
      <h1>Skeleton Generator</h1>
      <p>Upload an image and the app will generate a skeleton based on the image.</p>
      <UploadForm />
    </div>
  );
}

export default App;
