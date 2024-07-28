//apiService.js

//This function converts HTMLimageElement into image.jpeg format.
//This is done because you server don't process HtmlImageElement
function convertImageToBlob(imageElement) {
  return new Promise((resolve, reject) => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match image
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Draw image onto canvas
    ctx.drawImage(imageElement, 0, 0);

    // Convert canvas to JPEG blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to convert image to blob"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.9
    ); // 0.9 is the quality (0.0 - 1.0)
  });
}

const sendImageForPrediction = (selectedImage) => {
  return new Promise((resolve, reject) => {
    if (!selectedImage) {
      reject(new Error("No Image Selected"));
      return;
    }

    // Convert HTMLImageElement to JPEG blob
    convertImageToBlob(selectedImage)
      .then((blob) => {
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append("image", blob);

        // Make a POST Request to the API
        fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            // Handling Response
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to send image to the server");
            }
          })
          .then((data) => {
            // Resolve with the response data
            resolve(data);
          })
          .catch((error) => {
            // Reject with the error
            reject(error);
          });
      })
      .catch((error) => {
        // Reject with the conversion error
        reject(error);
      });
  });
};

export default sendImageForPrediction;
