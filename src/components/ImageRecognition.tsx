import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "bootstrap/dist/css/bootstrap.min.css";
import RotateLoader from "react-spinners/RotateLoader";

const ImageRecognition: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<
    Array<{ className: string; probability: number }>
  >([]);
  const [isClassifying, setIsClassifying] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const initializeTf = async () => {
      await tf.ready();
      console.log("TensorFlow.js is ready.");
    };
    initializeTf();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPredictions([]);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClassification = async () => {
    setIsClassifying(true);
    if (imageRef.current) {
      const net = await mobilenet.load();
      const img = imageRef.current;
      const results = await net.classify(img);
      setPredictions(results);
    }
    setIsClassifying(false);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Image Recognition</h1>
      <div className="mb-4">
        <input
          type="file"
          className="form-control"
          onChange={handleImageUpload}
        />
        <div className="d-flex align-items-center mt-3">
          <button
            className="btn btn-primary"
            onClick={handleImageClassification}
            disabled={isClassifying}
          >
            Recognize Image
          </button>
          <div className="ml-3" style={{marginLeft: '35px'}}>
            <RotateLoader color={"#007bff"} loading={isClassifying} size={35} />
          </div>
        </div>
        {predictions.length > 0 && (
          <div className="alert alert-success mt-3" role="alert">
            The predicted class is:
            <ul>
              {predictions.map((pred, index) => (
                <li key={index}>
                  {pred.className}: {(pred.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
        {image && (
          <div className="text-center mt-3">
            <img
              src={image}
              alt="Upload"
              ref={imageRef}
              className="img-fluid"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognition;
