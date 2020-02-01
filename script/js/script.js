/** ****************** **
 *
 *        MANATHAN
 *
 *  ****************** **/

/** ****************** **/
/**  IMPRESSION PAGE   **/
/** ****************** **/
// Fonction impression de la page
function printPage() {
  window.print();
}

/** ****************** **/
/** ------------------ --/
//     PAGE CONTACT
/** ------------------ --/
/** ****************** **/

var iCivilite = document.getElementById("ct-civilite");
var iNom = document.getElementById("ct-nom");
var iPrenom = document.getElementById("ct-prenom");
var iEmail1 = document.getElementById("ct-email");
var iEmail2 = document.getElementById("ct-email2");
var iCategorie = document.getElementById("ct-categorie");
var iObjet = document.getElementById("ct-objet");
var iMsg = document.getElementById("ct-msg");
var iCaptcha = document.getElementById("ct-captcha");
// var iEmail1Help = document.getElementById("emailHelp");
var iEmail2Help = document.getElementById("email2Help");
var iCaptchaHelp = document.getElementById("captchaHelp");

/** ****************** **/
/**   SAISIE EMAIL 1   **/
/** ****************** **/
//source: regexr.com/2rhq7
var regEx = /[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

//Vérifie que le mail saisi a le format d'un email
iEmail1.addEventListener("input", function(){
  var vEmail1 = iEmail1.value;
  if (regEx.test(vEmail1)) {
    // console.log("Email valide!");
    setUi(iEmail1, false);
    // Il n'est pas pertinent d'afficher que le mail saisi est valide.
  }else{
    // console.log("Email NON valide!");    
    setUi(iEmail1, true);
  }
});

/** ****************** **/
/** CONFIRMATION EMAIL **/
/** ****************** **/
iEmail2.addEventListener("input", function(){compareInputs(iEmail1, iEmail2);});

function compareInputs(input1, input2){
  var val1 = input1.value;
  var val2 = input2.value;
  var attr = "form-control";
  // Affiche ok uniquement quand le mail est entièrement écrit et qu'ils correspondent
  if (val1.length === val2.length && val1.substr(0,val2.length) === val2.substr(0,val2.length)) {
    // console.log("Identiques!");
    setUi(input2, attr, false);
    iEmail2Help.innerHTML="Les emails correspondent!";
  }else{
    // console.log("Pas Identiques!");
    setUi(input, attr2, true);
    iEmail2Help.innerHTML="";
  }
}

// Affiche pour l'utilisateur qu'emails correspondent
function setUi(idInput, attr, isInvalid){  
  var valid = "";
  if (isInvalid){
      valid = "in";
  }
  idInput.setAttribute("class", attr + " is-"+valid+"valid");  
}

/** ****************** **/
/** CHECK EMPTY INPUTS **/
/** ****************** **/
//Vérifie que tous les champs obligatoires sont remplis
function checkEmptyInputs() {
  //Si un seul des champs n'est pas renseigné, return true
  if(iNom.value === "" || iPrenom.value === "" || iEmail1.value === "" || iEmail2.value === "" || iCategorie.value === "" || iObjet.value === "" || iMsg.value === ""){
    return true;
  }
  //Sinon return false
  return false;
}

/** ****************** **/
/**      CAPTCHA       **/
/** ****************** **/
iCaptcha.addEventListener("input", function(){
  var attr = "form-control";
  var msg;
  if(checkCaptcha()){
    setUi(iCaptcha, attr, false);
    iCaptchaHelp.innerHTML = "";
  }else{
    setUi(iCaptcha, attr, true);
    msg = "Attention, le nombre saisi n'est pas le bon.";
    iCaptchaHelp.innerHTML = msg;
  }
});


// Vérif nombre saisi soit le bon
function checkCaptcha(){
  var vCaptcha = iCaptcha.value;
  if (vCaptcha == 4) {
    return true;
  }
  return false;
}

/** ****************** **/
/**   MESSAGE ENVOYE   **/
/** ****************** **/
var btnSent = document.getElementById("btnSent");
var msgSent = document.getElementById("msgSent");

btnSent.addEventListener("click", function(e){
  e.preventDefault();
  var msg;  
  if (checkCaptcha()) {
    if(!checkEmptyInputs()){
      msg = "Votre message a bien été envoyé, vous allez en recevoir une copie à l'adresse "+  iEmail1.value +" d'ici quelques minutes.<br> " + iCivilite.value + " " + iNom.value + ", notre équipe reviendra vers vous le plus rapidement possible.";      
      msgSent.innerHTML = msg;
    }    
  }
});


/** ****************** **
 *
 *        DAMIEN
 *
 *  ****************** **/