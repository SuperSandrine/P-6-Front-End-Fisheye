// pour chaque image de la gallerie
// quand je clique dessus
// s'affiche en grand seule dans la lightbox
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navique dans un array avec les flèches.

const lightboxModal = document.getElementById("lightbox_modal");
const lightboxMedia = document.querySelector(".lightbox_modal-content");

let idMedia;
let idArray;

let fillMediaImageSource;
let fillMediaVideoSource;
let fillMediaTitle;

let nextMediaIndex;

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
  console.log("media suivant est : " + indexOfMedia);
  let quantityOfIndex = array.length - 1;
  if (indexOfMedia - 1 == quantityOfIndex) {
    indexOfMedia = 0;
    console.log("on recommence");
    //   } else if (fillMediaSuivantImageSource == undefined) {
    //     let fillMediaImageSource;
    //     console.log("c'est une vidéo");
    // } else if (mediaSuivant > quantityOfIndex) {
    //   console.log("fin du train");
    // renvoie une erreur car ne peut pas lire l'array comme il n'existe pas
    // intervenir avant la lecture
  } else {
    console.log("c'est dns la pipe");
  }
  // si mediaSuivant = undefined, alors on est au bout de l'array ou on est face à une vidéo
  //et il faut sortir OU revenir au début
  // (photographerMedia.length)-1 on obtient le nombre d'itérance
  fillMediaImageSource = array[indexOfMedia].image;
  fillMediaVideoSource = array[indexOfMedia].video;
  fillMediaTitle = array[indexOfMedia].title;
  console.log(fillMediaTitle);
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle,
  };
}

function previousMedia(array) {
  indexOfMedia = indexOfMedia - 1;
  console.log("media précédent est : " + indexOfMedia);
  let quantityOfIndex = array.length - 1;
  if (indexOfMedia == 0) {
    indexOfMedia = quantityOfIndex;
    console.log("on recommence");
    //   } else if (fillMediaSuivantImageSource == undefined) {
    //     let fillMediaImageSource;
    //     console.log("c'est une vidéo");
    // } else if (mediaSuivant > quantityOfIndex) {
    //   console.log("fin du train");
    // renvoie une erreur car ne peut pas lire l'array comme il n'existe pas
    // intervenir avant la lecture
  } else {
    console.log("c'est dns la pipe");
  }
  // si mediaSuivant = undefined, alors on est au bout de l'array ou on est face à une vidéo
  //et il faut sortir OU revenir au début
  // (photographerMedia.length)-1 on obtient le nombre d'itérance
  fillMediaImageSource = array[indexOfMedia].image;
  fillMediaVideoSource = array[indexOfMedia].video;
  fillMediaTitle = array[indexOfMedia].title;
  console.log(fillMediaTitle);
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

// je crée un listener sur le click du next button, qui joue la fonction next
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

// cette fonction affiche l'index du media actuel, l'index suivant et
// le nom de la prochaine photo.
// function nextMedia(array) {
//   nextMediaIndex = indexOfMedia + 1;
//   console.log("media suivant est : " + nextMediaIndex);
//   let quantityOfIndex = array.length - 1;
//   if (indexOfMedia == quantityOfIndex) {
//     nextMediaIndex = 0;
//     console.log("on recommence");
//     //   } else if (fillMediaSuivantImageSource == undefined) {
//     //     let fillMediaImageSource;
//     //     console.log("c'est une vidéo");
//     // } else if (mediaSuivant > quantityOfIndex) {
//     //   console.log("fin du train");
//     // renvoie une erreur car ne peut pas lire l'array comme il n'existe pas
//     // intervenir avant la lecture
//   } else {
//     console.log("c'est dns la pipe");
//   }
//   // si mediaSuivant = undefined, alors on est au bout de l'array ou on est face à une vidéo
//   //et il faut sortir OU revenir au début
//   // (photographerMedia.length)-1 on obtient le nombre d'itérance
//   fillMediaImageSource = array[nextMediaIndex].image;
//   fillMediaVideoSource = array[nextMediaIndex].video;
//   fillMediaTitle = array[nextMediaIndex].title;
//   console.log(fillMediaTitle);
//   return {
//     nextMediaIndex,
//     fillMediaImageSource,
//     fillMediaVideoSource,
//     fillMediaTitle,
//   };
// }

// function getIndexOfNextMediasForLightbox(array) {
//     fillMediaImageSource = array[nextMediaIndex].image;
//     fillMediaVideoSource = array[nextMediaIndex].video;
//     fillMediaTitle = array[nextMediaIndex].title;
//     return {
//       indexOfMedia,
//       fillMediaImageSource,
//       fillMediaVideoSource,
//       fillMediaTitle,
//     };

// afficher le media suivant
// j'ai une fonction qui créer l'index du media suivant,
//maintenant au click, je l'affiche

//function displayNextMedia();
