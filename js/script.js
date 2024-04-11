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


  // Construct
  mainDiv.appendChild(headerTitle);
  mainDiv.appendChild(inputLabel);
  mainDiv.appendChild(sideLengthInput);

  // Display Result
  outputResult.innerHTML = ""
  outputResult.appendChild(mainDiv)
}

// Connect button click to the Calculate() function, 
calculateBtn.onclick = Calculate;