import "./card.css";
import uploadImage from "../../assets/upload.gif";

import Button from "../Button/Button";
import SelectedImage from "./SelectedImage/SelectedImage";
import sendImageForPrediction from "../../services/apiService";
import { useState } from "react";

function Card() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [disease, setDisease] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false); //To be implemented soon
  //For handling Image Uploads
  //The image is read as an HTMLImageElement
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setSelectedImage(img);
      };
      img.src = reader.result;
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handlePrediction = (event) => {
    setLoading(true);
    sendImageForPrediction(selectedImage)
      .then((data) => {
        console.log(data);
        const prediction = data.predictions[0];
        const label = prediction.label;
        const probability = parseFloat(prediction.probability) * 100;

        setDisease(label);
        setConfidence(probability);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card">
      <div className="header">
        <span className="title">Rice Leaf Disease Detection</span>
      </div>
      <div className="main">
        <div className="m1">
          <div className="m2">
            <span className="uploadHeader">Upload Images</span>
            <span className="uploadBody">
              Start by adding rice leaf image to check for disease
            </span>
          </div>
          <div>
            <div className="imageArea">
              {!selectedImage && loading == false ? (
                <div className="imageAreaContent">
                  <div>
                    <div className="GifImage">
                      <img src={uploadImage} className="uploadGif" />
                    </div>
                    <div className="uploadText">
                      <span>
                        Drag and Drop your image here or{" "}
                        <label className="uploadLink">
                          <input
                            type="file"
                            accept="image/*"
                            className="ImageInput"
                            onChange={handleImageChange}
                          />
                          browse files
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <SelectedImage
                  image={selectedImage}
                  disease={disease}
                  confidence={confidence}
                />
              )}
            </div>
            <Button onClick={handlePrediction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
