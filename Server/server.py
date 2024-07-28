from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg19 import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)
# Load the pre-trained VGG19 model
model = load_model('VGG16_Model_Final.weights.h5')

def predict_image(image_path):
   # Load and preprocess the image
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)
    img_array = img_array.reshape((1, img_array.shape[0], img_array.shape[1], img_array.shape[2]))

    # Make predictions
    predictions = model.predict(img_array)
    # Get the predicted class index 
    predicted_class_index = predictions.argmax(axis=-1)
    # Map class indices to your class labels
    class_labels = ["Bacterial Blight", "Blast", "Brownspot", "Tungro"]
    # Get the predicted class label
    predicted_class_label = class_labels[predicted_class_index[0]]
    # Get the confidence score for the predicted class
    confidence_score = predictions.max()
    return [{'label': predicted_class_label, 'probability': str(confidence_score)}]
    

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    img_file = request.files['image']
    img_path = 'temp.jpg'  # Save the image temporarily
    img_file.save(img_path)

    predictions = predict_image(img_path)

    return jsonify({'predictions': predictions})

if __name__ == '__main__':
    app.run(debug=True)
