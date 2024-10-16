function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close-btn");
const form = document.getElementById("form");
const modalValid = document.getElementById("modalValid");
const closeValidBtn = document.getElementById("closeValidBtn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
closeValidBtn.addEventListener("click", closeModalValid);

// launch modal form
function launchModal() {
  // Réinitialiser l'état du formulaire avant de l'ouvrir
  form.reset(); // Réinitialiser le formulaire
  form.style.display = "block"; // Afficher le formulaire
  modalValid.style.display = "none"; // S'assurer que la modal de confirmation est cachée
  modalbg.style.display = "block"; // Afficher la modal principale
}

function closeModal() {
  modalbg.style.display = "none"; // Masquer la modal principale
  form.reset();
}

function closeModalValid() {
  modalValid.style.display = "none"; // Masquer la modal de confirmation
  document.querySelector(".modal-body").style.display = "block";

  modalbg.style.display = "none"; // Masquer le fond de la modal
  form.reset();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    document.querySelector(".modal-body").style.display = "block";
    // Masquer le formulaire
    form.style.display = "none";
    // Afficher la modal de confirmation
    modalValid.style.display = "flex";
  }
});

function isInvalid(element, errorMessage) {
  element.parentElement.setAttribute("data-error", errorMessage);
  element.parentElement.setAttribute("data-error-visible", "true");
}

function isValid(element) {
  element.parentElement.removeAttribute("data-error");
  element.parentElement.removeAttribute("data-error-visible");
}

function validate() {
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkBox = document.getElementById("checkbox1");
  const birthDate = document.getElementById("birthdate");

  let isValidForm = true;

  // Validation du prénom
  if (!firstName.value || firstName.value.length <= 2) {
    isInvalid(firstName, "Le prénom doit contenir plus de 2 caractères.");
    isValidForm = false;
  } else if (/\s/.test(firstName.value)) {
    isInvalid(firstName, "Le prénom ne doit pas contenir d'espaces.");
    isValidForm = false;
  } else {
    isValid(firstName);
  }

  // Validation du nom
  if (!lastName.value || lastName.value.length <= 2) {
    isInvalid(lastName, "Le nom doit contenir plus de 2 caractères.");
    isValidForm = false;
  } else if (/\s/.test(lastName.value)) {
    isInvalid(lastName, "Le nom ne doit pas contenir d'espaces.");
    isValidForm = false;
  } else {
    isValid(lastName);
  }

  // Validation de l'email
  if (!email.value || !emailRegex.test(email.value)) {
    isInvalid(email, "L'email n'est pas valide.");
    isValidForm = false;
  } else {
    isValid(email);
  }

  // Validation de la case à cocher
  if (!checkBox.checked) {
    isInvalid(checkBox, "Vous devez accepter les conditions d'utilisation.");
    isValidForm = false;
  } else {
    isValid(checkBox);
  }

  // Validation de la date de naissance
  if (!birthDate.value) {
    isInvalid(birthDate, "Vous devez mettre votre date de naissance.");
    isValidForm = false;
  } else {
    isValid(birthDate);
  }

  return isValidForm;
}

// Ajouter un écouteur d'événement pour empêcher l'utilisateur de taper des espaces
firstName.addEventListener("keydown", function (event) {
  // Vérifier si la touche appuyée est un espace (code 32)
  if (event.key === " " || event.keyCode === 32) {
    event.preventDefault(); // Empêcher l'ajout de l'espace
  }
});
