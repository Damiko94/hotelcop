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

/** ****************** **/
/**  CHECK DES INPUTS  **/
/** ****************** **/
/* *
 * Si user clique dans input et sort sans rien saisir
 * affiche erreur
 * */
iNom.addEventListener("blur", function(){
  if(iNom.value==""){
    setUi(iNom, true);
  }else{  
   //Vérif que saisie correspond au RegExp   
    checkSaisie("ct-nom", iNom)
  }
});
iPrenom.addEventListener("blur", function(){if(iPrenom.value==""){setUi(iPrenom, true);}else{checkSaisie("ct-prenom", iPrenom)}});
iEntreprise.addEventListener("blur", function(){if(iEntreprise.value==""){setUi(iEntreprise, true);}else{checkSaisie("ct-entreprise", iEntreprise)}});
iEmail1.addEventListener("blur", function(){if(iEmail1.value==""){setUi(iEmail1, true);}else{checkSaisie("ct-email", iEmail1)}});
iEmail2.addEventListener("blur", function(){if(iEmail2.value==""){setUi(iEmail2, true);}else{checkSaisie("ct-email2", iEmail2)}});
iCategorie.addEventListener("change", getCategorie);
iObjet.addEventListener("blur", function(){if(iObjet.value==""){setUi(iObjet, true);}else{checkSaisie("ct-objet", iObjet)}});
iMsg.addEventListener("blur", function(){if(iMsg.value==""){setUi(iMsg, true);}else{checkSaisie("ct-msg", iMsg)}});

/* *
 * Vérif la saisie à chaque frappe du clavier et
 * MAJ affichage du nombre restant de caractères
 * */
iMsg.addEventListener("input", function(){
  var vMsg = iMsg.value;  
  checkSaisie("ct-msg", iMsg);
  iMsgHelp.innerHTML = "Il vous reste " + (2000 - vMsg.length) + " caractères";
});

/* *
 * Function recup name de l'input et var de l'input
 * Test la saisie selon les RegExp
 * Affiche bonne ou mauvaise saisie
 * */
function checkSaisie(nInput, iInput){
  //nInput : input name
  var regEx;
  var val = iInput.value;
  var minChar;
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
      case "ct-objet":
          minChar = 10;
          //Tous les caractères. nombre entre 10 et 100.
          var regEx = /^.{10,100}$/;
          break;
      default:
          minChar = 2;
          break;
  }
  // console.log("val.length : "+ val.length);
  if (val.length >= minChar) {
      if (regEx.test(val)) {
          // console.log(nInput + " correct!");
          setUi(iInput, false);
      }else{
          // console.log(nInput + " Incorrect");
          setUi(iInput, true);
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
  // Affiche ok uniquement quand le mail est entièrement écrit et qu'ils correspondent
  if (val1.length === val2.length && val1.substr(0,val2.length) === val2.substr(0,val2.length)) {
    // console.log("Identiques!");
    setUi(input2, false);
    iEmail2Help.innerHTML="Les emails correspondent!";
  }else{
    // console.log("Pas Identiques!");
    setUi(input2, true);
    iEmail2Help.innerHTML="";
  }
}

// Affiche pour l'utilisateur qu'emails correspondent
function setUi(idInput, isInvalid){  
  var attr = "form-control";
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
  var isOneInputEmpty;
  //Si un seul des champs n'est pas renseigné, return true
  if(iNom.value === "" || iPrenom.value === "" || iEmail1.value === "" || iEmail2.value === "" || iCategorie.value === "" || iObjet.value === "" || iMsg.value === "" || iCategorie.value === ""){
    
    isOneInputEmpty = true;
    var allInputNames = ["nom", "prenom", "email", "email2", "objet", "msg", "captcha", "categorie"];
    //Boucle sur tous les inputs de allInputNames[] et modif sur is-invalid si vide
    for (var key in allInputNames) { 
      var inputObjet = document.getElementById("ct-" + allInputNames[key]);
      var inputVal = inputObjet.value;
      if (inputVal == "") {
        // console.log(allInputNames[key]);
        setUi(inputObjet, true);
      }
    }
  }else{
    isOneInputEmpty = false;
  }

  if(isOneInputEmpty){
    //Si un seul des champs n'est pas renseigné, return true
    return true;
  }else{
    //Sinon return false
    return false;
  }
}


/** ****************** **/
/**      CATEGORIE     **/
/** ****************** **/
function getCategorie(){
  var vCategorie = iCategorie.value;
  if (vCategorie != "") {
      // console.log(vCategorie);       
      setUi(iCategorie,false);
  }else{
      // console.log(vCategorie);
      setUi(iCategorie,true);
  }
}


/** ****************** **/
/**      CAPTCHA       **/
/** ****************** **/
//Listener input sur saisie du captcha
iCaptcha.addEventListener("input", function(){
  var msg;
  if(checkCaptcha()){
    setUi(iCaptcha, false);
    iCaptchaHelp.innerHTML = "";
  }else{
    setUi(iCaptcha, true);
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
	return Math.floor(Math.random() * max);
}
/** ****************** **/
/**   MESSAGE ENVOYE   **/
/** ****************** **/
var btnSent = document.getElementById("btnSent");
var msgSent = document.getElementById("msgSent");

btnSent.addEventListener("click", function(e){
  e.preventDefault();
  var msg;  
  
  if(!checkEmptyInputs() && checkCaptcha()){
    msg = "Votre message a bien été envoyé, vous allez en recevoir une copie à l'adresse "+  iEmail1.value +" d'ici quelques minutes.<br> " + iCivilite.value + " " + iNom.value + ", notre équipe reviendra vers vous le plus rapidement possible.";      
    msgSent.innerHTML = msg;
  }
  
});


/** ****************** **
 *
 *        DAMIEN
 *
 *  ****************** **/