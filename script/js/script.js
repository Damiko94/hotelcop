/** ****************** **
 *
 *        DAMIEN
 *
 *  ****************** **/

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
/* fonction who  see if an element is in the viewport */
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
 * select an element & check on scroll if he is in the viewport
 */
var cuisto = document.querySelector('#restaurant');
var brasserie = document.querySelector('#brasserie');
var degustation = document.querySelector('#degustation');
var diner = document.querySelector('#diner');
window.addEventListener('scroll', function (event) {
	if (isInViewport(cuisto)) {
        cuisto.style.opacity="1";
        document.querySelector(".test-anim").style.left="0"; 
    }
    if (isInViewport(brasserie)) {
        brasserie.style.opacity="1";
        document.querySelector(".test-anim1").style.left="0";    
    }
    if (isInViewport(degustation)) {
        degustation.style.opacity="1";
        document.querySelector(".test-anim2").style.left="0";
    }
    if (isInViewport(diner)) {
        diner.style.opacity="1";
        document.querySelector(".test-anim3").style.left="0";
    }
}, false);
