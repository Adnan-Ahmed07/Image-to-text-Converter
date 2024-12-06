// Add a "click" event listener to the button with the ID "convertButton"
document.getElementById("convertButton").addEventListener("click", () => {
  // Get the input element where the user uploads the image
  const imageInput = document.getElementById("imageInput");
  // Get the element where the extracted text or error message will be displayed
  const output = document.getElementById("output");

  // Check if the user has uploaded a file
  if (imageInput.files.length === 0) {
    // If no file is uploaded, show an error message in the "output" element
    output.textContent = "Please upload an image first.";
    return; // Stop the function execution
  }

  // Get the first file (image) from the file input
  const imageFile = imageInput.files[0];

  
  const reader = new FileReader();

  
  reader.onload = () => {
   
    const imageSrc = reader.result;

    
    Tesseract.recognize(
      imageSrc, // The image data
      "eng", 
      {
       
        logger: (info) => console.log(info),
      }
    )
      .then(({ data: { text } }) => {
      
        output.textContent = text;
      })
      .catch((error) => {
        
        output.textContent = `Error: ${error.message}`;
      });
  };

 
  reader.readAsDataURL(imageFile);
});