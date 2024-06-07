// src/App.tsx
import React from "react";
import ImageRecognition from "./components/ImageRecognition";
import FloatingIcon from "./FloatingIcon";

const App: React.FC = () => {
  return (
    <div className="App">
      <header
        className="d-flex justify-content-center align-items-center mb-5"
        style={{ backgroundColor: "#f0f0f0", padding: "2rem" }}
      >
        <h3 className="text-center text-dark">
          Image Recognition - React + Vite + TS + Tensorflow + Bootstrap CSS
        </h3>
      </header>
      <ImageRecognition />
      <FloatingIcon />
    </div>
  );
};

export default App;
