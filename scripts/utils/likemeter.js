// chaque fois que je clique sur un coeur,
//j'ajoute un coeur
// par contre je ne peux cliquer qu'une fois sur un coeur

// tous les coeurs s'additionne à côté du prix

//Thomas: je commence par quoi?
//le total des coeurs qui capture la donnée par dans l'array mais celle affichée.

//Thomas: l'ajout de coeur à partir de la donnée affichée OU l'array

// limiter les cliqk à un click?? un listener? une incrémentation avec condition
//=>https://codepen.io/Eddy67/pen/ZEzrQMb?editors=0010
// addEventlistener puis removeEventListener on click
// const likesDiv = document.querySelector(".likes");

// const numberOfLikes = document.querySelector(".likes p");
// const heartLikes = document.querySelector(":scope .likes i");
// console.log(heartLikes);
// console.log(numberOfLikes);
// clicked = false;
//const heartLikes = document.querySelector(":scope .likes i");

function addALike(nbOfLikes, photoId) {
  let clicked = false;
  if (!clicked) {
    clicked = true;
    nbOfLikes++;
    document.querySelector(`.likes-${photoId} p`).innerHTML = nbOfLikes;
  }
}

let allLikes = [];
let totalOfLikes = 0;
function AllLikesForOne() {
  allLikes = document.querySelectorAll(".likesData");
  for (let i = 0; i < allLikes.length; i++) {
    totalOfLikes += parseInt(allLikes[i].innerHTML);
  }
  const newChild = document.createElement("span");
  const textNode2 = document.createTextNode(`${totalOfLikes}`);
  newChild.appendChild(textNode2);
  const paragrapheparent = document.querySelector(".parent");
  const childHasBeen = document.querySelector(".parent span");
  paragrapheparent.replaceChild(newChild, childHasBeen);
}
// si la fonction entend un changement ou un click, alors elle ajoute un coeur.

// let allLikes = [];
// let totalOfLikes = 0;
// function AllLikesForOne() {
//   allLikes = document.querySelectorAll(".likesData");
//   console.log("1er like : " + allLikes[6].innerHTML);
//   for (let i = 0; i < allLikes.length; i++) {
//     totalOfLikes += parseInt(allLikes[i].innerHTML);
//     //totalOfLikes += allLikes[i].innerHTML;
//   }
//   //console.log("total : " + totalOfLikes);

//   const newNode2 = document.createElement("span");
//   const textNode2 = document.createTextNode(`${totalOfLikes}`);
//   newNode2.appendChild(textNode2);
//   //console.log(newNode2);
//   //const paragrapheparent = document.getElementsByClassName("likesTotal");
//   const paragrapheparent = document.querySelector(".parent");
//   const childHasBeen = document.querySelector(".parent span");
//   //console.log(childHasBeen);
//   // le  premier p est london/UK, ciblé le p avec une classe

//   const paragrapheenfant = document.querySelector("#parent.i");
//   //console.log(paragrapheenfant);

//   //paragrapheparent.insertBefore(newNode2, paragrapheenfant);

//   paragrapheparent.replaceChild(newNode2, childHasBeen);

//   //   const photographPrice = document.querySelector(".photograph-price i");
//   //   console.log( "controle balise : " + photographPrice);
//   //   const textNode = document.createTextNode(`${totalOfLikes}`);
//   //   console.log( "controle textnodes : " + textNode);

//   // return totalOfLikes;
// }

// const photographPrice = document.querySelector(".photograph-price");
// photographPrice.innerHTML = `<p><i class="fa-solid fa-heart heartSolid"></i></p><p>${price}€ / jour</p> `;
// return photographPrice;

// const list = document.getElementById("myList");
// list.insertBefore(newNode, list.children[0]);

//   //while (likesData.hasChildNodes()){}
//   photographerMedia.forEach((element) => {
//     console.log([element].likes);
//   });

// // fonction qui marche et testé avec des consoles logs
// function addALike(nbOfLikes, photoId) {
//   let numberOfLikes = document.querySelector(`.likes-${photoId} p`).innerHTML;

//   let previousNumberOfLikes = nbOfLikes;
//   console.log("ancien nb de like : " + previousNumberOfLikes);
//   console.log("test query selector: " + numberOfLikes);
//   let clicked = false;

//   if (!clicked) {
//     clicked = true;
//     previousNumberOfLikes++;
//     console.log("nouveau nb de like : " + previousNumberOfLikes);

//     document.querySelector(`.likes-${photoId} p`).innerHTML =
//       previousNumberOfLikes;
//   }
// }

// essai avec e (le mettre aussi dans l'appel de la fonc en l25 de media.js)
// function addALike(nbOfLikes, photoId, e) {
//     let numberOfLikes = document.querySelector(`.likes-${photoId} p`).innerHTML;
//     let re = e.target.value;
//     console.log("event : " + re);

//     let previousNumberOfLikes = nbOfLikes;
//     console.log("ancien nb de like : " + previousNumberOfLikes);
//     console.log("test query selector: " + numberOfLikes);

//     if (!clicked) {
//       clicked = true;
//       previousNumberOfLikes++;
//       console.log("nouveau nb de like : " + previousNumberOfLikes);

//       document.querySelector(`.likes-${photoId} p`).innerHTML =
//         previousNumberOfLikes;
//     }
//   }

//const heartLikes = document.querySelector(":scope .likes i");
//heartLikes.addEventListener("click",(addALike(${likes},${id})));

// récupérer un identifiant pour le queryselector

// function addALike(e) {
//     let previousNumberOfLikes = e;
//     let numberOfLikes = document.querySelector(".likes p").innerHTML;
//     console.log("nb de likes originel : " + previousNumberOfLikes);

//     if (!clicked) {
//       clicked = true;
//       previousNumberOfLikes += 1;
//       document.querySelector(".likes p").innerHTML = previousNumberOfLikes;
//     }
//   }

// quand je clique sur n'importe quel coeur, ça ajoute au premier coeur
// faire un query seletor specifique our récupérer une target

// voir la gallerie qui a des images cliquables

// array.forEach((element) => {
//   //pour chaque media
//   //j'écoute et je n'écoute plus
// });

// var button = document.getElementById("clickme"),
//   count = 0;
// var clicked = false;

// button.onclick = function () {
//   if (!clicked) {
//     clicked = true;
//     count += 1;
//     button.innerHTML = "Click me: " + count;
//   }
