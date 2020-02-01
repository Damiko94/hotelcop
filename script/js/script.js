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
var iEntreprise = document.getElementById("ct-entreprise");
var iPays = document.getElementById("ct-pays");
var iCategorie = document.getElementById("ct-categorie");
var iObjet = document.getElementById("ct-objet");
var iMsg = document.getElementById("ct-msg");
var iCaptcha = document.getElementById("ct-captcha");
var iEmail1Help = document.getElementById("emailHelp");
var iEmail2Help = document.getElementById("email2Help");
var iMsgHelp = document.getElementById("msgHelp");
var iCaptchaHelp = document.getElementById("captchaHelp");

iNom.addEventListener("blur", function(){checkSaisie("ct-nom", iNom)});
iPrenom.addEventListener("blur", function(){checkSaisie("ct-prenom", iPrenom)});
iEntreprise.addEventListener("blur", function(){checkSaisie("ct-entreprise", iEntreprise)});
iObjet.addEventListener("blur", function(){checkSaisie("ct-objet", iObjet)});
iMsg.addEventListener("blur", function(){checkSaisie("ct-msg", iMsg)});
iMsg.addEventListener("input", function(){
  var vMsg = iMsg.value;  
  checkSaisie("ct-msg", iMsg);
  iMsgHelp.innerHTML = "Il vous reste " + (2000 - vMsg.length) + " caractères";
});

function checkSaisie(nInput, iInput){
  //nInput : input name
  var regEx;
  var val = iInput.value;
  var minChar;
  var attr = "form-control";
  switch (nInput) {
      case "ct-nom":
      case "ct-prenom":
      case "ct-entreprise":
          minChar = 2;
          var regEx = /^[a-zA-Z-]{2,50}$/;
          break;
      case "ct-msg":
          minChar = 10;
          //Tous les caractères. nombre entre 10 et 2000.
          var regEx = /^.{10,2000}$/;
          break;
      default:
          minChar = 2;
          break;
  }
  // console.log("val.length : "+ val.length);
  if (val.length >= minChar) {
      if (regEx.test(val)) {
          // console.log(nInput + " correct!");
          setUi(iInput, attr, false);
      }else{
          // console.log(nInput + " Incorrect");
          setUi(iInput, attr, true);
      }
  }
  // console.log(val + " | " + regEx.test(val));
}

/** ****************** **/
/**   SAISIE EMAIL 1   **/
/** ****************** **/

//Vérifie que le mail saisi a le format d'un email
iEmail1.addEventListener("input", function(){
  //source: regexr.com/2rhq7
  var regEx = /[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  var vEmail1 = iEmail1.value;
  var attr = "form-control";
  if (regEx.test(vEmail1)) {
    // console.log("Email valide!");
    setUi(iEmail1, attr, false);
    // Il n'est pas pertinent d'afficher que le mail saisi est valide.
  }else{
    // console.log("Email NON valide!");    
    setUi(iEmail1, attr, true);
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
    setUi(input2, attr, true);
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
/**  CHECK CATEGORIE   **/
/** ****************** **/
//Vérif qu'une catégorie a été sélectionnée
function checkCategorie(){
  if(iCategorie !== 0){
    return false;
  }
  return true;
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
//Listener input sur saisie du captcha
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

// ------------------
//   Check Captcha
// ------------------
// Vérif nombre saisi soit le bon
function checkCaptcha(){
  var vCaptcha = iCaptcha.value;
  //Compare saisie user avec chiffres générés
  if (vCaptcha == (nb1+nb2)) {
    return true;
  }
  return false;
}

// ------------------
//   Random captcha
// ------------------
//Appel de la fonction à chaque chargement de la page pour générer nouveaux chiffres
randCaptcha();

//Déclaration en dehors de randCaptcha() pour être utlisés dans checkCaptcha()
var nb1, nb2;
// Génère un captcha différent à chaque rafraichissement de la page
function randCaptcha(){
  var max = 10;
  nb1 = alea_nb(max);
  nb2 = alea_nb(max);
  var ph = "(Captcha) Combien font " + nb1 + "+" + nb2 + " ?";
  
  //UI : Mise à jour du placeholder
  iCaptcha.setAttribute("placeholder", ph);
}

//Return un entier entre 0 et max passé en argument
function alea_nb(max){
	return Math.floor(Math.random() * max + 1);
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