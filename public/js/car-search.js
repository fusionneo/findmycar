var inputBar = document.getElementById("data");
// inputBar.getAttribute("title", inputBar.value);
// console.log(inputBar.value);
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

inputBar.addEventListener('click', function(){
    console.log(this.value);
    inputBar.setAttribute("title", this.value);
});

var yearsData = document.getElementById("years");
// inputBar.getAttribute("title", inputBar.value);
// console.log(inputBar.value);
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

yearsData.addEventListener('click', function(){
    console.log(this.value);
    yearsData.setAttribute("title", this.value);
});


