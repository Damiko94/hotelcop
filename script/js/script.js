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
var iFichier = document.getElementById("ct-fichier");
var labelFichier = document.getElementById("label-fichier");

/** ****************** **/
/**  CHECK DES INPUTS  **/
/** ****************** **/
/* *
 * Si user clique dans input et sort sans rien saisir
 * affiche erreur
 * */
if (iNom !== null) {
  iNom.addEventListener("blur", function(){mainUI(iNom, 'ct-nom')});
}

if (iPrenom !== null) {
  iPrenom.addEventListener("blur", function(){mainUI(iPrenom, 'ct-prenom')});
}

if (iEntreprise !== null) {
  iEntreprise.addEventListener("blur", function(){mainUI(iEntreprise, 'ct-entreprise')});
}

if (iEmail1 !== null) {
  iEmail1.addEventListener("blur", function(){mainUI(iEmail1, 'ct-email')});
}
if (iEmail2 !== null) {
  iEmail2.addEventListener("blur", function(){mainUI(iEmail2, 'ct-email2')});
}

if (iCategorie !== null) {
  iCategorie.addEventListener("change", getCategorie);
}

if (iObjet !== null) {
  iObjet.addEventListener("blur", function(){mainUI(iObjet, 'ct-objet')});
}

if (iMsg !== null) {
  iMsg.addEventListener("blur", function(){mainUI(iMsg, 'ct-msg')});
}

if (iCaptcha !== null) {
  iCaptcha.addEventListener("blur", function(){mainUI(iCaptcha, 'ct-captcha')});
}

/* *
 * Fonction principale qui va appeler les fonctions setUI ou de vérif de saisie
 * */
function mainUI(input, inputName){
  if(input.value == ""){
    setUi(input, true);
  }else{
    //Change la fonction appellé si c'est captcha
    if (inputName == "ct-captcha") {
      setCaptcha;
    }else{
      //Vérif que la saisie respect RegExp
      checkSaisie(inputName, input);
    }
  }
}


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
  var regEx = /^.{10,100}$/;;
  var val = iInput.value;
  var minChar;
  switch (nInput) {
      case "ct-nom":
      case "ct-prenom":
      case "ct-entreprise":
          minChar = 2;
          var regEx = /^[a-zA-Z-]{2,50}$/;
          break;
      case "ct-email":
      case "ct-email2":
          minChar = 2;
          var regEx = /[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
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
  isOneInputEmpty = true;
  var allInputNames = ["nom", "prenom", "email", "email2", "categorie", "objet", "msg", "captcha"];
  //Boucle sur tous les inputs de allInputNames[] et modif sur is-invalid si vide
  for (var key in allInputNames) { 
    var inputObjet = document.getElementById("ct-" + allInputNames[key]);
    //Vérif que l'input existe
    if (inputObjet != null) {
      var inputVal = inputObjet.value;
      //Vérif que valeur soit vide
      if (inputVal == "") {
        console.log("Manque : " + allInputNames[key]);
        setUi(inputObjet, true);
      }else{
        isOneInputEmpty = false;
      }
      
    }
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
/**      FICHIER       **/
/** ****************** **/
//Récup et affiche le nom du fichier sélectionné
if (iFichier !== null) {
  iFichier.addEventListener("change", function(){
    var f = iFichier.files[0];
    labelFichier.innerHTML = f.name;
  });
}


/** ****************** **/
/**      CAPTCHA       **/
/** ****************** **/
//Listener input sur saisie du captcha
iCaptcha.addEventListener("input", setCaptcha);

function setCaptcha(){
  var msg;
  if(checkCaptcha()){
    setUi(iCaptcha, false);
    iCaptchaHelp.innerHTML = "";
  }else{
    setUi(iCaptcha, true);
    msg = "Attention, le nombre saisi n'est pas le bon.";
    iCaptchaHelp.innerHTML = msg;
  }
}

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