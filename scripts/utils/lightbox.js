// pour chaque image de la gallerie
// quand je clique dessus
// s'affiche en grand seule dans la lightbox
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navique dans un array avec les flèches.

const lightboxModal = document.getElementById("lightbox_modal");
let idMedia;
let idArray;

// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
function displayLightboxModal(e) {
  lightboxModal.style.display = "block";
  idMedia = e;
  getIndexofMediasForLightbox(photographerMedia);
  console.log("voici l'index du media affiché : " + indexOfMedia);
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
  return indexOfMedia;
}

//prendre la valeur de indexOfMedia et l'injecter dans la formule ci-dessous
// pour afficher image, video et titre
function giveLightboxItsMedias(array) {
  fillMediaSource = array[indexOfMedia].image;
  fillMediaVideoSource = array[indexOfMedia].video;
  fillMediaTitle = array[indexOfMedia].title;

  const mediaBigImage = `<img src="/assets/medias-vrac/${fillMediaSource}"/>`;
  const mediaBigVideo = `<video controls autoplay >
  <source src="/assets/medias-vrac/${fillMediaVideoSource}" type="video/mp4">
</video>`;
  const bigMedia = fillMediaSource == undefined ? mediaBigVideo : mediaBigImage;
  const lightboxMedia = document.querySelector(".lightbox_modal-content");
  lightboxMedia.innerHTML = `${bigMedia}
     <p class="lightbox_modal-content-text">${fillMediaTitle}</p>`;
}
