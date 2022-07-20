function photographerFactory(data) {
  const { name, city, id, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;
  const linkUrl = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    const link = document.createElement("a");
    link.setAttribute("href", linkUrl);
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const text = document.createElement("p");
    text.innerHTML = `<div class="article_information">
    <p class="city">${city + ", " + country} </p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€/jour</p></div>`;
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(text);
    return article;
  }

  function getPhotographHeader() {
    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.innerHTML = `<div class="photograph-header_information">
      <h2>${name}</h2>
      <p class="city">${city + ", " + country}</p>
      <p class="tagline">${tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
        <img src="${picture}"/>
    `;
    return photographHeader;
  }
  // Ok= TODO: il y a la création d'une div autour des 3 balises avec la première
  //ligne, peut-on l'enlever? = au lieu de créer un enfant, j'appelle la classe directement
  // et ne fait d'appendChild dans photograph.pages. Juste j'appelle ma const.

  function getPhotographPrice() {
    const photographPrice = document.querySelector(".photograph-price");
    photographPrice.innerHTML = `<p>000 007 <i class="fa-solid fa-heart heartSolid"></i></p><p>${price}€ / jour</p> `;
    return photographPrice;
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographHeader,
    getPhotographPrice,
  };
}
