import React from 'react';
import UploadForm from './UploadForm';
import Result from './Result';

function App() {
  return (
    <div className="App">
      <UploadForm />
      {/* The Result component will eventually take props, but for now it can be left empty */}
      <Result />
    </div>
  );
}

export default App;
