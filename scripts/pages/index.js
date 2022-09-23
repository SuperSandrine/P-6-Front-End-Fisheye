// This files is purposely well commented to pedagogical matter.

// ***************** import ******************
import { photographerFactory } from '../factories/photographer.js'

// get datas photographers and make il usable to build the website
// get datas, change it in .json, fill an array with it
// return the array filled
async function getPhotographers () {
  let photographers = []
  await fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((response2) => {
      photographers = response2.photographers
    })
  // console.log(photographers)
  return { photographers }
}

// Display the data catch previously, it's a "presentation" function
async function displayData (photographers) {
  // class name of the section in main in html, currently the only section of main.
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach((photographer) => {
    // in the big function in factories files, for each photographer, we
    // call the photographerFactory and put it in const photographModel
    const photographerModel = photographerFactory(photographer)
    // for each photographModel, we call the getUserCardDOM function and put it in the
    // const userCardDOM
    const userCardDOM = photographerModel.getUserCardDOM()
    // In the main/PhotorapherSection, add a node at the end of the list of a const
    // userCardDOM.
    photographersSection.appendChild(userCardDOM)
  })
}

// play the display function in the right order
async function init () {
  // In the function init, const of object Photographers wait that
  // the function getPhotographers doing its job and return the
  // promise (result or error).
  const { photographers } = await getPhotographers()
  // once the promise gotten, the function displayData is played with the result
  displayData(photographers)
}

// play the function
init()
