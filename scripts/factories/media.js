function mediaFactory(data) {
  //pour chaque index de l'array media,
  // j'affiche les images dans la gallerie avec titre et likes
  //      > images et vidéos > traitement avec une ternaire

  // d'abord je récupère mes données
  const { date, id, image, likes, photographId, price, title, video } = data;
  // je gère les fichiers image ou video
  // avec une ternaire format :" question ? vrai alors action : ou faux alors action;"
  // si image existe? affiche image : sinon affiche video
  const mediaImage = `<img src="./assets/medias-vrac/min-${image}"/>`;
  const mediaVideo = `<video >
  <source src="./assets/medias-vrac/${video}#t=5.0" type="video/mp4">
</video>`;
  const media = image == undefined ? mediaVideo : mediaImage;

  // je crée une premiere fonction pour afficher la gallerie
  function getCardGallery() {
    const article = document.createElement("article");
    article.innerHTML = `<a href="#" onclick="displayLightboxModal(${id})" >
        ${media}
      </a>
      <div>
        <p>${title}</p>
        <div class="likes-${id}"><p class="likesData">${likes} </p><i onclick="addALike(${likes},${id})"
         class="fa-solid fa-heart heartSolid"> </i></div>
      </div>`;
    return article;
  }

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
