const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const extractInsuranceData = async (imagePath) => {
  try {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    const fullText = detections[0] ? detections[0].description : '';

    // Simple parsing logic (this can be improved)
    const providerNameMatch = fullText.match(/Provider Name:\s*(.*)/i);
    const policyNumberMatch = fullText.match(/Policy Number:\s*(.*)/i);

    return {
      providerName: providerNameMatch ? providerNameMatch[1] : '',
      policyNumber: policyNumberMatch ? policyNumberMatch[1] : '',
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
};

module.exports = {
  extractInsuranceData,
};