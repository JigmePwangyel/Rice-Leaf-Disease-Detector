import "./Button.css";

function Button({ onClick }) {
  return (
    <div className="ButtonWrapper">
      <div className="Button" onClick={onClick}>
        <span className="ButtonText">Check</span>
      </div>
    </div>
  );
}

export default Button;
