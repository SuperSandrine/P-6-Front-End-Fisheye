// declared lets
// > datas stored
let photographers = [];
let media = [];
let photographerData;
let photographerMedia;
// > current url
let activeUrl = new URL(window.location.href);
let parameterID = activeUrl.searchParams.get("id");
console.log(parameterID); //TODO à supprimer avant livraison

// Cette fonction va chercher les données,
// puis la transforme en JSON
// puis remplie deux tableaux prédéclarés let photographers et let media
// renvoie les objets photographers et media
async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
      media = response2.media; //>>> si la let photographers != de constance)
    });
  return { media, photographers };
}

// Cette fonction affiche les infos du photographes en jouant
// les fonctions écrites dans la factory en asynchrone
//test du dimanche
async function displayData(photographer) {
  console.log(photographer);
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id);
    const printPhotographHeader = photographerModel.getPhotographHeader();
    const printPhotographPrice = photographerModel.getPhotographPrice();
    printPhotographHeader;
    printPhotographPrice;
  });
}

// °°°°°°°°°°° travail en cours sur cette partie °°°°°°°°°°°°°°

const photographGalleryDiv = document.querySelector(".photograph-gallery ");

// TODO, THOMAS >> plutôt que d'effacer la galerie et réinjecter le tableau modifié,
// comment la rendre dynamique, c'est à dire, qu'elle
// change en même temps que son tableau change: le tableau photographerMedia.

// ----------------sauvegarde : fonctionne avec le sort commenté dans selectbox avant samedi
//---------------mais crée un bug d'affichage avec le tri et les likes, juste le tri fonctionne
// --------------avec le code ci-dessous
// async function displayMedia(media) {
//   //  const photographGalleryDiv = document.querySelector(".photograph-gallery");
//   //  photographGalleryDiv.removeChild();
//   while (photographGalleryDiv.hasChildNodes()) {
//     photographGalleryDiv.removeChild(photographGalleryDiv.firstChild);
//   }
//   media.forEach((id) => {
//     const makeACard = mediaFactory(id);
//     const printGallery = makeACard.getCardGallery();
//     // if (photographGalleryDiv)
//     // photographGalleryDiv.removeChild();
//     photographGalleryDiv.appendChild(printGallery);
//   });
// }

async function displayMedia(media) {
  photographGalleryDiv.innerHTML = "";

  media.forEach((id) => {
    const makeACard = mediaFactory(id);
    const printGallery = makeACard.getCardGallery();
    photographGalleryDiv.appendChild(printGallery);
  });
}

// function displayMediaSecondTimes(media) {
//   photographGalleryDiv.innerHTML = "";
//   media.forEach((id) => {
//     const makeACard = mediaFactory(id);
//     const printGallery = makeACard.getCardGallery();
//     photographGalleryDiv.replaceWith(photographGalleryDiv, printGallery);
//   });
// }

// à tester : document.quelerySelector("monElementAReset").innerHTML=""

//Cette fonction lance le traitement des fonctions asynchrones dans l'ordre
async function init() {
  const { photographers, media } = await getPhotographers();
  photographerData = photographers.filter((el) => el.id == parameterID);
  photographerMedia = media.filter((el) => el.photographerId == parameterID);
  displayData(photographerData);
  displayMedia(photographerMedia);
  console.log(photographerMedia);
  allLikesForTotal();
  displayAllLikesForTotal();
  giveModalAName(photographerData);
}
init();
