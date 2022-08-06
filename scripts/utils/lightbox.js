// plan: quand je clique sur une une image de la galerie
// cette image s'affiche en grand seule dans la lightbox
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

const lightboxModal = document.getElementById("lightbox_modal");
const lightboxMedia = document.querySelector(".lightbox_modal-content");

let idMedia; // pour stocker l'id du média onclick sur la gallerie
let idArray; // pour stocker un tableau de tous les id des media d'un photographe

// les 3 lets suivants pour remplir dynamiquement le innerhtml
let fillMediaImageSource;
let fillMediaVideoSource;
let fillMediaTitle;

// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
function displayLightboxModal(e) {
  lightboxModal.style.display = "block";
  idMedia = e;
  getIndexofMediasForLightbox(photographerMedia);
  giveLightboxItsMedias(photographerMedia);
  return idMedia;
}
// to close modal
function closeLightboxModal() {
  lightboxModal.style.display = "none";
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
  }
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

function previousMedia(array) {
  indexOfMedia = indexOfMedia - 1;
  let quantityOfIndex = array.length - 1;
  if (indexOfMedia + 1 == 0) {
    indexOfMedia = quantityOfIndex;
  } else {
  }
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

//prendre la valeur de indexOfMedia et l'injecter dans la formule ci-dessous
// pour afficher image, video et titre
function giveLightboxItsMedias() {
  const mediaBigImage = `<img src="/assets/medias-vrac/${fillMediaImageSource}"/>`;
  const mediaBigVideo = `<video controls autoplay >
  <source src="/assets/medias-vrac/${fillMediaVideoSource}" type="video/mp4">
</video>`;
  const bigMedia =
    fillMediaImageSource == undefined ? mediaBigVideo : mediaBigImage;
  lightboxMedia.innerHTML = `${bigMedia}
     <p class="lightbox_modal-content-text">${fillMediaTitle}</p>`;
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
