// DOM Elements
const form = document.querySelector("form");
const modal = document.getElementById("contact_modal");

const containerMessage = document.querySelector("#message").parentNode;
const containerEmail = document.querySelector("#email").parentNode;
const containerLastName = document.querySelector("#lastName").parentNode;
const containerFirstName = document.querySelector(".formData");

// event listener = both following functions are played in the
// photographer.html with attr onclick
// to lauch modal
function displayModal() {
  modal.style.display = "block";
}
// to close modal
function closeModal() {
  modal.style.display = "none";
}

// to complete the Modal Header with the photographer name
// the function is played in init/photographer.js/pages
function giveModalAName(Array) {
  const PhotographerName = Array[0]["name"];
  const NameH2 = document.querySelector("#contact_modal_photograph-name");
  NameH2.innerHTML = `${PhotographerName}`;
}

const inputsText = document.querySelectorAll(".text-control");
// 5 empty variables created to save the user datas:
let firstName, lastName, email, message;

//Then all the checker function:
const firstNameChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    containerFirstName.setAttribute("data-error-visible", true);
    containerFirstName.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    firstName = null;
    A = 0;
    // In purpose to apply [data-error] and [data-error-visible] attributes
    // we are using setAttribute method. For doing so, we had previously selected
    // the .formData class div (so called containerFN).
    // then we save the result in varibale firstname (to save data users) and A (to pass validate()).
  } else if (value.match(/^((\s{2,99})+.)|(\s{2,99})|.+(\s{2,99})+.$/)) {
    containerFirstName.setAttribute("data-error-visible", true);
    containerFirstName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer deux espaces consécutifs."
    );
    firstName = null;
    A = 0;
    // regex control with: https://regex101.com/r/0filKf/1
    // This regex controls two whitespace character (from 2 to 99).
    // at the beginning of name OR if the name only have whitespaces
    // OR whitespaces in the middle of name
  } else if (value.match(/^([0-9]+.)|([0-9]+)|.+([0-9]+)+.$/)) {
    containerFirstName.setAttribute("data-error-visible", true);
    containerFirstName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer de chiffres"
    );
    firstName = null;
    A = 0;
  } else if (
    // here are all accepted special characters
    !value.match(
      /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$/
    )
  ) {
    containerFirstName.setAttribute("data-error-visible", true);
    containerFirstName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer de caractères spéciaux non-autorisés."
    );
    firstName = null;
    A = 0;
  } else if (value == null || value == "" || !value) {
    containerFirstName.setAttribute("data-error-visible", true);
    containerFirstName.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    firstName = null;
    A = 0;
  } else {
    containerFirstName.removeAttribute("data-error-visible", false);
    firstName = value;
    A = 1;
  }
};

const lastNameChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    containerLastName.setAttribute("data-error-visible", true);
    containerLastName.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    lastName = null;
    B = 0;
  } else if (value == null || value == "" || !value) {
    containerLastName.setAttribute("data-error-visible", true);
    containerLastName.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    lastName = null;
    B = 0;
  } else if (value.match(/^([0-9]+.)|([0-9]+)|.+([0-9]+)+.$/)) {
    containerLastName.setAttribute("data-error-visible", true);
    containerLastName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer de chiffres"
    );
    lastName = null;
    B = 0;
  } else if (
    !value.match(
      /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$/
    )
  ) {
    containerLastName.setAttribute("data-error-visible", true);
    containerLastName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer de caractères spéciaux non-autorisés."
    );
    lastName = null;
    B = 0;
  } else if (value.match(/^((\s{2,99})+.)|(\s{2,99})|.+(\s{2,99})+.$/)) {
    containerLastName.setAttribute("data-error-visible", true);
    containerLastName.setAttribute(
      "data-error",
      "Veillez à ne pas entrer deux espaces consécutifs."
    );
    lastName = null;
    B = 0;
  } else {
    containerLastName.removeAttribute("data-error-visible", false);
    lastName = value;
    B = 1;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
    containerEmail.setAttribute("data-error-visible", true);
    containerEmail.setAttribute(
      "data-error",
      "Veuillez entrer une adresse email valide."
    );
    email = null;
    C = 0;
  } else {
    containerEmail.removeAttribute("data-error-visible", false);
    email = value;
    C = 1;
  }
};

const messageChecker = (value) => {
  if (value == null || value == "" || !value) {
    containerMessage.setAttribute("data-error-visible", true);
    containerMessage.setAttribute(
      "data-error",
      "Veuillez entrer du texte pour le champs message."
    );
    message = null;
    D = 0;
    //inclure les chiffre avec espaces dans les erreurs
  } else if (value.match(/^([0-9]+)$/)) {
    containerMessage.setAttribute("data-error-visible", true);
    containerMessage.setAttribute(
      "data-error",
      "Veillez à ne pas entrer que des chiffres"
    );
    message = null;
    D = 0;
  } else {
    containerMessage.removeAttribute("data-error-visible", false);
    message = value;
    D = 1;
  }
};

inputsText.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "message":
        messageChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

function validate() {
  if (A + B + C + D < 4) {
    if (!D) {
      containerQ.setAttribute("data-error-visible", true);
      containerQ.setAttribute("data-error", "Vous devez choisir une quantité.");
    }
    if (!C) {
      containerE.setAttribute("data-error-visible", true);
      containerE.setAttribute(
        "data-error",
        "Vous devez entrer une adresse email."
      );
    }
    if (!B) {
      containerLN.setAttribute("data-error-visible", true);
      containerLN.setAttribute("data-error", "Vous devez entrer un nom.");
    }
    if (!A) {
      containerFN.setAttribute("data-error-visible", true);
      containerFN.setAttribute("data-error", "Vous devez entrer un prénom.");
    }
    return false;
  }
  if (A + B + C + D == 4) {
    modal.style.display = "none";
    //modalConfirmation.style.display = "flex";
    document.querySelector("#contactForm").reset();
    // Previous part cleans inputs.
    // Next part cleans user datas.
    A = 0;
    B = 0;
    C = 0;
    D = 0;
    E = 0;
    firstName = null;
    lastName = null;
    email = null;
    message = null;
    return true;
  } else {
    alert("Il y a un autre problème, contactez l'administrateur du site.");
    return false;
  }
}

// btnModalConfirmation.addEventListener("click", (e) => {
//   modalBg.style.display = "none";
//   modalBody.style.display = "block";
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
