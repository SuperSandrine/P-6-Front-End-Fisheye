// ***************** import ******************
import { totalOfLikes } from '../utils/likemeter.js'

export function photographerFactory (data) {
  const { name, city, id, country, tagline, price, portrait } = data

  const picture = `assets/photographers/${portrait}`
  const linkUrl = `photographer.html?id=${id}`

  function getUserCardDOM () {
    const link = document.createElement('a')
    link.setAttribute('href', linkUrl)
    link.setAttribute('title', `${name} - voir les détails du photographe`)
    const article = document.createElement('article')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', `portrait de ${name}`)
    const h2 = document.createElement('h2')
    h2.textContent = name
    const text = document.createElement('p')
    text.innerHTML = `<div tabindex="0" class="article_information">
    <p class="city">${city + ', ' + country} </p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€/jour</p></div>`
    article.appendChild(link)
    link.appendChild(img)
    link.appendChild(h2)
    article.appendChild(text)
    return article
  }

  function getPhotographHeader () {
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.innerHTML = `<section class="photograph-header_information">
      <h1 tabindex="2">${name}</h1>
      <div tabindex="3">
      <p class="city">${city + ', ' + country}</p>
      <p class="tagline">${tagline}</p></div>
    </section>
    <div class="photographer-header-pictureAndButton-box">
    <div class="photographer-header-button-box"><button tabindex="4" alt="contact me" class="contact_button" id="display-contact-modal" >
          Contactez-moi
        </button></div>
        <img tabindex="5" src="${picture}" alt="portrait de ${name}"/> </div>
    `
    return photographHeader
  }

  function getPhotographPrice () {
    const photographPrice = document.querySelector('.photograph-price')
    // photographPrice.innerHTML = `<p class="parent"><span>vide</span> <i class="fa-solid fa-heart heartSolid"></i></p><p>${price}€ / jour</p> `;
    photographPrice.innerHTML = `<p class="parent"><span>${totalOfLikes}</span>
    <i aria-label="likes" class="fa-solid fa-heart heartSolid"></i></p><p>${price}€ <span aria-label="par">/</span> jour</p> `
    return photographPrice
  }
  // pour afficher le nombre de likes, cette fonction doit être jouer après l'affichage de la galerie

  return {
    name,
    picture,
    // totalOfLikes,
    // allLikesForOne,
    getUserCardDOM,
    getPhotographHeader,
    getPhotographPrice
    // addALikeToTotal,
  }
}
