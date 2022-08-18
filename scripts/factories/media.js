function mediaFactory(data) {
  //pour chaque index de l'array media,
  // j'affiche les images dans la gallerie avec titre et likes
  //      > images et vidéos > traitement avec une ternaire

  // d'abord je récupère mes données
  const { date, id, image, likes, photographId, price, title, video } = data;
  // je gère les fichiers image ou video
  // avec une ternaire format :" question ? vrai alors action : ou faux alors action;"
  // si image existe? affiche image : sinon affiche video
  const mediaImage = `<img src="./assets/medias-vrac/min-${image}"/ alt="${title}" lang="en">`;
  const mediaVideo = `<video >
  <source src="./assets/medias-vrac/${video}#t=5.0" type="video/mp4">
</video>`;
  const media = image == undefined ? mediaVideo : mediaImage;

  // je crée une premiere fonction pour afficher la gallerie
  function getCardGallery() {
    let parameterForLikesLikes = likes;
    let parameterForLikesId = id;
    console.log(
      "les paramètres pour add : " +
        parameterForLikesLikes +
        " , " +
        parameterForLikesId
    );
    const article = document.createElement("article");
    article.innerHTML = `<a tabindex="9" alt="ouvrir une modale du média pour avoir un apperçu" href="#" onclick="displayLightboxModal(${id})" >
        ${media}
      </a>
      <div>
        <p tabindex="9">${title}</p>
        <div tabindex="9" class="likes-${id}" aria-label="likes"><p class="likesData">${likes} </p><button class="button-likes-${id}">
        <i onclick="addALike(${likes},${id})" 
        class="fa-solid fa-heart heartSolid"> </i></button></div>
      </div>`;
    return { article, parameterForLikesId, parameterForLikesLikes };
  }

  // travail de jeudi 18:-------------------
  //<i onclick="addALike(${likes},${id})" >>>sauvegarde ligne 26 >>jeudi 18 à 22h >> remis à 1h15
  // tentaive d'ajour d'un event listener avec création d'une fonction playaddaLikes à la
  // fin de likemeter.js, non fonctionnelle
  // pour se faire, ajout de return sur la fonction getCarGallery, utilité, non avérée.
  //------------------------------

  // function addALike2media(nbOfLikes, photoId) {
  //   let numberOfLikes = document.querySelector(".likes p").parentNode;

  //   let previousNumberOfLikes = nbOfLikes;
  //   console.log("ancien nb de like : " + previousNumberOfLikes);
  //   console.log("test query selector: " + numberOfLikes);

  //   if (!clicked) {
  //     clicked = true;
  //     previousNumberOfLikes++;
  //     console.log("nouveau nb de like : " + previousNumberOfLikes);

  //     document.querySelector(".likes p").innerHTML = previousNumberOfLikes;
  //   }
  // }
  // ----------
  // vend 15:18, déjà présent dans photo.js
  // let totalOfLikes = 0;
  // let allLikes;

  // function allLikesForOne() {
  //   allLikes = document.querySelectorAll(".likesData");
  //   console.log("liste des likes : " + allLikes);
  //   for (let i = 0; i < allLikes.length; i++) {
  //     totalOfLikes += parseInt(allLikes[i].innerHTML);
  //     console.log("total : " + totalOfLikes);
  //   }

  //   return totalOfLikes;
  // }
  // function addALikeToTotal() {
  //   totalOfLikes++;
  //   console.log(" le total a changé : " + totalOfLikes);
  // }

  return {
    getCardGallery,
    //allLikesForOne,
    //addALikeToTotal,
    //getPhotographPrice,
    //totalOfLikes,
    //addALike,
    //getPhotographPrice,
  };
}

//<div class="likes-${id}"><p>${likes} </p><i onclick="addALike(${likes},${id})"
// const change = document.querySelector(".likesData").innerHTML;
// change.addEventListener("change", addALikeToTotal);
