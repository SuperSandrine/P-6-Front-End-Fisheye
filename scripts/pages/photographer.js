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
  await fetch("../data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
      media = response2.media; //>>> si la let photographers != de constance)
    });
  return { media, photographers };
}

// Cette fonction affiche les infos du photographes en jouant
// les fonctions écrites dans la factory en asynchrone
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

const photographGalleryDiv = document.querySelector(".photograph-gallery");

async function displayMedia(media) {
  //  const photographGalleryDiv = document.querySelector(".photograph-gallery");
  //  photographGalleryDiv.removeChild();
  while (photographGalleryDiv.hasChildNodes()) {
    photographGalleryDiv.removeChild(photographGalleryDiv.firstChild);
  }
  media.forEach((id) => {
    const makeACard = mediaFactory(id);
    const printGallery = makeACard.getCardGallery();
    // if (photographGalleryDiv)
    // photographGalleryDiv.removeChild();
    photographGalleryDiv.appendChild(printGallery);
  });
}

function cleanDisplayMedia() {
  // await displayMedia;
  photographGalleryDiv.removeChild();
}

//Cette fonction lance le traitement des fonctions asynchrone dans l'ordre
async function init() {
  const { photographers, media } = await getPhotographers();
  photographerData = photographers.filter((el) => el.id == parameterID);
  photographerMedia = media.filter((el) => el.photographerId == parameterID);
  displayData(photographerData);
  console.log(photographerMedia);
  displayMedia(photographerMedia);
  giveModalAName(photographerData);
}
init();
