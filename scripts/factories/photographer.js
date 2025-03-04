// ***************** import ****************** //
import { totalOfLikes } from '../utils/likemeter.js'

// ********************************** //
// photographerFactory create several components for each photographer:
//   -card for the index.html
//   -header for the photograph.html
//   -price box for the photograph.html
export function photographerFactory (data) {
  const { name, city, id, country, tagline, price, portrait } = data

  const picture = `assets/photographers/${portrait}`
  const linkUrl = `photographer.html?id=${id}`

  // Create the card for each photographer inside an <article>
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
    <p class="price">${price}€<span display:"inline" aria-label="par">/</span>jour</p></div>`
    article.appendChild(link)
    link.appendChild(img)
    link.appendChild(h2)
    article.appendChild(text)
    return article
  }

  // Create the main header of the photograph.html page
  function getPhotographHeader () {
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.innerHTML = `
    <section class="photograph-header_information">
      <h1 tabindex="2">${name}</h1>
      <div tabindex="3">
        <p class="city">${city + ', ' + country}</p>
        <p class="tagline">${tagline}</p>
      </div>
    </section>
    <div class="photographer-header-pictureAndButton-box">
      <div class="photographer-header-button-box">
        <button tabindex="4" alt="contact me" class="contact_button" id="display-contact-modal" >
          Contactez-moi
        </button>
      </div>
      <img tabindex="5" src="${picture}" alt="portrait de ${name}"/> 
    </div>
    `
    return photographHeader
  }

  // Create the price box with the total of likes counts from import
  function getPhotographPrice () {
    const photographPrice = document.querySelector('.photograph-price')
    photographPrice.innerHTML = `<p class="parent"><span>${totalOfLikes}</span>
    <i role="img" aria-label="likes" class="fa-solid fa-heart heartSolid"></i></p><p>${price}€ <span aria-label="par">/</span> jour</p> `
    return photographPrice
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographHeader,
    getPhotographPrice
  }
}
