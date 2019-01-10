var burgerBtn = document.getElementById('burgerBtn');
var mobile = document.getElementById('mobile');
var demo1 = document.getElementById('demo1');
var demo2 = document.getElementById('demo2');
var demo3 = document.getElementById('demo3');

burgerBtn.addEventListener('click', function() {
  mobile.classList.toggle('navigation');
}, false);
