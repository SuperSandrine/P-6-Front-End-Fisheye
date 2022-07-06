//Mettre le code JavaScript lié à la page photographer.html// +++++++++++++++++++++ça marche, mais est-ce essentiel de créer une variable?

// my lets declared and to complete later.
let photographers = [];
let media = [];

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
  console.log(photographers);
  return { photographers };
}

async function getMedia() {
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      media = response2.media; //>>> si la let photographers != de constance)
    })
    .then(console.log(media));
  return { media };
}
// todo: comment savoir si ça marche? = je joue la fonction:
// mais le console.log dans la fonction ne s'affiche pas. par
// contre quand j'interroge la console, elle connait media et
// c'est bien en tableau plein
getMedia();

// this function Display the data catched previously, it's a "presentation" function
async function displayData(photographers) {
  // class name of the section in main, currently the only section of main.
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    // in the big function in factories files, for each photographer, we
    // call the photographerFactory and put it in const photographModel
    const photographerModel = photographerFactory(photographer);
    // for each photographMOdel, we call the getUserCardDOM function and put it in the
    // const userCardDOM
    const userCardDOM = photographerModel.getUserCardDOM();
    // In the main/PhotorapherSection, add a node at the end of the list of a const
    //userCardDOM.
    photographersSection.appendChild(userCardDOM);
  });
}
// Where is await? Await should be where we'll call the function, at
// this moment we have a function but, we havent call it yet.

// async Function to init:
async function init() {
  // In the function init, const of object Photographers wait that
  // the function getPhotographers doing its job and return the
  // promise (result or error).
  const { photographers } = await getPhotographers();
  // Todo: que veut dire les accolades ci-dessus?
  // once the promise gotten, it apply the function displayData
  displayData(photographers);
  // TODO: qu'est ce display data, écrire la fonction ou est-ce une méthode?
}
// call of the async function just previouslty discribed.
init();
