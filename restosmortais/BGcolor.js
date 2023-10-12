document.addEventListener("DOMContentLoaded", function () {
    loadColor();
  
    var colorButton = document.getElementById("colorButton");
    colorButton.addEventListener("click", toggleColorPicker);
  
    var colorButtons = document.querySelectorAll(".color-option");
    colorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var color = button.style.backgroundColor;
            changeColor(color);
        });
    });
  });
  
  function changeColor(color) {
    document.getElementsByTagName('body')[0].style.backgroundColor = color;
    saveBackgroundColor(color);
  }
  
  function saveBackgroundColor(hexadecimalColor) {
    localStorage.setItem('background-color', hexadecimalColor);
  }
  
  function loadColor() {
    var backgroundColor = localStorage.getItem('background-color');
    if (backgroundColor) {
        changeColor(backgroundColor);
    }
  }
  
  function toggleColorPicker() {
    var colorSelector = document.getElementById('colors');
    if (colorSelector.style.display === 'none' || colorSelector.style.display === "") {
        colorSelector.style.display = 'block';
    } else {
        colorSelector.style.display = 'none';
    }
  }