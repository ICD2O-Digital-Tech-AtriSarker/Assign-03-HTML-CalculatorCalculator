"use strict";
/*
* Created by: Atri Sarker
* Created on: April, 2024
* Description: This file contains the script.js for the Calculator Calculator, a widget that takes in integer input, n and calculates the html code for the calculator of a regular n-sided polygon.
*/

// Elements
const sidesInput = document.getElementById("sidesInput");
const unitTypeInput = document.getElementById("unitTypeInput");

// Calculate/Creation Button
const calculateBtn = document.getElementById("CalculateBtn");

// Output Result
const outputResult = document.getElementById("outputResult");

// Main Canvas
const mainCanvas = document.getElementById("mainCanvas");

// Copy HTML button
const copyHtmlBtn = document.getElementById("copyHtmlBtn");

// Copied text notifier [ Snackbar ]
const copyNotifier = document.getElementById("copyNotifier");

// Code for Calculator Calculator
function Calculate() {

  // Get Amount of sides, n
  let n = Number(sidesInput.value);
  // Get Unit Type
  let unitType = unitTypeInput.value;

  // Create container for calculator
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "mainDiv");

  // Create Header Title
  let headerTitle = document.createElement("h3");
  headerTitle.innerText = `Area+Perimeter of a Regular ${n}-sided Polygon`;

  // Create Form for input validation
  let formElement = document.createElement("form");
  formElement.setAttribute("id", "calculateForm");

  // Create Table for layout
  let table = document.createElement("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td1 = document.createElement("td");
  tr.appendChild(td1);

  let td2 = document.createElement("td");
  tr.appendChild(td2);

  // Create Input Label
  let inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "sideLengthInput");
  inputLabel.innerText = `Enter side length (${unitType}): `;
  // Create Input element
  let sideLengthInput = document.createElement("input");
  sideLengthInput.setAttribute("type", "number");
  sideLengthInput.setAttribute("step", "0.001");
  sideLengthInput.setAttribute("min", "0");
  sideLengthInput.setAttribute("id", "sideLengthInput");
  sideLengthInput.setAttribute("name", "sideLengthInput");
  // Create Canvas
  let polygonDisplay = document.createElement("canvas");
  polygonDisplay.setAttribute("id", "polygonDisplay")
  polygonDisplay.setAttribute("width", "100%");
  polygonDisplay.setAttribute("height", "auto");
  // Create Calculate Button
  let calcBtn = document.createElement("button");
  calcBtn.innerText = "Calculate!";
  calcBtn.setAttribute("id", "calcBtn");
  calcBtn.setAttribute("type", "submit");
  // Create result Displays
  let areaPreMsg = document.createElement("p");
  areaPreMsg.innerText = "The Area is ";
  let areaResult = document.createElement("b");
  areaResult.innerText = "?";
  areaResult.setAttribute("id", "areaResult");
  areaPreMsg.appendChild(areaResult);

  // Create labels/holders for results
  let periPreMsg = document.createElement("p");
  periPreMsg.innerText = "The Perimeter is ";
  let periResult = document.createElement("b");
  periResult.innerText = "?";
  periResult.setAttribute("id", "periResult");
  periPreMsg.appendChild(periResult);

  // Create Script Tag
  let scriptTag = document.createElement("script");
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.defer = true;

  // Create script
  let constructedScript =
    `
    function main() {
    // Elements
    // Input
    let lengthInput = document.getElementById("sideLengthInput");
    // Calculate Button
    let calcBtn = document.getElementById("calcBtn");
    // Calculate Form
    let calcForm = document.getElementById("calculateForm");
    // Canvas
    let canvas = document.getElementById("polygonDisplay");
    // Result Displays
    let areaResult = document.getElementById("areaResult");
    let periResult = document.getElementById("periResult");

    // Calculation function
    function Calculate() {

      // Get Input
      let sideLength = lengthInput.value;

      // Calculate Area
      let area =  ${n} * (1/4) * (sideLength**2) * Math.tan((0.5 - 1/${n})*Math.PI);
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
      areaResult.innerHTML = "" + area + "${unitType}<sup>2</sup>";
      periResult.innerHTML = "" + peri + "${unitType}";
      return;
    }

    // Connect Button Click to form validation + calculation
    calcForm.onsubmit = function() {
      Calculate();
      return false;
    }

    // Draw Polygon
    // Get amount of sides, maximum of 314 to prevent lag
    sides = Math.min(314, ${n})
    
    // Get canvas render/draw element
    let ctx = canvas.getContext("2d");
    
    // Get center of shape
    let centerX = canvas.width * 0.45;
    let centerY = canvas.height / 2;

    // Radius, dictates the size of the shape
    let radius = Math.min(canvas.width, canvas.height) * 0.4

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get angle to rotate for each point (radians)
    let angle = (Math.PI * 2) / sides;
    
    // Draw Shape
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    for (let i = 1; i <= sides; i++) {
      let vertexX = centerX + radius * Math.cos(i * angle);
      let vertexY = centerY + radius * Math.sin(i * angle);
      ctx.lineTo(vertexX, vertexY);
    }
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    // Draw Red Line
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius * Math.cos(1 * angle), centerY + radius * Math.sin(1 * angle));
    ctx.closePath();
    ctx.stroke();

    // Draw label for red line
    ctx.font = "bold 24px serif";
    ctx.fillStyle = "red";
    ctx.fillText("s", centerX + 1.1 * radius * Math.cos(0.5 * angle), centerY + 1.1 * radius * Math.sin(0.5 * angle));

    
    }

    // Call the main() function
    main();
    `

  // Insert script into script tag
  scriptTag.text = constructedScript;

  // Construct
  mainDiv.appendChild(headerTitle);
  td1.appendChild(inputLabel);
  td1.appendChild(sideLengthInput);
  td2.appendChild(polygonDisplay);
  formElement.appendChild(table);
  formElement.appendChild(calcBtn);
  mainDiv.appendChild(formElement);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(areaPreMsg);
  mainDiv.appendChild(periPreMsg);
  // Script at end, so all elements load first
  mainDiv.appendChild(scriptTag);

  // Display Result
  outputResult.innerHTML = "";
  outputResult.appendChild(mainDiv);

  // Show external output elements
  outputResult.style.visibility = "visible";
  copyHtmlBtn.style.visibility = "visible";

  // Connect [Copy HTML] button click to copying the html onto clipboard
  let htmlCode = outputResult.innerHTML;
  copyHtmlBtn.onclick = function() {
    navigator.clipboard.writeText(htmlCode);
    // Snackbar
    let data = { message: "Copied!", timeout: 400 };
    copyNotifier.MaterialSnackbar.showSnackbar(data);
  }
  return;
}

// Connect button click to the Calculate() function, 
calculateBtn.onclick = Calculate;

// Canvas Drawing Function
function drawPolygon(canvas, n) {
  // maximum of 314 sides to prevent lag
  n = Math.min(314, n)

  // Get render/draw element
  let ctx = canvas.getContext("2d");

  // Center for shape
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;

  // Radius, dictates the size of the shape
  let radius = Math.min(canvas.width, canvas.height) * 0.4

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get angle to rotate for each point/vertex (radians)
  let angle = (Math.PI * 2) / n;

  // Draw Shape
  ctx.lineWidth = 12;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(centerX + radius, centerY);
  for (let i = 1; i <= n; i++) {
    let vertexX = centerX + radius * Math.cos(i * angle);
    let vertexY = centerY + radius * Math.sin(i * angle);
    ctx.lineTo(vertexX, vertexY);
  }
  ctx.closePath();
  ctx.stroke();
}

// Function to display message when input is invalid
function invalidInput(canvas, msg) {

  // Get canvas render/draw element
  let ctx = canvas.getContext("2d");

  // Get center for the emoji/crossout shape
  let centerX = canvas.width / 2;
  let centerY = canvas.height * 0.7;

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw crossout emoji
  ctx.font = `bold 96px serif`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("🚫", centerX, centerY);

  // Draw red text with the message underneath the crossout
  ctx.font = `bold 20px serif`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(msg, centerX, canvas.height * 0.95);
}

// Input Validation
function validateAndDraw() {
  // Empty Input Check
  if (sidesInput.value === "") {
    calculateBtn.disabled = true;
  }
  // Positive Integer Check
  else if (!RegExp("^[0-9]*$").test(sidesInput.value)) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input must be a positive Integer!")
  }
  // Greater than 3 Check
  else if (Number(sidesInput.value) < 3) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input has to be bigger than 2!")
  }
  // Input too big Check
  else if (Number(sidesInput.value) > 9999999) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input too big!")
  }
  // Valid input, enable the button and draw shape with input
  else {
    calculateBtn.disabled = false;
    drawPolygon(mainCanvas, Number(sidesInput.value))
  }
}

// Connect input-change to validation function
sidesInput.oninput = validateAndDraw;
//Initially disable button
validateAndDraw()

//Initially Hide Div and [ Copy HTML ] button
outputResult.style.visibility = "hidden"
copyHtmlBtn.style.visibility = "hidden"