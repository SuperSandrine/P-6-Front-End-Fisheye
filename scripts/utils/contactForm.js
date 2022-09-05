// DOM Elements
const main = document.querySelector('#body');
const form = document.querySelector('form');
const modal = document.getElementById('contact_modal');

const containerMessage = document.querySelector('#message').parentNode;
const containerEmail = document.querySelector('#email').parentNode;
const containerLastName = document.querySelector('#lastName').parentNode;
const containerFirstName = document.querySelector('.formData');

const tabindexContactForm = 'div[tabindex],h1[tabindex],img[tabindex],label[tabindex], input[tabindex],  textarea[tabindex]';
let focusablesContactForm = [];
let previouslyCMFocusedElement = null;
// make an array with all tabindex.elmnt and sort it
focusablesContactForm = Array.from(modal.querySelectorAll(tabindexContactForm));
focusablesContactForm.sort((a, b) => {
  a = a.attributes.tabindex.value;
  b = b.attributes.tabindex.value;
  return a - b;
});

// event listener = both following functions are played in the
// photographer.html with attr onclick
// to lauch modal
function displayContactModal() {
  modal.style.display = 'block';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  main.classList.add('no-scroll');
  main.setAttribute('aria-hidden', 'true');

  //  console.log(focusablesContactForm);
  // const previouslyCMFocusedElement = document.querySelector(":focus");
  previouslyCMFocusedElement = document.querySelector(
    '#display-contact-modal',
  ).parentNode;

  console.log(previouslyCMFocusedElement);
  focusablesContactForm[0].focus();
  modal.addEventListener('keydown', keyboardNavigationOnContactModal);
}

// close modal
function closeContactModal() {
  modal.style.display = 'none';
  previouslyCMFocusedElement.focus();
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  main.classList.remove('no-scroll');
  main.removeAttribute('aria-hidden');
  window.removeEventListener('keydown', keyboardNavigationOnContactModal);
}

// to complete the Modal Header with the photographer name
// the function is played in init/photographer.js/pages
function giveModalAName(Array) {
  const PhotographerName = Array[0].name;
  const NameH2 = document.querySelector('#form-title');
  NameH2.insertAdjacentHTML('beforeend', `<br> ${PhotographerName}`);
}

const inputsText = document.querySelectorAll('.text-control');
// 4 empty variables created to save the user datas:
let firstName;
let lastName;
let email;
let message;
let A = 0;
let B = 0;
let C = 0;
let D = 0;

// Then all the checker function:
const firstNameChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    containerFirstName.setAttribute('aria-invalid', 'true');
    containerFirstName.setAttribute('data-error-visible', true);
    containerFirstName.setAttribute(
      'data-error',
      'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    );
    firstName = null;
    A = 0;
    // In purpose to apply [data-error] and [data-error-visible] attributes
    // we are using setAttribute method. For doing so, we had previously selected
    // the .formData class div (so called containerFN).
    // then we save the result in varibale firstname (to save data users)
    // and A (to pass validate()).
  } else if (value.match(/^((\s{2,99})+.)|(\s{2,99})|.+(\s{2,99})+.$/)) {
    containerFirstName.setAttribute('aria-invalid', 'true');

    containerFirstName.setAttribute('data-error-visible', true);
    containerFirstName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer deux espaces consécutifs.',
    );
    firstName = null;
    A = 0;
    // regex control with: https://regex101.com/r/0filKf/1
    // This regex controls two whitespace character (from 2 to 99).
    // at the beginning of name OR if the name only have whitespaces
    // OR whitespaces in the middle of name
  } else if (value.match(/^([0-9]+.)|([0-9]+)|.+([0-9]+)+.$/)) {
    containerFirstName.setAttribute('aria-invalid', 'true');

    containerFirstName.setAttribute('data-error-visible', true);
    containerFirstName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer de chiffres',
    );
    firstName = null;
    A = 0;
  } else if (
    // here are all accepted special characters
    !value.match(
      /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$/,
    )
  ) {
    containerFirstName.setAttribute('aria-invalid', 'true');

    containerFirstName.setAttribute('data-error-visible', true);
    containerFirstName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer de caractères spéciaux non-autorisés.',
    );
    firstName = null;
    A = 0;
  } else if (value == null || value === '' || !value) {
    containerFirstName.setAttribute('aria-invalid', 'true');

    containerFirstName.setAttribute('data-error-visible', true);
    containerFirstName.setAttribute(
      'data-error',
      'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    );
    firstName = null;
    A = 0;
  } else {
    containerFirstName.removeAttribute('aria-invalid', 'true');

    containerFirstName.removeAttribute('data-error-visible', false);
    firstName = value;
    A = 1;
  }
};

const lastNameChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    containerLastName.setAttribute('aria-invalid', 'true');

    containerLastName.setAttribute('data-error-visible', true);
    containerLastName.setAttribute(
      'data-error',
      'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    );
    lastName = null;
    B = 0;
  } else if (value == null || value === '' || !value) {
    containerLastName.setAttribute('aria-invalid', 'true');

    containerLastName.setAttribute('data-error-visible', true);
    containerLastName.setAttribute(
      'data-error',
      'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    );
    lastName = null;
    B = 0;
  } else if (value.match(/^([0-9]+.)|([0-9]+)|.+([0-9]+)+.$/)) {
    containerLastName.setAttribute('aria-invalid', 'true');

    containerLastName.setAttribute('data-error-visible', true);
    containerLastName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer de chiffres',
    );
    lastName = null;
    B = 0;
  } else if (
    !value.match(
      /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$/,
    )
  ) {
    containerLastName.setAttribute('aria-invalid', 'true');

    containerLastName.setAttribute('data-error-visible', true);
    containerLastName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer de caractères spéciaux non-autorisés.',
    );
    lastName = null;
    B = 0;
  } else if (value.match(/^((\s{2,99})+.)|(\s{2,99})|.+(\s{2,99})+.$/)) {
    containerLastName.setAttribute('aria-invalid', 'true');

    containerLastName.setAttribute('data-error-visible', true);
    containerLastName.setAttribute(
      'data-error',
      'Veillez à ne pas entrer deux espaces consécutifs.',
    );
    lastName = null;
    B = 0;
  } else {
    containerLastName.removeAttribute('aria-invalid', 'true');
    containerLastName.removeAttribute('data-error-visible', false);
    lastName = value;
    B = 1;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
    containerEmail.setAttribute('aria-invalid', 'true');
    containerEmail.setAttribute('data-error-visible', true);
    containerEmail.setAttribute(
      'data-error',
      'Veuillez entrer une adresse email valide.',
    );
    email = null;
    C = 0;
  } else {
    containerEmail.removeAttribute('aria-invalid', 'true');
    containerEmail.removeAttribute('data-error-visible', false);
    email = value;
    C = 1;
  }
};

const messageChecker = (value) => {
  if (value == null || value === '' || !value) {
    containerMessage.setAttribute('aria-invalid', 'true');
    containerMessage.setAttribute('data-error-visible', true);
    containerMessage.setAttribute(
      'data-error',
      'Veuillez entrer du texte pour le champs message.',
    );
    message = null;
    D = 0;
    // inclure les chiffre avec espaces dans les erreurs
    // ^[0-9]+.|([0-9]+)|.+[0-9]+.|\w+$
  } else if (value.match(/^([0-9]+.|([0-9]+)|.+[0-9]+.)$/)) {
    containerMessage.setAttribute('aria-invalid', 'true');
    containerMessage.setAttribute('data-error-visible', true);
    containerMessage.setAttribute(
      'data-error',
      'Veuillez ne pas entrer que des chiffres et des espaces.',
    );
    message = null;
    D = 0;
  } else {
    containerMessage.removeAttribute('aria-invalid', 'true');
    containerMessage.removeAttribute('data-error-visible', false);
    message = value;
    D = 1;
  }
};

inputsText.forEach((input) => {
  input.addEventListener('input', (e) => {
    switch (e.target.id) {
      case 'firstName':
        firstNameChecker(e.target.value);
        break;
      case 'lastName':
        lastNameChecker(e.target.value);
        break;
      case 'email':
        emailChecker(e.target.value);
        break;
      case 'message':
        messageChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

export function validate() {
  if (A + B + C + D < 4) {
    if (!message) {
      containerMessage.setAttribute('aria-invalid', 'true');
      containerMessage.setAttribute('data-error-visible', true);
      containerMessage.setAttribute(
        'data-error',
        'Vous devez entrer votre message.',
      );
    }
    if (!email) {
      containerEmail.setAttribute('aria-invalid', 'true');
      containerEmail.setAttribute('data-error-visible', true);
      containerEmail.setAttribute(
        'data-error',
        'Vous devez entrer une adresse email.',
      );
    }
    if (!lastName) {
      containerLastName.setAttribute('aria-invalid', 'true');
      containerLastName.setAttribute('data-error-visible', true);
      containerLastName.setAttribute('data-error', 'Vous devez entrer un nom.');
    }
    if (!firstName) {
      containerFirstName.setAttribute('aria-invalid', 'true');
      containerFirstName.setAttribute('data-error-visible', true);
      containerFirstName.setAttribute(
        'data-error',
        'Vous devez entrer un prénom.',
      );
    }
    alert('Des champs sont vides');
    return false;
  }
  if (A + B + C + D === 4) {
    modal.style.display = 'none';
    document.querySelector('#contactForm').reset();
    // Previous part cleans inputs.
    // Next print in console the user datas ans message.
    alert('message envoyé');
    console.log(
      `prénom :${firstName}\n`
        + `nom :${lastName}\n`
        + `email :${email}\n`
        + `cette personne a écrit le message :${message}`,
    );
    return true;
  }
  console.log('ERRORRRRRR');
  return false;
}
// TOUN: thomas: est-ce que le return est utile? à quoi me sert la valeur?

// function to avoid navigator bubble
for (let i = 0; i < form.length; i++) {
  form[i].addEventListener(
    'invalid',
    (e) => {
      e.preventDefault();
    },
    true,
  );
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

const closeIdCM = document.querySelector('#close-contact_modal');
closeIdCM.addEventListener('click', () => {
  closeContactModal();
});

function focusInContactModal(e) {
  e.preventDefault();
  let index = focusablesContactForm.findIndex(
    (f) => f === modal.querySelector(':focus'),
  );
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusablesContactForm.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusablesContactForm.length - 1;
  }
  focusablesContactForm[index].focus();
}

const keyboardNavigationOnContactModal = function (e) {
  console.log(e.key);
  if (
    (e.key === 'Escape' || e.key === 'Esc')
    && modal.matches('aria-hidden') === false
  ) {
    closeContactModal(e);
  }
  if (e.key === 'Tab' && modal.matches('aria-hidden') === false) {
    focusInContactModal(e);
  }
};

// window.addEventListener("keydown", function (e) {
//   console.log(e.key);
//   if (e.key === "Escape" || e.key === "Esc") {
//     closeContactModal(e);
//   }
//   if (e.key === "Tab" && displayedCM === true) {
//     focusInContactModal(e);
//   }
// });

export { displayContactModal, giveModalAName };
