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
let displayedLB = false;

// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
function displayLightboxModal(e) {
  displayedLB = true;
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
  focusablesLightbox[1].focus();
  return idMedia;
}

// to close modal
function closeLightboxModal() {
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  displayedLB = false;
  lightboxModal.style.display = "none";
  lightboxModal.setAttribute("aria-hidden", "true");
  lightboxModal.removeAttribute("aria-modal");
  main.classList.remove("no-scroll");
  main.removeAttribute("aria-hidden");
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
  indexOfMedia = indexOfMedia + 1;
  let quantityOfIndex = array.length - 1;
  if (indexOfMedia - 1 == quantityOfIndex) {
    indexOfMedia = 0;
  } else {
    fillMediaImageSource = array[indexOfMedia].image;
    fillMediaVideoSource = array[indexOfMedia].video;
    fillMediaTitle = array[indexOfMedia].title;
  }
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle,
  };
}

function previousMedia(array) {
  indexOfMedia = indexOfMedia - 1;
  let quantityOfIndex = array.length - 1;
  if (indexOfMedia + 1 == 0) {
    indexOfMedia = quantityOfIndex;
  } else {
    fillMediaImageSource = array[indexOfMedia].image;
    fillMediaVideoSource = array[indexOfMedia].video;
    fillMediaTitle = array[indexOfMedia].title;
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

window.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeLightboxModal(e);
  }
  if (e.key === "Tab" && displayedLB === true) {
    focusInLightbox(e);
  }
  if (e.key === "ArrowLeft" && displayedLB === true) {
    previousMedia(photographerMedia);
    giveLightboxItsMedias();
  }
  if (e.key === "ArrowRight" && displayedLB === true) {
    nextMedia(photographerMedia);
    giveLightboxItsMedias();
  }
});
// todo: BUG, le premier arrowleft ne fonctionne pas,
//voir comment le tableau est lu la première fois

// Array.from(displayId).forEach((el, index, arr) => {
//   console.log(el);
// });

// let article = document.querySelectorAll("a");
// console.log(article);

// article.forEach((a) => {
//   a.addEventListener("click", (e) => {
//     alert(e.target.getAttribute("data-id"));
//   });
// });
// displayId.addEventListener("click", (e) => {
//   displayId.style.backgroundColor = "red";
//   //displayLightboxModal();
// });

// document.querySelector(".displayLightbox-623534343").forEach((a) => {
//   a.addEventListener("click", alert("ça marche"));
//   a.preventDefault();
// });
// const test = document.getElementsByClassName("displayLightbox");
// test.addEventListener("click", (e) => {
//   alert("ça marche");
// });

// function displayLightboxModal(e) {
//   lightboxModal.style.display = "block";
//   lightboxModal.removeAttribute("aria-hidden");
//   lightboxModal.setAttribute("aria-modal", "true");
//   lightboxModal.setAttribute("tabindex", "1");
//   main.classList.add("no-scroll");
//   console.log("id : " + e);
//   console.log(e.target); //j'ai pas compris (renvoie:undefined)
//   idMedia = e;
//   getIndexofMediasForLightbox(photographerMedia);
//   giveLightboxItsMedias(photographerMedia);
//   return idMedia;
// }
// // to close modal
// function closeLightboxModal() {
//   lightboxModal.style.display = "none";
//   lightboxModal.setAttribute("aria-hidden", "true");
//   lightboxModal.removeAttribute("aria-modal");
//   main.classList.remove("no-scroll");
// }

// console.log(document.getElementsByClassName("linkToLightbox"));
// let links = document.getElementsByClassName("linkToLightbox"); // tableau avec index et lien

// links.forEach(linkEventListener());

// function linkEventListener() {
//   a.addEventListener("click", displayLightboxModal());
// }
