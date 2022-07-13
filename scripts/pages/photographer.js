//Mettre le code JavaScript lié à la page photographer.html// +++++++++++++++++++++ça marche, mais est-ce essentiel de créer une variable?

// my declared lets
// datas stored
let photographers = [];
let media = [];
let photographerData;
// current url
let activeUrl = new URL(window.location.href);
let parameterID = activeUrl.searchParams.get("id");
console.log(parameterID);

// Cette fonction va chercher la données,
// puis la transforme en JSON
// puis remplie le tableau let
// console log
// renvoie l'objet photographers
async function getPhotographers() {
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers; //>>> si la let photographers != de constance)
    });
  return { photographers };
}

async function getMedia() {
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      media = response2.media; //>>> si la let photographers != de constance)
    });
  return { media };
}
// todo: comment savoir si ça marche? = je joue la fonction:
// mais le console.log dans la fonction ne s'affiche pas. par
// contre quand j'interroge la console, elle connait media et
// c'est bien en tableau plein
getMedia();

// avec l'id, récupérer les autres données dans le tableau:
// j'arrive à récupérer la partie de l'array dans la console avec la deuxième partie
// de cet ordre.
// TODO: en gros faut que je dise d'attendre d'avoir le tableau photographers : comment?
photographerData = photographers.filter((el) => el.id == parameterID);

//Plan:
//  OK=> récupérer l'adresse URl courante: https://www.journaldunet.fr/web-tech/developpement/1202481-comment-recuperer-le-chemin-de-l-url-courante-dans-jquery-et-l-assigner-a-une-variable/#:~:text=Pour%20cela%2C%20JavaScript%20poss%C3%A8de%20nativement,valeur%20de%20l'attribut%20pathname.
//  OK =>récupérer l'id du paramètre pour afficher ses données dans le display : https://waytolearnx.com/2019/10/comment-recuperer-les-parametres-durl-en-javascript.html
//  avec l'id, récupérer les autres données dans le tableau avec .find, .filter,
//.indexOf, .includes: https://www.digitalocean.com/community/tutorials/js-array-search-methods-fr

// Plan suite:
// on a récupéré les infos
// on affiche les infos

async function displayData(photographer) {
  console.log(photographer);
  const photographersSection =
    document.getElementsByClassName("photograph-header");
  // photographers.forEach((photographer) => {
  //   const photographerModel = photographerFactory(photographer);
  //   const userCardDOM = photographerModel.getUserCardDOM();
  //   photographersSection.appendChild(userCardDOM);
  // });
}

async function init() {
  const { photographers } = await getPhotographers();
  photographerData = photographers.filter((el) => el.id == parameterID);
  displayData(photographerData);
}
init();
