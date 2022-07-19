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

// Cette fonction va chercher les données,
// puis la transforme en JSON
// puis remplie deux tableaux let photographers et let media
// renvoie les objets photographers et media
async function getPhotographers() {
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
      media = response2.media; //>>> si la let photographers != de constance)
    });
  return { media }, { photographers };
}

async function displayData(photographer) {
  console.log(photographer);
  // const photographHeaderDiv =
  //   document.getElementsByClassName("photograph-header");
  // thomas: ça ne marche pas avec getElement mais ça marche avec query? Pourquoi?
  const photographHeaderDiv = document.querySelector(".photograph-header");
  photographer.forEach((id) => {
    const photographerModel = photographerFactory(id);
    const printPhotographHeader = photographerModel.getPhotographHeader();
    photographHeaderDiv.appendChild(printPhotographHeader);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  photographerData = photographers.filter((el) => el.id == parameterID);
  displayData(photographerData);
}
init();

// Plan suite:
// on a récupéré les infos
// on affiche les infos
