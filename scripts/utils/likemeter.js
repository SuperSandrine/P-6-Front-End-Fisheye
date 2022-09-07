let allLikes = [];
let totalOfLikes = 0;

function allLikesForTotal() {
  allLikes = document.querySelectorAll(".likesData");
  for (let i = 0; i < allLikes.length; i++) {
    totalOfLikes += parseInt(allLikes[i].innerHTML);
    //    console.log("comptage en cours" + totalOfLikes);
  }
  return totalOfLikes;
}

function displayAllLikesForTotal() {
  //  console.log("voici les alllikes " + allLikes);
  const newChild = document.createElement("span");
  const textNode2 = document.createTextNode(`${totalOfLikes}`);
  newChild.appendChild(textNode2);
  const paragrapheparent = document.querySelector(".parent");
  const childHasBeen = document.querySelector(".parent span");
  paragrapheparent.replaceChild(newChild, childHasBeen);
}

// Dans cette fonction, quand on clique sur un coeur, il doit y avoir des ajouts et des
// retraits dans les cartes (nbOfLikes) et dans l'encart du bas de page (totalOfLikes)
// en paramètre, on récupère le nbOfLikes présent dans le fichier json
function addALike(nbOfLikes, photoId) {
  //let shortClassLikes = document.querySelector(`.likes-${photoId} p`).innerHTML;
  //console.log("short : " + shortClassLikes);

  //  console.log("je check : " + totalOfLikes);
  let nbOfLikesInner = parseInt(document.querySelector(`.likes-${photoId} p`).innerHTML);
  console.log("je check le nblikes en inner : " + nbOfLikesInner);
  //console.log("short : " + shortClassLikes);

  //la const insideCard demande: Est-ce que le nbOfLikes du json égale le nbdeLikes dans le innerHtml? si oui, on rajoute 1,
  //sinon on décrémente.
//  const insideCard =
    nbOfLikes === nbOfLikesInner ? (nbOfLikesInner = nbOfLikesInner + 1) & 
        totalOfLikes++
     : nbOfLikesInner-- & 
        totalOfLikes--;
  //shortClassLikes = insideCard; >>> Thomas >>> Pourquoi ça marche pas?
  //console.log("voici le insideCard" + insideCard);
  //console.log( "nboflikes : " + nbOfLikes)
  //console.log( "nbofinner : " + nbOfLikesInner)

  document.querySelector(`.likes-${photoId} p`).innerHTML = nbOfLikesInner; // Là je change le innerHTML
  // document.querySelector(`.likes-${photoId} p`).style.backgroundColor = "blue";
  //console.log( document.querySelector(`.likes-${photoId} p`))
  // if (nbOfLikes > nbOfLikesInner) {
  //   totalOfLikes++;
  // } else {
  //   totalOfLikes--;
  // }

//  console.log("voici le total après click :" + totalOfLikes);
  displayAllLikesForTotal();
}

// pourquoi quand je filtre, je ne peux plus injecter mon code dans le tableau filtré? C'est à dire qu'une
// filtré la ligne 39 et 40 ne marche plus? ()

//THOMAS: ça fonctionne, sauf quand je filtre. il doit y avoir un problème avec mon protocole
// d'affichage aller voir le display media dans photographer.js/pages et la selectbox.

// dans mon protocole de filtre, j'appelais la fonctin DisplayMedia qui removeChild avant appendChild.
// Mais du coup, il n'y a pas de mémoire des nbofLikes ou totalOfLikes.
// Thomas: est-ce que je crée un nouvel affichage de l'array photographerMedia une fois qu'il est trié
// mais comment je fais ça? (j'ai commencé à écrire une fonction dans la selectBox dit displayOnceSorted.
// (et j'ai commenté ce qui fonctionnait mais avec bug d'affichage au tri et like))
// Ou est-ce que je modifie cette array quand je modifie mes likes? (pas qu'en innerHTML comme je le fais)
// Ou est-ce qu'il y a une autre méthode?

// activer la fonction addALike avec un event listener à la place du onclick html
// function displayAddALike(photographerMedia){
// photographerMedia.forEach((id)) =>{
// const makeACard = mediaFactory(id);
// const printGallery = makeACard.getCardGallery();
// const buttonForLikes = document.querySelector(`.likes-${id} button`);
//     console.log(buttonForLikes);
//     buttonForLikes.addEventListener(
//     "click",
//      addALike(
//        printGallery.parameterForLikesLikes,
//        printGallery.parameterForLikesId
//      )
//       );}

// }

// const buttonForLikes = document.querySelector(`.likes-${id} button`);
// console.log(buttonForLikes);
// buttonForLikes.addEventListener(
//   "click",
//   addALike(
//     printGallery.parameterForLikesLikes,
//     printGallery.parameterForLikesId
//   )
// );

// activer la fonction addALike avec un event listener à la place du onclick html
// TODO pour faire fonctionner: la id n'est pas reconnue.
// function playAddAclick() {
//   let paramId = mediaFactory(id).getCardGallery().parameterForLikesId;
//   let paramLikes = mediaFactory(id).getCardGallery().parameterForLikesLikes;
//   const buttonForLikes = document.getElementsByClassName(`.likes-${id} button`);
//   buttonForLikes.addEventListener("click", addAlike(paramLikes, paramId));
// }
