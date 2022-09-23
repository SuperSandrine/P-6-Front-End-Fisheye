// ***************** import ******************
import { photographerFactory } from '../factories/photographer.js'
import { mediaFactory } from '../factories/media.js'
import { addALike, allLikesForTotal, displayAllLikesForTotal } from '../utils/likemeter.js'
import { displayLightboxModal } from '../utils/lightbox.js'
import { displayContactModal, giveModalAName } from '../utils/contactForm.js'

// ***************** declared lets, const ******************
// datas storage
let photographers = []
let media = []
let photographerData
let photographerMedia
// DOM
const photographGalleryDiv = document.querySelector('.photograph-gallery ')

//  current url to get the photographer ID
const activeUrl = new URL(window.location.href)
const parameterID = activeUrl.searchParams.get('id')

// ***************** functions ******************
// get datas and return 2 array with them
async function getPhotographers () {
  await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers
      media = response2.media
    })
  return { media, photographers }
}

// Display the photograph datas from ID provide in url (line 17/19)
// on call in the init fct,
async function displayData (photographer) {
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id)
    photographerModel.getPhotographHeader()
    photographerModel.getPhotographPrice()
  })
}

// Display gallery:
//  -Display cards
//  -Each card have links that active the lightbox (links)
//     -on click
//     -on keyboard navigation: focus/tab + keydown || keyup
async function displayMedia (media) {
  photographGalleryDiv.innerHTML = ''
  media.forEach((id) => {
    const makeACard = mediaFactory(id)
    const printGallery = makeACard.getCardGallery()
    photographGalleryDiv.appendChild(printGallery.article)
  })

  // DOM: get an array with all the gallery picture which are in <a>
  const links = document.querySelectorAll('.display-lightbox')
  // activation of lightbox display with mouse listener
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const cible = e.target.parentNode
      displayLightboxModal(parseInt(cible.getAttribute('data-id')))
    })
  })
  // activation of lightbox display with keyboard listener
  links.forEach((b) => {
    b.addEventListener('focus', function (o) {
      o.preventDefault()
      o.stopImmediatePropagation()
      o.target.addEventListener('keydown', function (u) {
        if (u.key !== 'Tab') {
          u.preventDefault()
        }
        if (u.key === 'Enter') {
          u.stopImmediatePropagation()
          u.preventDefault()
          displayLightboxModal(parseInt(o.target.getAttribute('data-id'), 10))
        }
      })
      o.target.addEventListener('keyup', function (u) {
        if (u.key !== 'Tab') {
          u.preventDefault()
        }
        if (u.key === ' ') {
          u.preventDefault()
          u.stopImmediatePropagation()
          displayLightboxModal(parseInt(o.target.getAttribute('data-id'), 10))
        }
      })
    })
  })

  const buttonLike = document.querySelectorAll('.play-addALike')
  // activation of likemeter with mouse listener
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
  // activation of likemeter with keyboard listener
  buttonLike.forEach((b) => {
    b.addEventListener('focus', function (o) {
      o.preventDefault()
      o.stopPropagation()
      o.target.addEventListener('keyup', function (u) {
        u.stopImmediatePropagation()
        u.preventDefault()
        if (u.key === ' ') {
          u.preventDefault()
          const parameterId = parseInt(u.target.getAttribute('data-id'))
          const parameterLikes = parseInt(u.target.getAttribute('data-likes'))
          addALike(parameterLikes, parameterId)
        }
      })
      o.target.addEventListener('keypress', function (u) {
        u.stopImmediatePropagation()
        u.preventDefault()
        if (u.key === 'Enter') {
          u.preventDefault()
          const parameterId = parseInt(u.target.getAttribute('data-id'))
          const parameterLikes = parseInt(u.target.getAttribute('data-likes'))
          addALike(parameterLikes, parameterId)
        }
      })
    })
  })
}

// plays functions from display, likemeter, name Form Modal, on the right order:
//   - filtered datas and array according the parameterID (from url)
//   - display header and price box
//   - display gallery
//   - count likes and display them
//   - get the name to complet the modal heading
//   - add a listener on the button to display contact form modal
async function init () {
  const { photographers, media } = await getPhotographers()
  photographerData = photographers.filter((el) => el.id === parseInt(parameterID))
  photographerMedia = media.filter((el) => el.photographerId === parseInt(parameterID))
  displayData(photographerData)
  // and same for gallery
  displayMedia(photographerMedia)
  allLikesForTotal()
  displayAllLikesForTotal()
  giveModalAName(photographerData)
  const openContactModal = document.querySelector('#display-contact-modal')
  openContactModal.addEventListener('click', (e) => {
    displayContactModal()
  })
}
init()

export { photographerMedia, displayMedia }
