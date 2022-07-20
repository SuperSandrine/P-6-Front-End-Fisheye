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
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
      media = response2.media; //>>> si la let photographers != de constance)
    });
  return { media, photographers };
}

async function displayData(photographer) {
  console.log(photographer);
  // const photographHeaderDiv =
  //   document.getElementsByClassName("photograph-header");
  // TOUN : thomas: ça ne marche pas avec getElement mais ça marche avec query? Pourquoi?
  // const photographHeaderDiv = document.querySelector(".photograph-header");
  // const photographPriceDiv = document.querySelector(".photograph-price");
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id);
    const printPhotographHeader = photographerModel.getPhotographHeader();
    const printPhotographPrice = photographerModel.getPhotographPrice();
    printPhotographHeader;
    // photographHeaderDiv.appendChild(printPhotographHeader);
    printPhotographPrice;
    // photographPriceDiv.appendChild(printPhotographPrice);
  });
}

async function displayMedia(media) {
  const photographGalleryDiv = document.querySelector(".photograph-gallery");
  media.forEach((id) => {
    const makeACard = mediaFactory(id);
    const printGallery = makeACard.getCardGallery();
    photographGalleryDiv.appendChild(printGallery);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  photographerData = photographers.filter((el) => el.id == parameterID);
  displayData(photographerData);
  const { media } = await getPhotographers();
  photographerMedia = media.filter((el) => el.photographerId == parameterID);
  console.log(photographerMedia);
  displayMedia(photographerMedia);
}
init();
