var burgerBtn = $('#burgerBtn');
var mobile = $('#mobile');
var navLink = $(".nav-link");

burgerBtn.on('click', () => {
  mobile.toggleClass('navigation');
});

// Opacité de la flèche pour remonter
$('#goBack').css('opacity',0);

$(document).on('scroll',function(){
  let opacite;
  opacite = 0.2 + $(document).scrollTop() / ($(document).outerHeight(true)) ;
  $('#goBack').css('opacity', opacite);
});

// Effet Parallax

function parallaxIt() {
  // définition des variables
  var $fwindow = $(window);
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  var $contents = [];
  var $backgrounds = [];

  // pour chaque élément de contenu
  $('[data-type="content"]').each(function(index, e) {
    var $contentObj = $(this);

    $contentObj.__speed = ($contentObj.data('speed') || 1);
    $contentObj.__fgOffset = $contentObj.offset().top;
    $contents.push($contentObj);
  });

  // pour chacun des éléments de background
  $('[data-type="background"]').each(function() {
    var $backgroundObj = $(this);

    $backgroundObj.__speed = ($backgroundObj.data('speed') || 1);
    $backgroundObj.__fgOffset = $backgroundObj.offset().top;
    $backgrounds.push($backgroundObj);
  });

  // mise à jour du positionnement
  $fwindow.on('scroll resize', function() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    $contents.forEach(function($contentObj) {
      var yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

      $contentObj.css('top', yPos);
    })

    $backgrounds.forEach(function($backgroundObj) {
      var yPos = -((scrollTop - $backgroundObj.__fgOffset) / $backgroundObj.__speed);

      $backgroundObj.css({
        backgroundPosition: '50% ' + yPos + 'px'
      });
    });
  });

  // rafraïchissement par tirage de la fenêtre
  $fwindow.trigger('scroll');
};

// Slider de comparaison

function initComparisons() {
  var x, i;
  // tableau de tous les éléments de classe "img-comp-overlay"
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    // Application d'une fonction de comparaison pour chacun des éléments du tableau
    compareImages(x[i]);
  }
  //fonction de comparaison
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    // Récupération des infos de l'image à comparer
    w = img.offsetWidth;
    h = img.offsetHeight;
    // mise à 50% des images
    img.style.width = (w / 2) + "px";

    // création du bouton...
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    // ...et insertion...
    img.parentElement.insertBefore(slider, img);
    // ... au milieu des 2 images
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    // exécution d'une fonction lorsque le bouton est touché ou cliqué
    slider.addEventListener("mousedown", slideReady);

    window.addEventListener("mouseup", slideFinish);

    slider.addEventListener("touchstart", slideReady);

    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      // exécution lorsque le slider se déplace
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      // récupération de la position en x
      pos = getCursorPos(e)
      // empêche le slider de sortir de l'image
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;

      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      // positionne le slider
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

// Appel des fonctions
initComparisons();

parallaxIt();
