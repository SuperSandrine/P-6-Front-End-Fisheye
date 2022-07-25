function mediaFactory(data) {
  //pour chaque index de l'array media,
  // j'affiche les images dans la gallerie avec titre et likes
  //      > images et vidéos > traitement avec une ternaire

  // d'abord je récupère mes données
  const { date, id, image, likes, photographId, price, title, video } = data;
  // je gère les fichiers image ou video
  // avec une ternaire format :" question ? vrai alors action : ou faux alors action;"
  // si image existe? affiche image : sinon affiche video
  const mediaImage = `<img src="/assets/medias-vrac/min-${image}"/>`;
  const mediaVideo = `<video >
  <source src="/assets/medias-vrac/${video}#t=5.0" type="video/mp4">
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
        <div>${likes} <i class="fa-solid fa-heart heartSolid"> </i></div>
      </div>`;
    return article;
  }

  return {
    getCardGallery,
  };
}
