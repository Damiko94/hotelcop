/** ****************** **
 *
 *        MANATHAN
 *
 *  ****************** **/

// Fonction impression de la page
function printPage() {
  window.print();
}

// PAGE CONTACT
var iNom = document.getElementById("ct-nom");
var iPrenom = document.getElementById("ct-prenom");
var iEmail1 = document.getElementById("ct-email");
var iEmail2 = document.getElementById("ct-email2");

var regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//source: regexr.com/2rhq7

iEmail2.addEventListener("input", function(){
  if (regEx.test(iEmail2.value)){
    
  }
});


/** ****************** **
 *
 *        DAMIEN
 *
 *  ****************** **/