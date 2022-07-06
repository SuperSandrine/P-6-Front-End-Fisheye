// function photographerFactory(data) {
//   const { name, city, country, tagline, price, portrait } = data;

//   // todo: avec les 2 clefs des objets json et on obtient data, data
//   // qui est le paramètre de photographerfactory
//   // toUn: data est la valeur de const, du coup comment ça marche

//   const picture = `assets/photographers/${portrait}`;
//   // cette constante va cherhcher l'image dans le fichier sus-cité
//   // TODO: appeler le portrait dans la const précédente, portrait = nom de l'image
//   // portrait est un paramètre

//   // todo: comment ces élément sont-ils remplis?
//   // le getUserCardDOM contient les infos basiques de la page d'accueil
//   // elle crée les cards ou article de chaque photographe
//   function getUserCardDOM() {
//     const article = document.createElement("article");
//     const img = document.createElement("img");
//     const city = document.createElement("city");
//     const country = document.createElement("country");
//     const tagline = document.createElement("tagline");
//     const price = document.createElement("price");
//     img.setAttribute("src", picture); // ici on ajoute l'attribut source avec la
//     // const picture définit juste avant qui va chercher le fivier dans le bon dossier
//     //TODO: ajouter l'alt avec le nom dynamiquement
//     const h2 = document.createElement("h2");
//     const p = document.createElement("p");
//     h2.textContent = name;
//     p.innerHTML = photographer.map(
//       (photographer) => `
//     <h4> ${photographer.city}</h4>
//     `
//     );
//     article.appendChild(img);
//     article.appendChild(h2);
//     article.appendChild(p);
//     return article;
//   }
//   return { name, picture, getUserCardDOM };
// }
// la fonction getUsercardDOMM renvoie un objet avec name, picture et la dite fonction???
// toUn, comment marche la récursivité?

function photographerFactory(data) {
  const { name, city, id, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;
  //const linkUrl = `${id-}photographer.html`;
  const linkUrl = `photographer.html?id=${id}`;
  //TODO: personnaliser la page html avec id? = en rajoutant des paramètres
  // Todo: comment rajouter des paramètres ? = avec ?
  // Todo: est ce que j'ai bien compris les paramètres?

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
  return { name, picture, getUserCardDOM };
}
