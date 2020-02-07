/** ****************** **
 *
 *        MANATHAN
 *
 *  ****************** **/
/** ****************** **/
/** ------------------ --/
//      SEARCH BAR
/** ------------------ --/
/** ****************** **/
// Recherche dans le site et envoi sur la page concernée
// jQuery UI : Autocomplete
$(function() {
  var categories = [
    "accueil",
    "chambre",
    "suite",
    "restaurant",
    "menu",
    "spa",
    "massage",
    "réservation",
    "panier",
    "presse",
    "actualités",
    "événements",
    "histoire",
    "qui sommes-nous ?",
    "avis clients",
    "recrutement",
    "contact",
    "accès",
    "adresse",
    "transport",
    "mentions légales",
    "conditions générales de vente",
    "CGV",
    "plan du site"
  ];
  $("#searchbar").autocomplete({
    source: categories
  });
} );

var sb = document.getElementById("searchbar");
var sBtn = document.getElementById("search-btn");
if (sBtn !== null) {
  sBtn.addEventListener("click", function(e){
    //Récup la valeur saisie dans la recherche
    var vsb = sb.value;
    e.preventDefault();
    //Appel la fonction qui va afficher la page
    if(redirection(vsb) === false){
      //Affiche une alert si la recherche saisie n'est pas bonne, sinon affiche directement la page
      alert("Attention la page demandée n'existe pas. Veuillez recommencer.");
    }
  });
}

function redirection(vsb){
  //Enumération des pages selon les catégories
  var namePage = {
    categories : {
      "accueil": {page:"index"},
      "chambre": {page:"chambres"},
      "suite": {page:"chambres"},
      "restaurant": {page:"restaurant"},
      "menu": {page:"restaurant"},
      "spa": {page:"spa"},
      "massage": {page:"spa"},
      "réservation": {page:"reservations"},
      "panier": {page:"reservations"},
      "presse": {page:"presse"},
      "actualités": {page:"actualites-evenements"},
      "événements": {page:"actualites-evenements"},
      "histoire": {page:"qui-sommmes-nous"},
      "qui sommes-nous ?": {page:"qui-sommmes-nous"},
      "avis clients": {page:"avis-clients"},
      "recrutement": {page:"recrutement"},
      "contact": {page:"contact-acces"},
      "accès": {page:"contact-acces"},
      "adresse": {page:"contact-acces"},
      "transport": {page:"contact-acces"},
      "mentions légales": {page:"mentions-legales"},
      "conditions générales de vente": {page:"cgv"},
      "CGV": {page:"cgv"},
      "plan du site": {page:"plan-site"}
    }
  };
  if (namePage.categories[vsb] === undefined) {
    //Vérif si la catégorie saisie a été définie, sinon return false
    return false;
  }else{
    //Redirection vers la page
    document.location.href= namePage.categories[vsb].page + ".html";
  }
}

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
if (iMsg !== null) {
  iMsg.addEventListener("input", function(){
    var vMsg = iMsg.value;  
    checkSaisie("ct-msg", iMsg);
    iMsgHelp.innerHTML = "Il vous reste " + (2000 - vMsg.length) + " caractères";
  });  
}

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
          regEx = /^[a-zA-Z-éèàùïöüëäöïüäç ]{2,50}$/;
          break;
      case "ct-email":
      case "ct-email2":
          minChar = 2;
          regEx = /[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          break;
      case "ct-msg":
          minChar = 10;
          //Tous les caractères. nombre entre 10 et 2000.
          regEx = /^[\w|\d|\s|\n|\r"'-_#,;:!§{}&²€$£%µéèàùïöüëäöïüäç°]{10,2000}$/;
          break;
      case "ct-objet":
          minChar = 10;
          //Tous les caractères. nombre entre 10 et 100.
          regEx = /^[\w|\d|\s|\n|\r"'-_#,;:!§{}&²€$£%µéèàùïöüëäöïüäç°]{1,100}$/;
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
if (iEmail1 !== null) {
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
}

/** ****************** **/
/** CONFIRMATION EMAIL **/
/** ****************** **/
if (iEmail2 !== null) {
  iEmail2.addEventListener("input", function(){compareInputs(iEmail1, iEmail2);}); 
}

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
if (iCaptcha !== null) {
  iCaptcha.addEventListener("input", setCaptcha);
}
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
var cheminComplet = document.location.href;
var NomDuFichier = cheminComplet.substring(cheminComplet.lastIndexOf("/")+1);
if (NomDuFichier == "contact-acces.html" || NomDuFichier == "recrutement.html") {
  randCaptcha();  
}

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

if (btnSent !== null) {
  btnSent.addEventListener("click", function(e){
    e.preventDefault();
    var msg;  
    
    if(!checkEmptyInputs() && checkCaptcha()){
      msg = "Votre message a bien été envoyé, vous allez en recevoir une copie à l'adresse "+  iEmail1.value +" d'ici quelques minutes.<br> " + iCivilite.value + " " + iNom.value + ", notre équipe reviendra vers vous le plus rapidement possible.";      
      msgSent.innerHTML = msg;
    }
    
  });  
}

/** ********************* **/
/**     RESERVATION       **/
/** ********************* **/
// ---------------------------------
//  Input : dates arrivée et départ
// ---------------------------------
//Affichage des dates minimales par défaut d'arrivée et de départ
//On ne peut pas réserver une date antiérieure à auj
var dateA = document.getElementById("date-arrivee");
var dateD = document.getElementById("date-depart");
var txtDateA = document.getElementById("resa-date-arrivee");
var txtDateD = document.getElementById("resa-date-depart");
var txtNbNuit = document.getElementById("resa-nb-nuits");

if (dateA != null) {
  dateA.addEventListener("change", function(){
      setTxtDate(txtDateA, dateA);
      setTxtNbNuit();
      setDateAD(false);
  });
}

if (dateD != null) {
  dateD.addEventListener("change", function(){
      setTxtDate(txtDateD, dateD);
      setTxtNbNuit();
      setDateAD(false);
  });
}

//Retourne la date saisie
function getDateAD(input){
  return input.value;
}

setDateAD();
function setDateAD(defaut = true){
  //Dates par défaut
  var auj = new Date();
  var demain = new Date();
  auj = getFormatDate(auj, false);
  var demain = getFormatDate(demain);
  //j1 = aujourd'hui (j)
  var j1 = auj;
  //j2 = j+1
  var j2 = demain;    
  
  if (!defaut) {
    j1 = getDateAD(dateA);
    j2 = getDateAD(dateD);
  }

  if (dateA != null) {
    dateA.value = j1;
    
    //La date d'arrivée = date du jour
    dateD.value = j2;
    dateA.min = auj;
    dateD.min = j1;
  }
}

setTxtDate(txtDateA, dateA);
setTxtDate(txtDateD, dateD);
//MAJ affichage texte des dates arrivée et départ
function setTxtDate(spanTxt, input){
  spanTxt.innerHTML = getDateAD(input);
}

//MAJ affichage texte du nombre de jours
function setTxtNbNuit(){
  var nbj = nbJours(getDateAD(dateA), getDateAD(dateD));
  var txt = nbj + ' nuit';
  if(nbj > 1){txt += 's';}
  txtNbNuit.innerHTML = txt;
  console.log(txt);
}

//Fonction calculant la différence de jours entre 2 dates (j1 et j2)
function nbJours(j1, j2){
  j1 = new Date(j1);
  j2 = new Date(j2);
  var diff = j2.getTime() - j1.getTime();
  return Math.ceil(diff/(1000*60*60*24));
}

function getFormatDate(auj, demain = true){
  //Formatage US des dates
  //Nouvelle objet date : auj
  //padStart() complete la date ou le num du mois d'un 0 si ils font moins de 2 caractères
  var dd = String(auj.getDate()).padStart(2, '0');
  if (demain) {
    dd = String(auj.getDate() + 1).padStart(2, '0');
  }
  var mm = String(auj.getMonth() + 1).padStart(2, '0');
  var yyyy = auj.getFullYear();
  
  return yyyy + '-' + mm + '-' + dd;
}

// ---------------------------------
//      Calcul du prix total
// ---------------------------------
var total = document.getElementById("resa-total");
var prixClassic = 500;
var prixConfort = 1000;
var prixDeluxe = 1500;
var prixSuite = 2000;

var selectClassic = document.getElementById("nb-classique");
var selectConfort = document.getElementById("nb-confort");
var selectDeluxe = document.getElementById("nb-deluxe");
var selectSuite = document.getElementById("nb-suite");
var nbPanier = document.getElementsByClassName("nb-panier");


function calculTotal(prix, qte){
  var prixTotal = 0;
  // var prixTotal = parseInt(total.value);
  return prixTotal + prix * qte;
}

function setTxtPrixTotal(){
  var qteClassic = parseInt(selectClassic.options[selectClassic.selectedIndex].value);
  var qteConfort = parseInt(selectConfort.options[selectConfort.selectedIndex].value);
  var qteDeluxe = parseInt(selectDeluxe.options[selectDeluxe.selectedIndex].value);
  var qteSuite = parseInt(selectSuite.options[selectSuite.selectedIndex].value);

  setNbPanier(qteClassic + qteConfort + qteDeluxe + qteSuite);

  //Calcul prix total en fonction des qté sélectionnées
  prix = prixClassic * qteClassic + prixConfort * qteConfort + prixDeluxe * qteDeluxe + prixSuite * qteSuite;  
  total.innerHTML = prix + ' €';
}

//MAJ texte badge du btn panier
function setNbPanier(nb){
  //boucle sur les deux badges panier
  for (let key in nbPanier) {
    nbPanier[key].innerHTML = nb;
  }
}

//MAJ prix total à chaque selection quantité nb chambre
selectClassic.addEventListener("change", setTxtPrixTotal);
selectConfort.addEventListener("change", setTxtPrixTotal);
selectDeluxe.addEventListener("change", setTxtPrixTotal);
selectSuite.addEventListener("change", setTxtPrixTotal);

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
  var cuisto = document.querySelector('#cuisto');
  var brasserie = document.querySelector('#brasserie');
  var degustation = document.querySelector('#degustation');
  var diner = document.querySelector('#diner');
  var confort = document.querySelector('#confort');
  var classique = document.querySelector('#classique');
  var deluxe = document.querySelector('#deluxe');
  window.addEventListener('scroll', function (event) {
  if (isInViewport(cuisto)) {
        resto.style.opacity="1";
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
  