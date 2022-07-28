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

const likesDiv = document.querySelector(".likes");
const numberOfLikes = document.querySelector(".likes p");
const heartLikes = document.querySelector(":scope .likes i");
console.log(heartLikes);

// array.forEach((element) => {
//   //pour chaque media
//   //j'écoute et je n'écoute plus
// });
