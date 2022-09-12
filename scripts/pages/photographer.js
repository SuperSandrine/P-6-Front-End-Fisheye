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
  console.log("photographer : " + photographer);
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id);
    const printPhotographHeader = photographerModel.getPhotographHeader();
    const printPhotographPrice = photographerModel.getPhotographPrice();
    printPhotographHeader;
    printPhotographPrice;
  });
}


const photographGalleryDiv = document.querySelector(".photograph-gallery ");

async function displayMedia(media) {
  photographGalleryDiv.innerHTML = "";

  media.forEach((id) => {
    const makeACard = mediaFactory(id);
    const printGallery = makeACard.getCardGallery();
    photographGalleryDiv.appendChild(printGallery.article);
  });
  const links = document.querySelectorAll(".display-lightbox");
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      let cible = e.target.parentNode;
      console.log(cible)
      console.log(links)
      displayLightboxModal(parseInt(cible.getAttribute("data-id")));
    })});
  links.forEach((b) => {
//    console.log(b);
//  b.preventDefault();
    b.addEventListener("focus", function (o){
      o.preventDefault();
      o.stopPropagation();
      console.log("j'ai le focus gallery : " + typeof(parseInt(o.target.getAttribute("data-id"),10)));
      console.log(o);
      o.target.addEventListener("keydown",function(u){
        //u.preventDefault()
        console.log("quelq'un a appuyé sur un bouton");
        console.log(u);
        //if (u.key === "Tab"){
          //passe le focus au tabindex suivant
        //} 
         if (u.key === "Enter"||u.key === " "){
        console.log("bleu")
        console.log(u.target.getAttribute("data-id"))
        displayLightboxModal(parseInt(o.target.getAttribute("data-id"),10))
         }
      })
     })
    })
  

  const buttonLike = document.querySelectorAll(".play-addALike");
  buttonLike.forEach((button) => {
    button.addEventListener("click", (e) => {
      let target = e.target.parentNode;
      let parameterId = parseInt(target.getAttribute("data-id"));
      let parameterLikes = parseInt(target.getAttribute("data-likes"));
      addALike(parameterLikes, parameterId);
    });
  });
  buttonLike.forEach((b) => {
    b.addEventListener("focus", function(o){
      o.preventDefault();
      o.stopPropagation();
      //console.log(o)
      o.target.addEventListener("keydown",function(u){
        if (u.key === "Enter"||u.key === " "){
          //console.log(u.target.getAttribute("data-id"));
          const parameterId = parseInt(u.target.getAttribute("data-id"));
          const parameterLikes = parseInt(u.target.getAttribute("data-likes"));
          addALike(parameterLikes, parameterId);

    }})
  })
})
}
//const links: sélectionne tous les liens de la gallerie et forme avec le querySelector
// une collection HTML (différent d'un nodeList avec un getelement), j'ai un tableau
// pour chaque lien du tableau j'ajoute un eventlistener.
// au click, la fonction va chercher le parentNode de la cible (e.target correspond à l'image)
// une fois que j'ai la target, je peux jouer la fonction en récupérant l'attribut contenant
//l'ID, Mais c'est une string, alors je la transforme en numer avec parseInt
// même principe pour buttonLikes

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
  //playAddAclick();
  //  OpenMenuDrop();
  const openContactModal = document.querySelector("#display-contact-modal");
  openContactModal.addEventListener("click", (e) => {
    displayContactModal();
  });
  
}
init();
