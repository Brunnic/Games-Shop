import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Popup from "react-popup";
import "./utils/Popup.css";

ReactDOM.render(
    <div>
      <App />
      <Popup />
    </div>,
  document.getElementById('root')
);

