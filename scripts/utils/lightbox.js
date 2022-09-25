
// plan: when I click on a media in the gallery
// this media is displayed alone in a modal lightbox
// I can navigate from one media to another with keyboard arrow

// ***************** import ******************
import { photographerMedia } from '../pages/photographer.js'
import { videoControls } from './videoControls.js'

// ***************** declared lets, const ******************
// DOM
const lightboxModal = document.getElementById('lightbox_modal')
const lightboxMedia = document.querySelector('.lightbox_modal-content')
const main = document.querySelector('#body')

// for arranging the tab navigation
const tabindexLightbox =
  'div[tabindex],button[tabindex],img[tabindex],video[tabindex],p[tabindex]'
let focusablesLightbox = []
let previouslyFocusedElement = null

// data storage
let idMedia // pour stocker l'id du média onclick sur la gallerie
let idArray // pour stocker un tableau de tous les id des media d'un photographe

// les 3 lets suivants pour remplir dynamiquement le innerhtml
let fillMediaImageSource
let fillMediaVideoSource
let fillMediaTitle

// ***************** functions ******************
// to sort lightbox elements with tabIndex in the reading order
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

// create an array with the reading order of each lightbox elements
// and sort this array according tabindex
function createFocusablesLightbox () {
  focusablesLightbox = Array.from(lightboxModal.querySelectorAll(tabindexLightbox))
  sortFocusablesLightbox()
  focusablesLightbox[0].focus()
}

// to launch Lightbox:
//   - memorised which previously focused element was before launching LB
//   - add and remove several attribute
//   - as parameter "e", i called media ID in media.js
//   - get the index of the media clicked from the array photographerMedia
//   - from the index, provide medias display in lightbox
//   - once Lightbox filled, create lightbox focusables.
export function displayLightboxModal (e) {
  previouslyFocusedElement = document.querySelector(':focus')
  lightboxModal.style.display = 'block'
  lightboxModal.removeAttribute('aria-hidden')
  lightboxModal.setAttribute('aria-modal', 'true')
  main.classList.add('no-scroll')
  main.setAttribute('aria-hidden', 'true')
  idMedia = e
  getIndexofMediasForLightbox(photographerMedia)
  giveLightboxItsMedias(photographerMedia)
  createFocusablesLightbox()
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
  }
}

// to avoid repetition in the several next functions,
// fillMedia provide lets to complete dynamically the
// lightbox and permit with only the index to display
// the right-media
function fillMedia (array) {
  fillMediaImageSource = array[indexOfMedia].image
  fillMediaVideoSource = array[indexOfMedia].video
  fillMediaTitle = array[indexOfMedia].title
}

// to get the index of a media ID, I should map array with only ids (make
// another array only with IDs), in the purpose to use indexOf method
// first function called on the lightbox launch
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

// nextMedia and previousMedia navigate in the array and create the
// carousel effect in using indexOfMedia
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

// create media components of Lightbox:
//    - using indexOfMedia value to complete either one or the other media image or video
//    - using a ternary to decide which type of media should appear
//    - if an element video exist, then add its component
function giveLightboxItsMedias () {
  const mediaBigImage = `<img tabindex="2" alt="${fillMediaTitle}" src="./assets/medias-vrac/${fillMediaImageSource}"/>`
  const mediaBigVideo = `
  <video title="la vidéo '${fillMediaTitle}', n'a pas de sons" id="animateVideo" tabindex="2" alt="${fillMediaTitle}" >
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

// --------- navigation part ----------
// I can navigate from one media to another with keyboard arrows

//  activation with a click listener on next button,
//  - play function next,
//  - create media components
//  - create focusables once media components are displayed
const lightboxModalNext = document.querySelector('#lightbox_modal-next-button')
lightboxModalNext.addEventListener('click', () => {
  nextMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})
// same process
const lightboxModalPrevious = document.querySelector('#lightbox_modal-previous-button')
lightboxModalPrevious.addEventListener('click', () => {
  previousMedia(photographerMedia)
  giveLightboxItsMedias()
  createFocusablesLightbox()
})
// activation of lightbox modal closure
const closeId = document.querySelector('#close-lightbox')
closeId.addEventListener('click', () => {
  closeLightboxModal()
})

// trap the focus inside the lightbox modal
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

// Keyboard navigation
const insideLightboxModal = document.querySelector('.lightbox_modal')
if (lightboxModal.matches('aria-hidden') === false) {
  insideLightboxModal.addEventListener('keydown', function (e) {
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

// <button class="ytp-play-button ytp-button"
// aria-keyshortcuts="k" data-title-no-tooltip="Lire" aria-label="Lire keyboard shortcut k" title="Lire (k)"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-148"></use><path class="ytp-svg-fill" d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" id="ytp-id-148"></path></svg></button>

// --------- video part ----------
// create player controls components for videos
function giveVideoAccessibleControls () {
  const controlsButtons = `
      <button aria-controls="animateVideo" aria-keyshortcuts="'Enter', ' '" aria-label="Lire, raccourci clavier enter ou espace" 
      title="Lire (Entrée ou Espace)" tabindex="2" class="playpause contact_button"><i class="fas fa-play"></i> Play</button>
      <button aria-controls="animateVideo" aria-label="Arrête la vidéo et la rembobine" tabindex="2" class="stop contact_button"><i class="fas fa-stop"></i> Stop</button>
      <button aria-controls="animateVideo" aria-keyshortcuts="'ArrowLeft'" aria-label="Rembobine, raccourci clavier flèche gauche" 
      title="Rembobine (Flèche gauche)" tabindex="2" class="rwd contact_button"><i class="fas fa-backward"></i> Rewind</button>
      <button aria-controls="animateVideo" aria-keyshortcuts="'ArrowRight'" aria-label="Avance rapide, raccourci clavier flèche droite" 
      title="Avance rapide (Flèche droite)" tabindex="2" class="fwd contact_button"><i class="fas fa-forward"></i> Forward</button>
      <div> <div class="time">00:00</div></div>`
  const div = document.createElement('div')
  lightboxMedia.insertBefore(div, lightboxMedia.lastChild)
  div.setAttribute('class', 'controls')
  div.setAttribute('tabindex', '2')
  div.setAttribute('aria-controls', 'animateVideo')
  div.setAttribute('aria-label', 'commandes du lecteur vidéo')
  div.innerHTML = controlsButtons
}

// DOM part
// create keyboard events on video controls
//   - play video controls keyboard events fct on video and on video player
//   - also if the focused button is clicked through Enter, active the controls
function videoPlayerKeyboardNavigation () {
  const videoPlayer = document.querySelector('.controls')
  const video = document.querySelector('#animateVideo')

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
