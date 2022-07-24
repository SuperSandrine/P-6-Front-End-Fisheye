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
// 4 empty variables created to save the user datas:
let firstName, lastName, email, message;
let A = 0;
let B = 0;
let C = 0;
let D = 0;

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
    // ^[0-9]+.|([0-9]+)|.+[0-9]+.|\w+$
  } else if (value.match(/^([0-9]+.|([0-9]+)|.+[0-9]+.)$/)) {
    containerMessage.setAttribute("data-error-visible", true);
    containerMessage.setAttribute(
      "data-error",
      "Veuillez ne pas entrer que des chiffres et des espaces."
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

//TODO: rajouter dans la fonction valider le cas où rien n'est
// sélectionné, surement lié un eventlistener car quand on sélectionne
// une chose ça marche mais si rien n'est sélectionné il ne se passe rien
// TODO: pourquoi quand le message est ok, validate marche, mais pas les autres?
// TOUN: Thomas: pourquoi est-ce attr required à bloquer mon formulaire comme
// sus-cité? Car en enlevant les required, tout fonctionne.
function validate() {
  if (A + B + C + D < 4) {
    if (!message) {
      containerMessage.setAttribute("data-error-visible", true);
      containerMessage.setAttribute(
        "data-error",
        "Vous devez entrer votre message."
      );
    }
    if (!email) {
      containerEmail.setAttribute("data-error-visible", true);
      containerEmail.setAttribute(
        "data-error",
        "Vous devez entrer une adresse email."
      );
    }
    if (!lastName) {
      containerLastName.setAttribute("data-error-visible", true);
      containerLastName.setAttribute("data-error", "Vous devez entrer un nom.");
    }
    if (!firstName) {
      containerFirstName.setAttribute("data-error-visible", true);
      containerFirstName.setAttribute(
        "data-error",
        "Vous devez entrer un prénom."
      );
    }
    alert("Des champs sont vides");
    return false;
  } else if (A + B + C + D == 4) {
    modal.style.display = "none";
    document.querySelector("#contactForm").reset();
    // Previous part cleans inputs.
    // Next part cleans user datas.
    alert("message envoyé");
    console.log(
      "prénom :" +
        firstName +
        `\n` +
        "nom :" +
        lastName +
        `\n` +
        "email :" +
        email +
        `\n` +
        "cette personne a écrit le message :" +
        message
    );
    return true;
  } else {
    console.log("ERRORRRRRR");
    return false;
  }
}
// TOUN: thomas: est-ce que le return est utile? à quoi me sert la valeur?

// function to avoid navigator bubble
for (let i = 0; i < form.length; i++) {
  form[i].addEventListener(
    "invalid",
    function (e) {
      e.preventDefault();
    },
    true
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
