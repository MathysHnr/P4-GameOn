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
  resetModal();
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
  resetModal();
}

function closeModalValid() {
  modalValid.style.display = "none";
  modalbg.style.display = "none";
  resetModal();
}

function resetModal() {
  form.reset();
  form.style.display = "block";
  modalValid.style.display = "none";
  document.querySelector(".modal-body").style.display = "block";

  // Réinitialiser tous les messages d'erreur
  const formDataElements = document.querySelectorAll(".formData");
  formDataElements.forEach((element) => {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
  });
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
  const quantity = document.getElementById("quantity");
  const tournamentRadios = document.querySelectorAll('input[name="location"]');

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

  if (!quantity.value || quantity.value < 0 || quantity.value > 99) {
    isInvalid(
      quantity,
      "Le nombre de tournois doit être compris entre 0 et 99."
    );
    isValidForm = false;
  } else {
    isValid(quantity);
  }

  // Validation de la sélection d'un tournoi
  let tournamentSelected = false;
  tournamentRadios.forEach((radio) => {
    if (radio.checked) {
      tournamentSelected = true;
    }
  });

  if (!tournamentSelected) {
    isInvalid(tournamentRadios[0], "Vous devez sélectionner un tournoi.");
    isValidForm = false;
  } else {
    isValid(tournamentRadios[0]);
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
