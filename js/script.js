"use strict";
// Script for Calculator Calculator

// Elements
const sidesInput = document.getElementById('sidesInput');
const unitTypeInput = document.getElementById('unitTypeInput');

// Calculate/Creation Button
const calculateBtn = document.getElementById('CalculateBtn');

// Output Result
const outputResult = document.getElementById('outputResult');

// Code for Calculator Calculator
function Calculate() {

  // Get Amount of sides, n
  let n = Number(sidesInput.value);
  // Get Unit Type
  let unitType = unitTypeInput.value;
  // Get Unit Type
  // In Progress

  // Create container for calculator
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "mainDiv");

  // Create Header Title
  let headerTitle = document.createElement("h1");
  headerTitle.innerText = "Polygon Calculator"

  // Create Input Label
  let inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "sideLengthInput")
  inputLabel.innerText = `Enter side length (${unitType}): `
  // Create Input element
  let sideLengthInput = document.createElement("input");
  sideLengthInput.setAttribute("type", "number");
  sideLengthInput.setAttribute("id", "sideLengthInput");
  sideLengthInput.setAttribute("name", "sideLengthInput");
  // Create Calculate Button
  let calcBtn = document.createElement("button");
  calcBtn.innerText = "Calculate!"
  calcBtn.setAttribute("id", "calcBtn")
  // Create result Displays
  let areaResult = document.createElement("b");
  areaResult.innerText = "?";
  areaResult.setAttribute("id", "areaResult");
  let periResult = document.createElement("b");
  periResult.innerText = "?";
  periResult.setAttribute("id", "periResult");

  // Create Script Tag
  let scriptTag = document.createElement("script");
  scriptTag.setAttribute("type");
  scriptTag.defer = true;

  // Create script
  let constructedScript =
    `
    // Elements
    // Input
    const sideLengthInput = document.getElementById('sideLengthInput');
    // Calculate Button
    const calcBtn = document.getElementById('calcBtn');
    // Result Displays
    const areaResult = document.getElementById('areaResult');
    const periResult = document.getElementById('periResult');
    
    function Calculate() {

      // Get Input
      let sideLength = sideLengthInput.value;

      // Calculate Area
      let area = 2;
      // Calculate Perimeter
      let peri = sideLength * ${n};

      // Round answers up to 2 decimal places, if needed
      if (area % 1 != 0) {
        area = area.toFixed(2);
      }
      if (peri % 1 != 0) {
        peri = peri.toFixed(2);
      }

      // Display Result
      volumeResult.innerHTML = "" + volume + "m<sup>3</sup>";
      return;
    }
    `

  // Construct
  mainDiv.appendChild(headerTitle);
  mainDiv.appendChild(inputLabel);
  mainDiv.appendChild(sideLengthInput);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(calcBtn);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(areaResult);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(periResult);
  // Display Result
  outputResult.innerHTML = ""
  outputResult.appendChild(mainDiv)
}

// Connect button click to the Calculate() function, 
calculateBtn.onclick = Calculate;