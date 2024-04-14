"use strict";
// Script for Calculator Calculator

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

// Copied text notifier
const copyNotifier = document.getElementById("copyNotifier");

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
    // Prevent Lag
    sides = Math.min(314, ${n})
    let ctx = canvas.getContext("2d");
    let centerX = canvas.width * 0.45;
    let centerY = canvas.height / 2;
    let radius = Math.min(canvas.width, canvas.height) * 0.4

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;

    let angle = (Math.PI * 2) / sides;
    // Draw Shape
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
    ctx.strokeStyle = "red";3
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius * Math.cos(1 * angle), centerY + radius * Math.sin(1 * angle));
    ctx.closePath();
    ctx.stroke();

    ctx.font = "bold 24px serif";
    ctx.fillStyle = "red";
    ctx.fillText("s", centerX + 1.1 * radius * Math.cos(0.5 * angle), centerY + 1.1 * radius * Math.sin(0.5 * angle));

    
    }

    main();
    `

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
  outputResult.style.visibility = "visible";
  drawPolygon(mainCanvas, n);

  copyHtmlBtn.style.visibility = "visible";
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
  // Prevent Lag from Big Numbers
  n = Math.min(314, n)

  let ctx = canvas.getContext("2d");
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let radius = Math.min(canvas.width, canvas.height) * 0.4

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 12;

  let angle = (Math.PI * 2) / n;
  // Draw Shape
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

function invalidInput(canvas, msg) {
  let ctx = canvas.getContext("2d");
  let centerX = canvas.width / 2;
  let centerY = canvas.height * 0.7;
  let radius = Math.min(canvas.width, canvas.height) * 0.3

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `bold 96px serif`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("🚫", centerX, centerY);

  ctx.font = `bold 20px serif`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(msg, centerX, canvas.height * 0.95);
}

// Input Validation
function validateAndDraw() {
  if (sidesInput.value === "") {
    calculateBtn.disabled = true;
  }
  else if (!RegExp("^[0-9]*$").test(sidesInput.value)) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input must be a positive Integer!")
  }
  else if (Number(sidesInput.value) < 3) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input has to be bigger than 2!")
  }
  else if (Number(sidesInput.value) > 9999999) {
    calculateBtn.disabled = true;
    invalidInput(mainCanvas, "Input too big!")
  }
  else {
    calculateBtn.disabled = false;
    drawPolygon(mainCanvas, Number(sidesInput.value))
  }
}
sidesInput.oninput = validateAndDraw;
//Initially disable button
validateAndDraw()

//Hide Initial Div and copy button
outputResult.style.visibility = "hidden"
copyHtmlBtn.style.visibility = "hidden"