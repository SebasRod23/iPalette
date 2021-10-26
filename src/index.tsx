import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return (
    <div>
      <h1>iPalette v2</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
