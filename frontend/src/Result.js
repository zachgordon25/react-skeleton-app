import React from 'react';

function Result({ filename, imageData }) {
  return (
    <div>
      <h1>Image uploaded and processed</h1>
      <img
        src={`data:image/png;base64,${imageData}`}
        alt="Skeleton"
        style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
      />
      <p style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)', padding: '10px' }}>
        <a
          href={`data:image/png;base64,${imageData}`}
          download={`${filename}-skeleton.png`}
          style={{ color: 'orange', fontSize: '20px', fontFamily: 'Arial' }}
        >
          Download skeleton image
        </a>
      </p>
    </div>
  );
}

export default Result;
