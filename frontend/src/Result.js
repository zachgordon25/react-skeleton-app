import React from 'react';

function Result({ filename, imageData }) {
  return (
    <div>
      <h1>Image uploaded and processed</h1>
      <img src={`data:image/png;base64,${imageData}`} alt="Skeleton" />
      <a href={`data:image/png;base64,${imageData}`} download={`${filename}-skeleton.png`}>
        Download skeleton image
      </a>
    </div>
  );
}

export default Result;
