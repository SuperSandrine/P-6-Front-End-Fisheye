// declared lets
// > datas stored
let photographers = [];
let media = [];
let photographerData;
let photographerMedia;
// > current url
const activeUrl = new URL(window.location.href);
const parameterID = activeUrl.searchParams.get('id');
console.log(parameterID); // TODO à supprimer avant livraison

// Cette fonction va chercher les données,
// puis la transforme en JSON
// puis remplie deux tableaux prédéclarés let photographers et let media
// renvoie les objets photographers et media
async function getPhotographers() {
  await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
      media = response2.media; // >>> si la let photographers != de constance)
    });
  return { media, photographers };
}

// Cette fonction affiche les infos du photographes en jouant
// les fonctions écrites dans la factory en asynchrone
// test du dimanche
async function displayData(photographer) {
  console.log(`photographer : ${photographer}`);
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id);
    photographerModel.getPhotographHeader();
    photographerModel.getPhotographPrice();
  });
}

// °°°°°°°°°°° travail en cours sur cette partie °°°°°°°°°°°°°°

const photographGalleryDiv = document.querySelector('.photograph-gallery ');

// TODO, THOMAS >> plutôt que d'effacer la galerie et réinjecter le tableau modifié,
// comment la rendre dynamique, c'est à dire, qu'elle
// change en même temps que son tableau change: le tableau photographerMedia.

// ----------------sauvegarde : fonctionne avec le sort commenté dans selectbox avant samedi
// ---------------mais crée un bug d'affichage avec le tri et les likes, juste le tri fonctionne
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
  // console.log("media : " + media);
  photographGalleryDiv.innerHTML = '';

  media.forEach((id) => {
    const makeACard = mediaFactory(id);
    // console.log(id);
    // id correspond à id du média
    const printGallery = makeACard.getCardGallery();
    // console.log(printGallery.article);
    photographGalleryDiv.appendChild(printGallery.article);
    // const buttonForLikes = document.querySelector(`.likes-${id} button`);
    // console.log(buttonForLikes);
    // buttonForLikes.addEventListener(
    // "click",
    // addALike(
    //   printGallery.parameterForLikesLikes,
    //   printGallery.parameterForLikesId
    // )
    //  );
  });
  const links = document.querySelectorAll('.display-lightbox');
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = e.target.parentNode;
      displayLightboxModal(parseInt(target.getAttribute('data-id')));
    });
  });

  const buttonLike = document.querySelectorAll('.play-addALike');
  buttonLike.forEach((button) => {
    button.addEventListener('click', (e) => {
      const target = e.target.parentNode;
      const parameterId = parseInt(target.getAttribute('data-id'));
      const parameterLikes = parseInt(target.getAttribute('data-likes'));
      addALike(parameterLikes, parameterId);
    });
  });
}
// const links: sélectionne tous les liens de la gallerie et forme avec le querySelector
// une collection HTML (différent d'un nodeList avec un getelement), j'ai un tableau
// pour chaque lien du tableau j'ajoute un eventlistener.
// au click, la fonction va chercher le parentNode de la cible (e.target correspond à l'image)
// une fois que j'ai la target, je peux jouer la fonction en récupérant l'attribut contenant
// l'ID, Mais c'est une string, alors je la transforme en numer avec parseInt
// même principe pour buttonLikes

// Cette fonction lance le traitement des fonctions asynchrones dans l'ordre
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
  // playAddAclick();
  //  OpenMenuDrop();
  const openContactModal = document.querySelector('#display-contact-modal');
  openContactModal.addEventListener('click', (e) => {
    displayContactModal();
  });
  console.log(openContactModal);
  openContactModal.parentNode.addEventListener('focus', (a) => {
    console.log("j'ai le focus");
    console.log(a.target);
    const contactFormButton = a.target;
    a.target.addEventListener('keydown', (e) => {
      console.log("quelq'un a appuyé sur un bouton");

      if (e.key === 'Tab') {
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        // openContactModal.click();
        displayContactModal();
      }
    });
    return contactFormButton;
  });
}
init();
