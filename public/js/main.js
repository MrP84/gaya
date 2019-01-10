var burgerBtn = $('#burgerBtn');
var mobile = $('#mobile');

burgerBtn.on('click', () => {
  mobile.toggleClass('navigation');
});
