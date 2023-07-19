import React from 'react';
import './App.css';
import UploadForm from './UploadForm';

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)', padding: '10px' }}>
        <h1 style={{ textShadow: '2px 2px black' }}>Skeleton Generator</h1>
        <p style={{ textShadow: '2px 2px black' }}>
          Upload an image and the app will generate a skeleton based on the image.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}

export default App;
