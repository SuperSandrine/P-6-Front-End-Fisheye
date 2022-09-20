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

// const videoPlayer = document.querySelector('.controls')
// console.log(videoPlayer.matches('.controls'))
//    console.log(videoPlayer)
// videoPlayer.addEventListener('focus', function (a) {
// const playPauseBtn = document.querySelector('.playpause')
// const stopBtn = document.querySelector('.stop')
// const rwdBtn = document.querySelector('.rwd')
// const fwdBtn = document.querySelector('.fwd')

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
}

function createFocusablesLightbox () {
  // on crée le tableau d'ordre de lecture une fois, la lightbox affichée
  focusablesLightbox = Array.from(lightboxModal.querySelectorAll(tabindexLightbox))
  // on range le tableau en fonction des tabindex
  sortFocusablesLightbox()
  focusablesLightbox[0].focus()
}

// en paramètre du display "e", j'ai appelé l'id du média dans media.js
// quand je clique sur la photo, je récupère l'index de l'image pour afficher
// ses informations et l'image dans la lightbox
export function displayLightboxModal (e) {
  lightboxModal.style.display = 'block'
  lightboxModal.removeAttribute('aria-hidden')
  lightboxModal.setAttribute('aria-modal', 'true')
  main.classList.add('no-scroll')
  main.setAttribute('aria-hidden', 'true')
  idMedia = e
  getIndexofMediasForLightbox(photographerMedia)
  giveLightboxItsMedias(photographerMedia)
  createFocusablesLightbox()
  previouslyFocusedElement = document.querySelector(':focus')
  return idMedia
}

// to close modal
function closeLightboxModal () {
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus()
    lightboxModal.style.display = 'none'
    lightboxModal.setAttribute('aria-hidden', 'true')
    lightboxModal.removeAttribute('aria-modal')
    main.classList.remove('no-scroll')
    main.removeAttribute('aria-hidden')
    //    window.removeEventListener('keydown', keyboardNavigationOnLightbox)
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
  fillMedia(array)
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
  } else {
    fillMedia(array)
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
  if (indexOfMedia < 0) {
    indexOfMedia = array.length - 1
    fillMedia(array)
  } else {
    fillMedia(array)
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
  const animateVideo = document.querySelector('#animateVideo')
  if (animateVideo !== null) {
    animateVideo.setAttribute('controls', 'controls')
  }
  if (bigMedia.match('video') !== null) {
    giveVideoAccessibleControls()
    videoControls()
    videoPlayerKeyboardNavigation()
  }
}

// _________________ Navigation
// dans la ligthbox je passe d'une image à l'autre avec les fleches.
// soit je navigue dans un array avec les flèches.

// je crée un listener sur le click du next button, qui joue la fonction next et rempli la lightbox
const lightboxModalNext = document.querySelector('#lightbox_modal-next-button')
lightboxModalNext.addEventListener('click', () => {
  nextMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})

const lightboxModalPrevious = document.querySelector('#lightbox_modal-previous-button')
lightboxModalPrevious.addEventListener('click', () => {
  previousMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})

const closeId = document.querySelector('#close-lightbox')
closeId.addEventListener('click', () => {
  closeLightboxModal()
})

function focusInLightbox (e) {
  e.preventDefault()
  e.stopPropagation()
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

const insideLightboxModal = document.querySelector('.lightbox_modal')
if (lightboxModal.matches('aria-hidden') === false) {
  insideLightboxModal.addEventListener('keydown', function (e) {
    //    console.log("quelq'un a appuyé sur un bouton dans la LB", e.key)
    if (e.key === 'Tab' && lightboxModal.matches('aria-hidden') === false) {
      focusInLightbox(e)
    } else if (e.key !== 'Tab') {
      e.stopImmediatePropagation()
      e.preventDefault()
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeLightboxModal(e)
      } else if (e.key === 'ArrowLeft' && lightboxModal.matches('aria-hidden') === false) {
        previousMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      } else if (e.key === 'ArrowRight' && lightboxModal.matches('aria-hidden') === false) {
        nextMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      } else if (document.activeElement.tabIndex === 6 && e.key === 'Enter') {
        closeLightboxModal()
      } else if (document.activeElement.tabIndex === 5 && e.key === 'Enter') {
        nextMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      } else if (document.activeElement.tabIndex === 4 && e.key === 'Enter') {
        previousMedia(photographerMedia)
        giveLightboxItsMedias()
        createFocusablesLightbox()
      }
    }
  })
}

function giveVideoAccessibleControls () {
  const controlsButtons = `
      <button tabindex="2" class="playpause">Play</button>
      <button tabindex="2" class="stop">Stop</button>
      <button tabindex="2" class="rwd">Rwd</button>
      <button tabindex="2" class="fwd">Fwd</button>
      <div class="time">00:00</div>`
  const div = document.createElement('div')
  lightboxMedia.insertBefore(div, lightboxMedia.lastChild)
  div.setAttribute('class', 'controls')
  div.setAttribute('tabindex', '2')
  div.innerHTML = controlsButtons
}
function videoPlayerKeyboardNavigation () {
  const videoPlayer = document.querySelector('.controls')
  console.log('player', videoPlayer)

  const video = document.querySelector('#animateVideo')
  console.log('video', video)

  const playPauseBtn = document.querySelector('.playpause')
  const stopBtn = document.querySelector('.stop')
  const rwdBtn = document.querySelector('.rwd')
  const fwdBtn = document.querySelector('.fwd')

  function activeKeyboardShortcuts (a) {
    a.target.addEventListener('keydown', function (b) {
      if (b.key === 'Enter' || b.key === ' ') {
        b.preventDefault()
        b.stopImmediatePropagation()
        playPauseBtn.click()
        b.stopImmediatePropagation()
      } else if (b.key === 'ArrowLeft') {
        b.preventDefault()
        b.stopImmediatePropagation()
        rwdBtn.click()
      } else if (b.key === 'ArrowRight') {
        b.preventDefault()
        b.stopImmediatePropagation()
        fwdBtn.click()
      }
    })
  }
  videoPlayer.addEventListener('focus', function (a) {
    activeKeyboardShortcuts(a)
  })
  video.addEventListener('focus', function (w) {
    activeKeyboardShortcuts(w)
  })
  playPauseBtn.addEventListener('focus', function () {
    this.addEventListener('keydown', function (d) {
      if (d.key === 'Enter' || d.key === ' ') {
        d.preventDefault()
        d.stopImmediatePropagation()
        playPauseBtn.click()
      }
    })
  })
  stopBtn.addEventListener('focus', function () {
    this.addEventListener('keydown', function (f) {
      if (f.key === 'Enter' || f.key === ' ') {
        f.preventDefault()
        f.stopImmediatePropagation()
        stopBtn.click()
      }
    })
  })
  rwdBtn.addEventListener('focus', function () {
    this.addEventListener('keydown', function (h) {
      if (h.key === 'Enter' || h.key === ' ') {
        h.preventDefault()
        h.stopImmediatePropagation()
        rwdBtn.click()
      }
    })
  })
  fwdBtn.addEventListener('focus', function () {
    this.addEventListener('keydown', function (j) {
      if (j.key === 'Enter' || j.key === ' ') {
        j.preventDefault()
        j.stopImmediatePropagation()
        this.click()
      }
    })
  })
}

export { main }
