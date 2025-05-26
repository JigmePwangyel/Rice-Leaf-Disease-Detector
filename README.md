# Rice Leaf Disease Detector

A web application that detects diseases on rice leaves using deep learning. This project leverages a **VGG19** convolutional neural network model trained with **TensorFlow** to classify images of rice leaves, helping farmers and researchers identify rice diseases quickly and accurately.

---

## Features

- Upload images of rice leaves through a clean and intuitive **React** frontend.
- Backend API built with **Flask** serves the trained VGG19 model for prediction.
- Supports multiple rice leaf disease categories.
- Provides easy-to-understand classification results and confidence scores.

---

## Technology Stack

- **Frontend:** React.js
- **Backend:** Flask (Python)
- **Machine Learning:** TensorFlow (VGG19 pre-trained & fine-tuned)

---

## Screenshots

### Upload Page

![Upload Page](screenshots/ImageUpload.png)  
_Upload rice leaf images for disease detection_

### Result Page

![Result Page](screenshots/result.png)  
_Display classification results with disease name and confidence_

---

## Prerequisites

- Python 3.8 or higher
- Node.js and npm
- TensorFlow 2.x
- Other Python packages (listed in `requirements.txt`)

---

## Installation

### Backend Setup

1. Navigate to the server folder:
   ```bash
   cd Server
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Run the flask app
   ```bash
   python3 server.py
   ```

### Client Setup

1. Navigate to the client folder:
   ```bash
    cd Client
   ```
2. Install Node.js packages

   ```bash
   npm install
   ```

3. Start the React development serve
   ```bash
   npm run dev
   ```

> **Note:**  
> You need to replace the model used in the backend by training your own model.  
> The code for training the model is located in the `Model_Training` folder.  
> After training, update the backend file with the correct model name.
