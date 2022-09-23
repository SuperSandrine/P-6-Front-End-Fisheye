// data correxsponding at each index of Media array
// mediaFactory arrange the datas (either phot or video) and
// create the principal card gallery component to fill gallery with.
export function mediaFactory (data) {
  // first, ask for datas
  const { id, image, likes, title, video } = data

  // next: dealing with the img and video files through a ternary
  // ternary format: "demand ? action if true : other action if false"
  const mediaImage = `<img src="./assets/medias-vrac/min-${image}"/ alt="${title}" >`
  const mediaVideo = `<video >
  <source src="./assets/medias-vrac/${video}#t=5.0" type="video/mp4">
</video>`
  const media = image === undefined ? mediaVideo : mediaImage

  // Create each Gallery card with the data necessary to fill
  // likemeter parameters
  function getCardGallery () {
    const parameterForLikesLikes = likes
    const parameterForLikesId = id

    const article = document.createElement('article')
    article.setAttribute('lang', 'en')
    article.innerHTML = `
    <a  tabindex="9" 
        aria-label="${title}, vue rapprochée" 
        href="#" 
        class="display-lightbox" 
        data-id="${id}">
      ${media}
    </a>
    <div>
      <p lang='en' tabindex="9">${title}</p>
      <div tabindex="9" class="likes-${id}" >
        <p class="likesData">${likes} </p>
        <button tabindex="9" 
            class="button-likes-${id} play-addALike" 
            data-id="${id}" 
            data-likes="${likes}" >
          <i role="img" aria-label="likes" 
              class="fa-solid fa-heart heartSolid"> </i>
        </button>
      </div>
    </div>`
    return { article, parameterForLikesId, parameterForLikesLikes }
  }
  // TODO: est-ce qu'il y a besoin de 2id dans le button likes

  return {
    getCardGallery
  }
}
