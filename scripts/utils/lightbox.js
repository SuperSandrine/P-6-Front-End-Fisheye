// plan: quand je clique sur une une image de la galerie
// cette image s'affiche en grand seule dans la lightbox
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

// ***************** import ******************
import { photographerMedia } from '../pages/photographer.js'
import { videoControls } from './videoControls.js'

const lightboxModal = document.getElementById('lightbox_modal')
const lightboxMedia = document.querySelector('.lightbox_modal-content')
const main = document.querySelector('#body')
// const displayId = document.getElementsByClassName('display-lightbox')
const tabindexLightbox =
  'div[tabindex],button[tabindex],img[tabindex],video[tabindex],p[tabindex]'
let focusablesLightbox = []
let previouslyFocusedElement = null

let idMedia // pour stocker l'id du média onclick sur la gallerie
let idArray // pour stocker un tableau de tous les id des media d'un photographe

// les 3 lets suivants pour remplir dynamiquement le innerhtml
let fillMediaImageSource
let fillMediaVideoSource
let fillMediaTitle
// let displayedLB = false;

function sortFocusablesLightbox () {
  focusablesLightbox.sort(function (a, b) {
    const x = a.getAttribute('tabindex')
    const y = b.getAttribute('tabindex')
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  })
//  console.log('rangement')
}

function createFocusablesLightbox () {
  // on crée le tableau d'ordre de lecture une fois, la lightbox affichée
  focusablesLightbox = Array.from(lightboxModal.querySelectorAll(tabindexLightbox))
  // on range le tableau en fonction des tabindex
  sortFocusablesLightbox()
}

// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
export function displayLightboxModal (e) {
//  displayedLB = true;
  lightboxModal.style.display = 'block'
  //  lightboxModal.focus();
  lightboxModal.removeAttribute('aria-hidden')
  lightboxModal.setAttribute('aria-modal', 'true')
  main.classList.add('no-scroll')
  main.setAttribute('aria-hidden', 'true')
  idMedia = e
  //  console.log(idMedia)
  getIndexofMediasForLightbox(photographerMedia)
  giveLightboxItsMedias(photographerMedia)
  createFocusablesLightbox()
  //  console.log(focusablesLightbox)
  previouslyFocusedElement = document.querySelector(':focus')
  // console.log(previouslyFocusedElement)
  focusablesLightbox[0].focus()
  window.addEventListener('keydown', keyboardNavigationOnLightbox)
  return idMedia
}

// to close modal
function closeLightboxModal () {
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus()
    //    displayedLB = false;
    lightboxModal.style.display = 'none'
    lightboxModal.setAttribute('aria-hidden', 'true')
    lightboxModal.removeAttribute('aria-modal')
    main.classList.remove('no-scroll')
    main.removeAttribute('aria-hidden')
    window.removeEventListener('keydown', keyboardNavigationOnLightbox)
  }
}

function fillMedia (array) {
  fillMediaImageSource = array[indexOfMedia].image
  fillMediaVideoSource = array[indexOfMedia].video
  fillMediaTitle = array[indexOfMedia].title
}

// pour récupérer l'index de l'id de l'image, je dois découper le tableau avec
// uniquement les ids, afin d'utiliser la méthode indexOf.
let indexOfMedia
function getIndexofMediasForLightbox (array) {
  idArray = array.map((el) => el.id)
  indexOfMedia = idArray.indexOf(idMedia)
  //  console.log(indexOfMedia)
  fillMedia(array)
  //  fillMediaImageSource = array[indexOfMedia].image
  //  console.log(fillMediaImageSource)
  //  fillMediaVideoSource = array[indexOfMedia].video
  //  console.log(fillMediaVideoSource)
  //  fillMediaTitle = array[indexOfMedia].title
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle
  }
}

function nextMedia (array) {
  indexOfMedia++
  if (indexOfMedia >= array.length) {
    indexOfMedia = 0
    fillMedia(array)
    // (fillMediaImageSource = array[indexOfMedia].image)
    // (fillMediaVideoSource = array[indexOfMedia].video)
    // (fillMediaTitle = array[indexOfMedia].title)
  } else {
    fillMedia(array)
    // (fillMediaImageSource = array[indexOfMedia].image)
    // (fillMediaVideoSource = array[indexOfMedia].video)
    // (fillMediaTitle = array[indexOfMedia].title)
  }
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle
  }
}

function previousMedia (array) {
  indexOfMedia--
  // if (indexOfMedia >= array.length) {
  //   indexOfMedia = 0;
  //   (fillMediaImageSource = array[indexOfMedia].image),
  //     (fillMediaVideoSource = array[indexOfMedia].video),
  //     (fillMediaTitle = array[indexOfMedia].title);
  // }
  if (indexOfMedia < 0) {
    indexOfMedia = array.length - 1
    fillMedia(array)
    // (fillMediaImageSource = array[indexOfMedia].image)
    // (fillMediaVideoSource = array[indexOfMedia].video)
    // (fillMediaTitle = array[indexOfMedia].title)
  } else {
    fillMedia(array)
    // (fillMediaImageSource = array[indexOfMedia].image)
    // (fillMediaVideoSource = array[indexOfMedia].video)
    // (fillMediaTitle = array[indexOfMedia].title)
  }
  return {
    indexOfMedia,
    fillMediaImageSource,
    fillMediaVideoSource,
    fillMediaTitle
  }
}

// prendre la valeur de indexOfMedia et l'injecter dans la formule ci-dessous
// pour afficher image, video et titre
function giveLightboxItsMedias () {
  const mediaBigImage = `<img tabindex="2" alt="${fillMediaTitle}" src="./assets/medias-vrac/${fillMediaImageSource}"/>`
  const mediaBigVideo = `
  <video id="animateVideo" tabindex="2" alt="${fillMediaTitle}" >
  <source src="./assets/medias-vrac/${fillMediaVideoSource}" type="video/mp4"> 
  Votre navigateur ne prends pas en charge nos formats vidéos
  </video>
  `

  const bigMedia =
    fillMediaImageSource === undefined ? mediaBigVideo : mediaBigImage
  lightboxMedia.innerHTML = `${bigMedia}
    <p tabindex="3" class="lightbox_modal-content-text">${fillMediaTitle}</p>`
  console.log(bigMedia.match('video'))
  const animateVideo = document.querySelector('#animateVideo')
  // console.log(animateVideo)
  if (animateVideo !== null) {
    animateVideo.setAttribute('controls', 'controls')
  }
  //   if (bigMedia === video alors j'active le controls)
  if (bigMedia.match('video') !== null) {
    // set attributes controls pour l'enlever ensuite?
    console.log('ça match')
    giveVideoAccessibleControls()
    videoControls()
    const videoPlayer = document.querySelector('.controls')
    console.log(videoPlayer)
    videoPlayer.addEventListener('focus', function (a) {
      console.log('focus dans controls' + a.target)
      a.target.addEventListener('keydown', function (e) {
        console.log('dans la video :' + e.key)
      })
    })
    // console.log(animateVideo)
  }
}

// _________________ Navigation
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

// je crée un listener sur le click du next button, qui joue la fonction next et rempli la lightbox
const lightboxModalNext = document.querySelector('#lightbox_modal-next-button')
lightboxModalNext.addEventListener('click', (e) => {
  nextMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})

const lightboxModalPrevious = document.querySelector('#lightbox_modal-previous-button')
lightboxModalPrevious.addEventListener('click', (e) => {
  previousMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})

const closeId = document.querySelector('#close-lightbox')
closeId.addEventListener('click', (e) => {
  //  closeId.style.backgroundColor = "blue";
  closeLightboxModal()
})

function focusInLightbox (e) {
  e.preventDefault()
  let index = focusablesLightbox.findIndex(
    (f) => f === lightboxModal.querySelector(':focus')
  )
  if (e.shiftKey === true) {
    index--
  } else {
    index++
  }
  if (index >= focusablesLightbox.length) {
    index = 0
  }
  if (index < 0) {
    index = focusablesLightbox.length - 1
  }
  focusablesLightbox[index].focus()
}

const keyboardNavigationOnLightbox = function (e) {
  e.preventDefault()
  //  console.log(e.key)
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeLightboxModal(e)
  } else if (e.key === 'Tab' && lightboxModal.matches('aria-hidden') === false) {
    focusInLightbox(e)
    // console.log(document.activeElement.tabIndex)
    // if (e.key === 'Enter' && document.activeElement.tabIndex === 6) {
    //   console.log(e.key)
    //   closeLightboxModal(e)
    // }
    // J'aimerai avec Tab, tabuler dans la video
  } else if (e.key === 'ArrowLeft' && lightboxModal.matches('aria-hidden') === false) {
    previousMedia(photographerMedia)
    giveLightboxItsMedias()
    createFocusablesLightbox()
  } else if (e.key === 'ArrowRight' && lightboxModal.matches('aria-hidden') === false) {
    nextMedia(photographerMedia)
    giveLightboxItsMedias()
    createFocusablesLightbox()
  }
}

const insideLightboxModal = document.querySelector('.lightbox_modal')
// console.log(insideLightboxModal)
insideLightboxModal.addEventListener('focus', function (a) {
  //  a.preventDefault();
  console.log("j'ai le focus dans la LB")
  a.target.addEventListener('keydown', function (e) {
    console.log("quelq'un a appuyé sur un bouton dans la LB")
    //  console.log(e.target.children) // select-selected
    //  console.log(this.children) // 'select items'
    // if (e.key === "Tab") {
    // } else
    // if (e.key !== 'Tab') {
    //   e.preventDefault()
    // }

    if (document.activeElement.tabIndex === 6) {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation()
        closeLightboxModal()
      }
    } else if (document.activeElement.tabIndex === 5) {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation()
        nextMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      }
    } else if (document.activeElement.tabIndex === 4) {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation()
        previousMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      }
    }
    // else if (document.activeElement.tabIndex === 2) {
    //   e.stopImmediatePropagation()
    //   e.preventDefault()
    //   console.log('je suis sur un tabindex2')
    //   // const player = document.querySelectorAll('#animateVideo, .controls')
    //   // player.addEventListener('keydown', keyboardNavigationOnLightboxVideo(e))
    //   // e.preventDefault()
    //   //      e.stopImmediatePropagation()
    //   //      keyboardNavigationOnLightboxVideo()
    // }
  })
})

function giveVideoAccessibleControls () {
  const controlsButtons = `
      <button class="playpause">Play</button>
      <button class="stop">Stop</button>
      <button class="rwd">Rwd</button>
      <button class="fwd">Fwd</button>
      <div class="time">00:00</div>`
  const div = document.createElement('div')
  // console.log(lightboxMedia.lastChild)
  lightboxMedia.insertBefore(div, lightboxMedia.lastChild)
  // lightboxMedia.append(div)
  div.setAttribute('class', 'controls')
  div.setAttribute('tabIndex', '2')
  div.innerHTML = controlsButtons
  //  lightboxMedia.innerHTML = controlsButtons
  // const addNewControlsButtons = document.createElement('div').appendChild(
  // const text = document.createTextNode(controlsButtons)
  // const def = document.querySelector('.controls')
  // def.innerHTML = controlsButtons
//  lightboxMedia.append(div)
  // div.appendChild(text)
}

const player = document.querySelector('.controls')
console.log(player)
player.addEventListener('focus', function (a) {
  console.log('focus dans video et controls' + a.target)
  a.target.addEventListener('keydown', function (e) {
    console.log('dans la video :' + e.key)
  })
})
//  'keydown', keyboardNavigationOnLightboxVideo())

function keyboardNavigationOnLightboxVideo () {
  // const player = document.querySelectorAll('#animateVideo, .controls')
  // player.addEventListener('keydown')
  // si mon focus est sur la video ou sur le controls
  // alors je peux enter et space pour play
  // il n'y pas de sons
  // alors je peux accélérer avec arrowright
  // alors je peux revenir en arrière avec arrowleft
  // je rajoute pour le lecteur d'écran:
  //        - role button,(role :list?)
  //        - state selected, (expanded?)
  //        - name play, name fastForward etc

  console.log('dans la video :' + this.key)
}

export { main }
