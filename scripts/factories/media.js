function mediaFactory(data) {
  //pour chaque index de l'array media,
  // j'affiche les images dans la gallerie avec titre et likes
  //      > images et vidéos > traitement avec une ternaire?
  // j'affiche les images dans une lightbox

  // d'abord je récupère mes données
  const { date, id, image, likes, photographId, price, title, video } = data;

  //  const picture = `assets/photographers/${portrait}`;
  //  const linkUrl = `photographer.html?id=${id}`;

  // je crée une premiere fonction pour afficher la gallerie
  function getCardGallery() {
    const article = document.createElement("article");
    article.innerHTML = `<a href="#">
        <img src="/assets/medias-vrac/min-${image}"/>
      </a>
      <div>
        <p>${title}</p>
        <div>${likes} <i class="fa-solid fa-heart heartSolid"> </i></div>
      </div>`;
    return article;
  }
  // OK = todo: rajouter les liens
  // todo: rajouter le lien vers la lightbox

  return {
    getCardGallery,
  };
}
