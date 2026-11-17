(function () {
  "use strict";

  const form = document.getElementById("prediction-form");
  const button = document.getElementById("predict-button");
  const status = document.getElementById("classifier-status");
  const statusText = document.getElementById("classifier-status-text");
  const result = document.getElementById("prediction-result");
  const resultText = document.getElementById("prediction-text");
  const featureIds = ["sepal-length", "sepal-width", "petal-length", "petal-width"];
  let model;

  function showPrediction(text) {
    resultText.textContent = text;
    result.hidden = false;
  }

  const serverPrediction = result.dataset.prediction;
  if (serverPrediction && !serverPrediction.includes("{{")) {
    showPrediction(serverPrediction);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const measurements = featureIds.map((id) => Number(document.getElementById(id).value));
      const species = window.IrisClassifier.predict(measurements, model);
      showPrediction(`The flower species is ${species}`);
    } catch (error) {
      status.dataset.state = "error";
      statusText.textContent = error.message;
    }
  });

  fetch("static/model.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load the classifier (HTTP ${response.status}).`);
      }
      return response.json();
    })
    .then((modelData) => {
      model = modelData;
      button.disabled = false;
      status.dataset.state = "ready";
      statusText.textContent = "Classifier ready";
    })
    .catch((error) => {
      status.dataset.state = "error";
      statusText.textContent = "Classifier unavailable";
      console.error("Could not initialize the iris classifier.", error);
    });
})();
