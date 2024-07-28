import dummyImage from "./dummy.jpeg";
import "./SelectedImage.css";
function SelectedImage({ image, disease, confidence }) {
  return (
    <div className="Wrapper">
      <div className="UploadedImageContent">
        <img src={image.src} className="Image" />
      </div>
      {disease && confidence !== null && (
        <div className="TextWrapper">
          <span className="Text">
            Your Disease is <span className="diseaseName">{disease}</span>. The
            prediction accuracy is{" "}
            <span className="diseaseName">{confidence}%</span>
          </span>
        </div>
      )}
    </div>
  );
}
export default SelectedImage;
