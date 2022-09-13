export function mediaFactory (data) {
  // pour chaque index de l'array media,
  // j'affiche les images dans la gallerie avec titre et likes
  //      > images et vidéos > traitement avec une ternaire

  // d'abord je récupère mes données
  const { id, image, likes, title, video } = data
  // je gère les fichiers image ou video
  // avec une ternaire format :" question ? vrai alors action : ou faux alors action;"
  // si image existe? affiche image : sinon affiche video
  const mediaImage = `<img src="./assets/medias-vrac/min-${image}"/ alt="${title}" >`
  const mediaVideo = `<video >
  <source src="./assets/medias-vrac/${video}#t=5.0" type="video/mp4">
</video>`
  const media = image === undefined ? mediaVideo : mediaImage

  // je crée une premiere fonction pour afficher la gallerie

  function getCardGallery () {
    const parameterForLikesLikes = likes
    const parameterForLikesId = id
    // console.log(
    //   "les paramètres pour add : " +
    //     parameterForLikesLikes +
    //     " , " +
    //     parameterForLikesId
    // );
    const article = document.createElement('article')
    article.setAttribute('lang', 'en')
    article.innerHTML = `<a tabindex="9" alt="${title}, closeup view" href="#" class="display-lightbox" data-id="${id}">
        ${media}
      </a>
      <div>
        <p tabindex="9">${title}</p>
        <div tabindex="9" class="likes-${id}" ><p class="likesData">${likes} </p><button tabindex="9" class="button-likes-${id} play-addALike" data-id="${id}" data-likes="${likes}" >
        <i aria-label="likes"
        class="fa-solid fa-heart heartSolid"> </i></button></div>
      </div>`
    return { article, parameterForLikesId, parameterForLikesLikes }
  }

  return {
    getCardGallery
  }
}
