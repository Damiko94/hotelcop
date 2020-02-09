/** ****************** **
 *
 *        DAMIEN
 *
 *  ****************** **/
// fonction pour la page presse, au clic sur un article, affichage de l'artcile dasn une fentre modale
function openModal (e){
  document.querySelector(".img-modale").setAttribute("src", "images/presse/"+e+".jpg");
  document.getElementById("modal1").style.display="flex";
  document.getElementById("modal1").style.width="100%";
  document.getElementById("modal1").style.height="100%";
} 
function closeModal(){
  document.querySelector(".img-modale").setAttribute("src", "");
  document.getElementById("modal1").style.display="none";
}
function appear(a){
  document.querySelector(a).style.opacity="1";
  console.log('hello');
}
/* fonction pour tester si un élément est dans le viewport*/
var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
/**
* selectionne un element et vérifie si il se trouve sur l'écran au moment du scroll
* s'il l'élement se trouve sur l'écran, déclanchement d'une animation, pour faire apparaitre une image au du texte
*/
// animation de la page restaurant
window.addEventListener('scroll', function (event) {
if (isInViewport(cuisto)) {
      restau.style.opacity="1";
      document.querySelector(".test-anim").style.left="0"; 
      document.querySelector(".test-anim").style.opacity="1";
    }    
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(brasserie)) {
      brass.style.opacity="1";
      document.querySelector(".test-anim1").style.left="0"; 
      document.querySelector(".test-anim1").style.opacity="1"; 
  }
  
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(degustation)) {
      degust.style.opacity="1";
      document.querySelector(".test-anim2").style.left="0"; 
      document.querySelector(".test-anim2").style.opacity="1"; 
  }
  
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(diner)) {
      din.style.opacity="1";
      document.querySelector(".test-anim3").style.left="0"; 
      document.querySelector(".test-anim3").style.opacity="1"; 
  }
}, false);
// animation de la page chambres
window.addEventListener('scroll', function (event) {
  if (isInViewport(classique)) {
      classi.style.opacity="1";
      document.querySelector(".test-anim2").style.left="0"; 
      document.querySelector(".test-anim2").style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(confort)) {
      conf.style.opacity="1";
      document.querySelector(".test-anim1").style.left="0"; 
      document.querySelector(".test-anim1").style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(lux)) {
      deluxe.style.opacity="1";
      document.querySelector(".test-anim4").style.left="0"; 
      document.querySelector(".test-anim4").style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(sui)) {
      suite.style.opacity="1";
      document.querySelector(".test-anim5").style.left="0"; 
      document.querySelector(".test-anim5").style.opacity="1";
  }
}, false);
// animation page d'acceuil
window.addEventListener('scroll', function (event) {
  if (isInViewport(chambres)) {
      chambres.style.opacity="1";
      document.querySelector(".test-anim2").style.left="0"; 
      document.querySelector(".test-anim2").style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(resto)) {
      resto.style.opacity="1";
      document.querySelector(".test-anim3").style.left="0"; 
      document.querySelector(".test-anim3").style.opacity="1"; 
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(spas)) {
      spas.style.opacity="1";
      document.querySelector(".test-anim4").style.left="0"; 
      document.querySelector(".test-anim4").style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(actu)) {
      actu.style.opacity="1";
  }
  if (isInViewport(loca)) {
     loca.style.opacity="1";
  }
}, false);
window.addEventListener('scroll', function (event) {
  if (isInViewport(separ)) {
    separ.style.opacity="1";
  }
  if (isInViewport(caracteristique)) {
    caracteristique.style.opacity="1";
  }    
}, false);
