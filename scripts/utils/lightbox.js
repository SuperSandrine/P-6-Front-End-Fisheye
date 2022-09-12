// plan: quand je clique sur une une image de la galerie
// cette image s'affiche en grand seule dans la lightbox
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

const lightboxModal = document.getElementById("lightbox_modal");
const lightboxMedia = document.querySelector(".lightbox_modal-content");
const main = document.querySelector("#body");
const displayId = document.getElementsByClassName("display-lightbox");
const tabindexLightbox =
  "div[tabindex],button[tabindex],img[tabindex],p[tabindex]";
let focusablesLightbox = [];
let previouslyFocusedElement = null;

let idMedia; // pour stocker l'id du média onclick sur la gallerie
let idArray; // pour stocker un tableau de tous les id des media d'un photographe

// les 3 lets suivants pour remplir dynamiquement le innerhtml
let fillMediaImageSource;
let fillMediaVideoSource;
let fillMediaTitle;
//let displayedLB = false;



// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
function displayLightboxModal(e) {
//  displayedLB = true;
  lightboxModal.style.display = "block";
  //  lightboxModal.focus();
  lightboxModal.removeAttribute("aria-hidden");
  lightboxModal.setAttribute("aria-modal", "true");
  main.classList.add("no-scroll");
  main.setAttribute("aria-hidden", "true");
  idMedia = e;
  console.log(idMedia);
  getIndexofMediasForLightbox(photographerMedia);
  giveLightboxItsMedias(photographerMedia);
  // on crée le tableau d'ordre de lecture une fois, la lightbox affichée
  focusablesLightbox = Array.from(
    lightboxModal.querySelectorAll(tabindexLightbox)
  );
  // on range le tableau en fonction des tabindex
  focusablesLightbox.sort(function (a, b) {
    let x = a.getAttribute("tabindex");
    let y = b.getAttribute("tabindex");
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  previouslyFocusedElement = document.querySelector(":focus");
  console.log(previouslyFocusedElement);
  focusablesLightbox[0].focus();
  window.addEventListener("keydown", keyboardNavigationOnLightbox);
  return idMedia;
}

// to close modal
function closeLightboxModal() {
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus();
//    displayedLB = false;
    lightboxModal.style.display = "none";
    lightboxModal.setAttribute("aria-hidden", "true");
    lightboxModal.removeAttribute("aria-modal");
    main.classList.remove("no-scroll");
    main.removeAttribute("aria-hidden");
    window.removeEventListener("keydown", keyboardNavigationOnLightbox);
  }
}

// pour récupérer l'index de l'id de l'image, je dois découper le tableau avec
// uniquement les ids, afin d'utiliser la méthode indexOf.
function getIndexofMediasForLightbox(array) {
  idArray = array.map((el) => el.id);
  indexOfMedia = idArray.indexOf(idMedia);
  fillMediaImageSource = array[indexOfMedia].image;
  fillMediaVideoSource = array[indexOfMedia].video;
  fillMediaTitle = array[indexOfMedia].title;
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle,
  };
}

function nextMedia(array) {
  indexOfMedia++;
  if (indexOfMedia >= array.length) {
    indexOfMedia = 0;
    (fillMediaImageSource = array[indexOfMedia].image),
      (fillMediaVideoSource = array[indexOfMedia].video),
      (fillMediaTitle = array[indexOfMedia].title);
  }
  // if (indexOfMedia < 0) {
  //   indexOfMedia = array.length - 1;
  //   (fillMediaImageSource = array[indexOfMedia].image),
  //     (fillMediaVideoSource = array[indexOfMedia].video),
  //     (fillMediaTitle = array[indexOfMedia].title);
  else {
    (fillMediaImageSource = array[indexOfMedia].image),
      (fillMediaVideoSource = array[indexOfMedia].video),
      (fillMediaTitle = array[indexOfMedia].title);
  }
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle,
  };
}


function previousMedia(array) {
  indexOfMedia--;
  // if (indexOfMedia >= array.length) {
  //   indexOfMedia = 0;
  //   (fillMediaImageSource = array[indexOfMedia].image),
  //     (fillMediaVideoSource = array[indexOfMedia].video),
  //     (fillMediaTitle = array[indexOfMedia].title);
  // }
  if (indexOfMedia < 0) {
    indexOfMedia = array.length - 1;
    (fillMediaImageSource = array[indexOfMedia].image),
      (fillMediaVideoSource = array[indexOfMedia].video),
      (fillMediaTitle = array[indexOfMedia].title);
  } else {
    (fillMediaImageSource = array[indexOfMedia].image),
      (fillMediaVideoSource = array[indexOfMedia].video),
      (fillMediaTitle = array[indexOfMedia].title);
  }
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle,
  };
}

//prendre la valeur de indexOfMedia et l'injecter dans la formule ci-dessous
// pour afficher image, video et titre
function giveLightboxItsMedias() {
  const mediaBigImage = `<img tabindex="2" alt="${fillMediaTitle}" src="./assets/medias-vrac/${fillMediaImageSource}"/>`;
  const mediaBigVideo = `<video controls >
  <source src="./assets/medias-vrac/${fillMediaVideoSource}" type="video/mp4">
</video>`;
  const bigMedia =
    fillMediaImageSource == undefined ? mediaBigVideo : mediaBigImage;
  lightboxMedia.innerHTML = `${bigMedia}
     <p tabindex="3" class="lightbox_modal-content-text">${fillMediaTitle}</p>`;
}

//_________________ Navigation
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

// je crée un listener sur le click du next button, qui joue la fonction next et rempli la lightbox
const lightboxModalNext = document.querySelector("#lightbox_modal-next-button");
lightboxModalNext.addEventListener("click", (e) => {
  nextMedia(photographerMedia);
  giveLightboxItsMedias();
});

const lightboxModalPrevious = document.querySelector(
  "#lightbox_modal-previous-button"
);
lightboxModalPrevious.addEventListener("click", (e) => {
  previousMedia(photographerMedia);
  giveLightboxItsMedias();
});

const closeId = document.querySelector("#close-lightbox");
closeId.addEventListener("click", (e) => {
  //  closeId.style.backgroundColor = "blue";
  closeLightboxModal();
});

function focusInLightbox(e) {
  e.preventDefault();
  let index = focusablesLightbox.findIndex(
    (f) => f === lightboxModal.querySelector(":focus")
  );
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusablesLightbox.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusablesLightbox.length - 1;
  }
  focusablesLightbox[index].focus();
}


const keyboardNavigationOnLightbox = function (e) {
  e.preventDefault();
  console.log(e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeLightboxModal(e);
  }
  else if (e.key === "Tab" && lightboxModal.matches('aria-hidden') === false) {
    focusInLightbox(e);
  }
  else if (e.key === "ArrowLeft" && lightboxModal.matches('aria-hidden') === false) {
    previousMedia(photographerMedia);
    giveLightboxItsMedias();
  }
  else if (e.key === "ArrowRight" && lightboxModal.matches('aria-hidden') === false) {
    nextMedia(photographerMedia);
    giveLightboxItsMedias();
  }
};