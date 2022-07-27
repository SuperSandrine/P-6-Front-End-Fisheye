//Cette fonction va chercher la données,
//puis la transforme en JSON
//puis remplie le tableau index par index (pour éviter davoir un tableau dans le tableau)
// console log
// renvoie l'objet photographers
async function getPhotographers() {
  let photographers = [];
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers;
    });
  console.log(photographers);
  return { photographers };
}

// this function Display the data catch previously, it's a "presentation" function
async function displayData(photographers) {
  // class name of the section in main in html, currently the only section of main.
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

// async Function to init:
async function init() {
  // In the function init, const of object Photographers wait that
  // the function getPhotographers doing its job and return the
  // promise (result or error).
  const { photographers } = await getPhotographers();
  // once the promise gotten, the function displayData is played with the result
  displayData(photographers);
}
// call of the function just previouslty discribed.
init();
