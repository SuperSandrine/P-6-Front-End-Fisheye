// ***************** import ******************
import { photographerFactory } from '../factories/photographer.js'
import { mediaFactory } from '../factories/media.js'
import { addALike, allLikesForTotal, displayAllLikesForTotal } from '../utils/likemeter.js'
import { displayLightboxModal } from '../utils/lightbox.js'
import { displayContactModal, giveModalAName } from '../utils/contactForm.js'

// declared lets
// > datas stored
let photographers = []
let media = []
let photographerData
let photographerMedia
// > current url
const activeUrl = new URL(window.location.href)
const parameterID = activeUrl.searchParams.get('id')
console.log(parameterID) // TODO à supprimer avant livraison

// Cette fonction va chercher les données,
// puis la transforme en JSON
// puis remplie deux tableaux prédéclarés let photographers et let media
// renvoie les objets photographers et media
async function getPhotographers () {
  await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers
      media = response2.media // >>> si la let photographers != de constance)
    })
  return { media, photographers }
}

// Cette fonction affiche les infos du photographes en jouant
// les fonctions écrites dans la factory en asynchrone
// test du dimanche
async function displayData (photographer) {
  photographer.forEach((id) => {
    console.log(id)
    const photographerModel = photographerFactory(id)
    photographerModel.getPhotographHeader()
    photographerModel.getPhotographPrice()
  })
}

const photographGalleryDiv = document.querySelector('.photograph-gallery ')

async function displayMedia (media) {
  photographGalleryDiv.innerHTML = ''
  media.forEach((id) => {
    const makeACard = mediaFactory(id)
    const printGallery = makeACard.getCardGallery()
    photographGalleryDiv.appendChild(printGallery.article)
  })
  const links = document.querySelectorAll('.display-lightbox')
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()

      const cible = e.target.parentNode
      // console.log(cible)
      // console.log(links)
      displayLightboxModal(parseInt(cible.getAttribute('data-id')))
    })
  })
  links.forEach((b) => {
    //    console.log(b);
    //  b.preventDefault();
    b.addEventListener('focus', function (o) {
      o.preventDefault()
      o.stopImmediatePropagation()
      //      console.log("j'ai le focus gallery : " + typeof (parseInt(o.target.getAttribute('data-id'), 10)))
      // console.log(o)
      o.target.addEventListener('keydown', function (u) {
        if (u.key !== 'Tab') {
          u.preventDefault()
        }

        // console.log("quelq'un a appuyé sur un bouton")
        // console.log(u)
        // if (u.key === "Tab"){
        // passe le focus au tabindex suivant
        // }
        if (u.key === 'Enter') {
          // u.preventDefault()
          u.stopImmediatePropagation()
          u.preventDefault()
          //        console.log('bleu')
          //          console.log(u.target.getAttribute('data-id'))
          displayLightboxModal(parseInt(o.target.getAttribute('data-id'), 10))
        }
      })
      o.target.addEventListener('keyup', function (u) {
        if (u.key !== 'Tab') {
          u.preventDefault()
        }

        // console.log("quelq'un a appuyé sur un bouton")
        // console.log(u)
        // if (u.key === "Tab"){
        // passe le focus au tabindex suivant
        // }
        if (u.key === ' ') {
          // u.preventDefault()
          u.preventDefault()

          u.stopImmediatePropagation()
          //        console.log('bleu')
          //          console.log(u.target.getAttribute('data-id'))
          displayLightboxModal(parseInt(o.target.getAttribute('data-id'), 10))
        }
      })
    })
  })

  const buttonLike = document.querySelectorAll('.play-addALike')
  console.log(document.activeElement.matches('.play-addALike'))
  //  if (document.activeElement.matches('.play-addALike') === true) {
  // comment faire pour qu'une fois que la barre enter addAclik, ça ne
  // fasse pas un click écouter par le listener
  buttonLike.forEach((b) => {
    b.addEventListener('focus', function (o) {
      o.preventDefault()
      o.stopPropagation()
      // console.log(o)
      o.target.addEventListener('keyup', function (u) {
        u.stopImmediatePropagation()
        u.preventDefault()
        //        console.log('touche', u.key)
        if (u.key === ' ') {
          u.preventDefault()
          // console.log(u.target.getAttribute("data-id"));
          const parameterId = parseInt(u.target.getAttribute('data-id'))
          const parameterLikes = parseInt(u.target.getAttribute('data-likes'))
          addALike(parameterLikes, parameterId)
        }
      })
      o.target.addEventListener('keypress', function (u) {
        u.stopImmediatePropagation()
        u.preventDefault()
        //        console.log('touche', u.key)
        if (u.key === 'Enter') {
          u.preventDefault()
          // console.log(u.target.getAttribute("data-id"));
          const parameterId = parseInt(u.target.getAttribute('data-id'))
          const parameterLikes = parseInt(u.target.getAttribute('data-likes'))
          addALike(parameterLikes, parameterId)
        }
      })
    })
  })
  //  } else {
  buttonLike.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      const target = e.target.parentNode
      console.log('le parent de id', e.target.parentNode)
      const parameterId = parseInt(target.getAttribute('data-id'))
      const parameterLikes = parseInt(target.getAttribute('data-likes'))
      addALike(parameterLikes, parameterId)
    })
  })
//  }
  // if (document.activeElement == buttonLike) {
  //   buttonLike.forEach((b) => {
  //     b.addEventListener('focus', function (o) {
  //       o.preventDefault()
  //       o.stopPropagation()
  //       // console.log(o)
  //       o.target.addEventListener('keypress', function (u) {
  //         u.stopImmediatePropagation()
  //         u.preventDefault()
  //         console.log('touche', u.key)
  //         if (u.key === 'Enter' || u.key === ' ' || u.key === 'Space') {
  //         // console.log(u.target.getAttribute("data-id"));
  //           const parameterId = parseInt(u.target.getAttribute('data-id'))
  //           const parameterLikes = parseInt(u.target.getAttribute('data-likes'))
  //           addALike(parameterLikes, parameterId)
  //         }
  //       })
  //     })
  //   })
  // }
}
// const links: sélectionne tous les liens de la gallerie et forme avec le querySelector
// une collection HTML (différent d'un nodeList avec un getelement), j'ai un tableau
// pour chaque lien du tableau j'ajoute un eventlistener.
// au click, la fonction va chercher le parentNode de la cible (e.target correspond à l'image)
// une fois que j'ai la target, je peux jouer la fonction en récupérant l'attribut contenant
// l'ID, Mais c'est une string, alors je la transforme en numer avec parseInt
// même principe pour buttonLikes

// Cette fonction lance le traitement des fonctions asynchrones dans l'ordre
async function init () {
  const { photographers, media } = await getPhotographers()
  // console.log(photographers)
  photographerData = photographers.filter((el) => el.id === parseInt(parameterID))
  photographerMedia = media.filter((el) => el.photographerId === parseInt(parameterID))
  displayData(photographerData)
  displayMedia(photographerMedia)
  // console.log(photographerMedia)
  allLikesForTotal()
  displayAllLikesForTotal()
  giveModalAName(photographerData)
  // playAddAclick();
  //  OpenMenuDrop();
  const openContactModal = document.querySelector('#display-contact-modal')
  openContactModal.addEventListener('click', (e) => {
    displayContactModal()
  })
}
init()

export { photographerMedia, displayMedia }
