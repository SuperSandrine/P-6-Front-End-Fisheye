// +++++++++++++++++++++ça marche, mais est-ce essentiel de créer une variable?
// let PhotographersData = [];
// async function getPhotographers() {
//   await fetch("/data/photographers.json")
//     .then((response) => response.json())
//     .then((data) => (PhotographersData = data.photographers));
//   console.log(PhotographersData[0]);
//    return PhotographersData;
//}
//++++++++++++++++++++++++++ça marche
// let PhotographersData = [];

// const fetchPhotographers = async () => {
//   await fetch("/data/photographers.json")
//     .then((response) => response.json())
//     .then((data) => (PhotographersData = data.photographers));

//   console.log(PhotographersData);
// };

// fetchPhotographers();
//++++++++++++++++++++++++++++++

//Cette fonction va chercher la données,
//puis la transforme en JSON
//puis remplie le tableau index par index (pour éviter davoir un tableau dans le tableau)
// console loge
// renvoie l'objet photographers
async function getPhotographers() {
  let photographers = []; //Est-ce que ça doit être une constante ou une variable?
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((response2) => {
      // photographers.push(
      //   response2.photographers[0],
      //   response2.photographers[1],
      //   response2.photographers[2],
      //   response2.photographers[3],
      //   response2.photographers[4],
      //   response2.photographers[5]
      // );
      photographers = response2.photographers; //>>> si la let photographers != de constance)
      // photographers.push(response2.photographers); >>> j'importe un tableau dans [0]
    });
  console.log(photographers);
  return { photographers };
}
// TODO = simplifier cette répétition = possible si variable = variable plus appropriée
// comme choix du fait qu'on la modifie dans la fonction

// Penser à remplacer par les données récupérées dans le json
// TODO= récupérer les données d'un JSON avec la fonction fetch, utiliser
// l'API native de JS Fetch afin de récupérer les données = OK

// todo= faire un conloelog de ces datas = OK
// TODO= comppléter un array? objet? avec ces données = OK même s'il n'est
// présent que dans le monde virtuel, je veux dire sur la console.

// this function Display the data catch previously, it's a "presentation" function
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
