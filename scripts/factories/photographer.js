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
  // function getPhotographHeader() {
  //   const photographHeaderInformation = document.createElement("div");
  //   photographHeaderInformation.innerHTML = `<div class="photograph-header_information">
  //   <h2>${name}</h2>
  //   <p class="city">${city + ", " + country}</p>
  //   <p class="tagline">${tagline}</p>
  // </div>`;
  //   photographHeaderInformation.appendChild;
  //   return photographHeaderInformation;
  // }
  // function getPhotographHeader() {
  //   const photographHeaderInformation = document.createElement("div");
  //   console.log(photographHeaderInformation);
  //   const contactButton = document.createElement("button");
  //   const img = document.createElement("img");
  //   img.setAttribute("src", picture);
  //   photographHeaderInformation.innerHTML = `<div class="photograph-header_information">
  //   <h2>${name}</h2>
  //   <p class="city">${city + ", " + country}</p>
  //   <p class="tagline">${tagline}</p>
  // </div>`;
  //   photographHeaderInformation.appendChild(contactButton);
  //   photographHeaderInformation.appendChild(img);
  //   return photographHeaderInformation;
  // }

  // function getPhotographHeader() {
  //   const photographHeader = document.getElementsByClassName(
  //     "photographer-header"
  //   );

  //   const photographHeaderInformation = document.createElement("div");
  //   photographHeaderInformation.setAttribute(
  //     "class",
  //     "photograph-header_information"
  //   );
  //   console.log(photographHeaderInformation);
  //   const contactButton = document.createElement("button");
  //   const img = document.createElement("img");
  //   img.setAttribute("src", picture);
  //   photographHeaderInformation.innerHTML = `
  //   <h2>${name}</h2>
  //   <p class="city">${city + ", " + country}</p>
  //   <p class="tagline">${tagline}</p>`;
  //   photographHeader.appendChild(photographHeaderInformation);
  //   photographHeader.appendChild(contactButton);
  //   photographHeader.appendChild(img);
  //   return photographHeader;
  // }

  // function getPhotographHeader() {
  //   const photographHeader = document.createElement("div");
  //   const photographHeaderInformation = document.createElement("div");
  //   photographHeaderInformation.setAttribute(
  //     "class",
  //     "photograph-header_information"
  //   );
  //   const contactButton = document.createElement("button");

  //   const img = document.createElement("img");
  //   img.setAttribute("src", picture);
  //   photographHeaderInformation.innerHTML = `
  //   <h2>${name}</h2>
  //   <p class="city">${city + ", " + country}</p>
  //   <p class="tagline">${tagline}</p>`;
  //   photographHeader.appendChild(photographHeaderInformation);
  //   photographHeader.appendChild(contactButton);
  //   photographHeader.appendChild(img);
  //   console.log(photographHeader);

  //   return photographHeader;
  // }

  function getPhotographHeader() {
    const photographHeader = document.createElement("div");
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
  // TODO: il y a la création d'une div autour des 3 balises avec la première
  //ligne, peut-on l'enlever?

  return { name, picture, getUserCardDOM, getPhotographHeader };
}
