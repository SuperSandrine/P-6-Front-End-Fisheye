// Function select, use a select to create a dynamic div section and hide the select afterward
// custom select box sourced from W3S

//let sortingMethodFromList;

// const Deploiement = function (e) {
//   /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//   focusablesSortingMenu[0].style.backgroundColor = "blue";

//   if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.nextSibling.toggleAttribute("aria-expanded");
//     this.classList.toggle("select-arrow-active");
//     focusablesSortingMenu[0].focus();
//   }
//   if (e.key === "ArrowUp") {
//     closeAllSelect(selectedDiv);
//     e.preventDefault();
//     selectedDiv.nextSibling.classList.remove("select-hide");
//     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     selectedDiv.classList.add("select-arrow-active");
//     focusablesSortingMenu[2].focus();
//   }
// };

// function ouvrir() {
//   console.log("ça s'ouvre?");
//   if (selectedDiv.focus()) {
//     selectedDiv.addEventListener("keydown", Deploiement);
//     console.log("ouvert?");
//   }
// }

// selectedDiv.addEventListener("click", function (e) {
//   /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//   e.stopPropagation();
//   closeAllSelect(this);
//   this.nextSibling.classList.toggle("select-hide");
//   this.nextSibling.setAttribute("aria-expanded", "true");
//   this.classList.toggle("select-arrow-active");
// });

// en sauvegarde mardi 30 :23h
// //quand la selectBox est focus,
// // je peux l'ouvrir avec keydown
// // cette version fonctionne, mais utilise une seule fois keyUp et keydown
// customSelectClassElmnt.addEventListener("focus", function (e) {
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     if (e.key === "Tab") {
//     } else {
//       closeAllSelect(selectedDiv);
//       e.preventDefault();
//       if (e.key === " " || e.key === "Enter") {
//         selectedDiv.nextSibling.classList.remove("select-hide");
//         selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         selectedDiv.classList.add("select-arrow-active");
//         focusablesSortingMenu[0].focus();
//         // } else if (e.key === "ArrowUp") {
//         //   selectedDiv.nextSibling.classList.remove("select-hide");
//         //   selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         //   selectedDiv.classList.add("select-arrow-active");
//         //   focusablesSortingMenu[2].focus();
//         // }
//       }
//       focusInSortingMenu(e);
//     }
//   });
// });

//quand la selectBox est focus,
// je peux l'ouvrir avec keydown
// customSelectClassElmnt.addEventListener("focus", function (e) {
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     closeAllSelect(selectedDiv);
//     e.preventDefault();
//     console.log(optionsBoxDiv.getAttribute("aria-expanded"));
//     if (e.key === "Tab") {
//     }

//     if (
//       optionsBoxDiv.getAttribute("aria-expanded") === null &&
//       (e.key === "ArrowDown" || e.key === " " || e.key === "Enter")
//     ) {
//       selectedDiv.nextSibling.classList.remove("select-hide");
//       selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//       selectedDiv.classList.add("select-arrow-active");
//       focusablesSortingMenu[0].focus();
//     }
//     console.log(optionsBoxDiv.getAttribute("aria-expanded"));

//     if (
//       optionsBoxDiv.getAttribute("aria-expanded") === null &&
//       e.key === "ArrowUp"
//     ) {
//       selectedDiv.nextSibling.classList.remove("select-hide");
//       selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//       selectedDiv.classList.add("select-arrow-active");
//       focusablesSortingMenu[2].focus();
//     }

//     if (optionsBoxDiv.getAttribute("aria-expanded") === true) {
//       console.log("ça marche");
//       focusInSortingMenu(e);
//       console.log("ça marche bien");
//     }
//   });
// });

// let focusablesSortingMenu = [];
// let optionsSortingMenu = "div[role='option']";
// focusablesSortingMenu = Array.from(
//   customSelectClassElmnt.querySelectorAll(optionsSortingMenu)
// );
// console.log(focusablesSortingMenu);

// function focusInSortingMenu(e) {
//   //if (e.key === "Tab") {
//   //} else {
//   e.preventDefault();
//   let index = focusablesSortingMenu.findIndex(
//     (f) => f === selectedDiv.nextSibling.querySelector(":focus")
//   );
//   //    console.log(selectedDiv.nextSibling.querySelector(":focus"));
//   // TODO = Y a une erreur dans cette ligne, car une fois que selectedDiv a
//   // le focus, il faudrait qu'elle se déplie si on entre et pas que
//   // que ça bloque s'il y a le :focus.>>> défaut résolut en rajoutant un ignore
//   // sur le "tab", du coup ça ne se bloque plus mais le déploiement est ailleurs
//   if (e.key === "ArrowUp") {
//     index--;
//     if (index < 0) {
//       index = focusablesSortingMenu.length - 1;
//     }
//     focusablesSortingMenu[index].focus();
//   }
//   if (e.key === "ArrowDown") {
//     index++;
//     if (index >= focusablesSortingMenu.length) {
//       index = 0;
//     }
//     focusablesSortingMenu[index].focus();
//   }
//   if (e.key === "Escape" || e.key === "Esc") {
//     closeAllSelect();
//     selectedDiv.focus();

//     //DONE : mettre le focus sur le bouton de menu
//   }
// }
// //}

//window.addEventListener("keydown", keyboardNavInMenu);

// const keyboardNavInMenu = function (e) {
//   e.stopPropagation();
//   console.log(e.key);
//   OpenMenuDrop(e);}
//if aria expanded = true,

//--------------- test de lundi, moyen fonctionnel---------------
// const selectedButtonfocused = document.getElementById("selectedButton").focus();
// console.log(selectedButtonfocused);
// selectedButtonfocused;
// console.log(selectedButtonfocused);

// let selectedDivIsExpanded = false;

// let focusablesSortingMenu = [];
// let optionsSortingMenu = "div[role='option']";
// focusablesSortingMenu = Array.from(
//   customSelectClassElmnt.querySelectorAll(optionsSortingMenu)
// );
// console.log(focusablesSortingMenu[0]);

// window.addEventListener("keydown", function (e) {
//   e.stopPropagation();
//   console.log(e.key);
//   OpenMenuDrop(e);
//   //if aria expanded = true,
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     console.log(e.key);
//     MenuOnKeydown(e);
//   });
// });

// function MenuOnKeydown(e) {
//   e.preventDefault();

//   let index = focusablesSortingMenu.findIndex(
//     (f) => f === selectedDiv.nextSibling.querySelector(":focus")
//   );
//   //  console.log("fin" + index);

//   if (e.key === "ArrowUp") {
//     index--;
//     if (index < 0) {
//       index = focusablesSortingMenu.length - 1;
//     }
//   }
//   if (e.key === "ArrowDown") {
//     index++;
//     if (index >= focusablesSortingMenu.length) {
//       index = 0;
//     }
//   }
//   console.log("fin" + index);
//   focusablesSortingMenu[index].focus();
// }

//function

//source pour navigation clavier:
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html

// function closeAllSelect(elmnt) {
//   /*a function that will close all select boxes in the document,
//   except the current select box:*/
//   let x,
//     y,
//     i,
//     xl,
//     yl,
//     arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i);
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//       x[i].removeAttribute("aria-expanded");
//     }
//   }

//   //  console.log("fin : " + sortingMethodFromList);
//   sortingMedias();
// }
// /*if the user clicks anywhere outside the select box, then this line close all select boxes:*/
// window.addEventListener("click", closeAllSelect);
// TOUN, c'est marrant ça, on ne met pas de () après l'appel de
//cett fonction

// ----------- plan pour le tri --------//
/* quand je clique sur la popularité, 
l'array photographerMedia se trie 
ensuite ce nouvelle array est injecté dans la présentation de la galerie
et c'est ce même array qui est injecté dans la présentation de la lightbox
*/

//const selection = document.querySelector(".custom-select");
//selection.addEventListener("click", (e) => console.log(e));

/* -------- SORTING FUNCTIONS -----------*/

// // vvvvvvvvvvvv au dessous fonctionne avant samedi
// function sortingMedias() {
//   if (sortingMethodFromList === "Date") {
//     sortOnDate();
//     displayMedia(photographerMedia);
//     //    displayCars();
//     // fait un tri par date
//   }
//   if (sortingMethodFromList === "Titre") {
//     alphabeticalSortOnTitle();
//     displayMedia(photographerMedia);
//     // photographerMedia.title.sort();
//     // console.log("sorted array : " + photographerMedia);
//     // soit je fais des comparaison pour ranger mon tableau
//     // soit je crée un nouveau tableau que je mets dans l'ordre
//     // dans ce nouveau tableau je dois aussi mémoriser l'ancien et le nouvel index?

//     // fait un tri par Titre
//   }
//   if (sortingMethodFromList === "Popularité") {
//     sortOnPopularity();
//     displayMedia(photographerMedia);

//     // fait un tri par popularité
//   } else {
//     //ne fait rien
//   }
// }

// function sortOnPopularity() {
//   photographerMedia.sort(function (a, b) {
//     let x = a.likes;
//     let y = b.likes;
//     if (x < y) {
//       return -1;
//     }
//     if (x > y) {
//       return 1;
//     }
//     return 0;
//   });
// }

// function alphabeticalSortOnTitle() {
//   photographerMedia.sort(function (a, b) {
//     let x = a.title.toLowerCase();
//     let y = b.title.toLowerCase();
//     if (x < y) {
//       return -1;
//     }
//     if (x > y) {
//       return 1;
//     }
//     return 0;
//   });
// }

// function sortOnDate() {
//   photographerMedia.sort(function (a, b) {
//     let x = a.date;
//     let y = b.date;
//     if (x < y) {
//       return -1;
//     }
//     if (x > y) {
//       return 1;
//     }
//     return 0;
//   });
// }
// // ^^^^^^^au-dessus fonctionne avant samedi

//vvvvvvvvvvvv nouvel essai de samedi

//Si <select>: Pas d’attribut ARIA supplémentaire nécessaire
//Si listbox ARIA: le trigger du menu a comme attributs
//role=”button”, aria-haspopup=”listbox”, aria-expanded.
// Liste d’options : role=”listbox”, aria-activedescendant,
//aria-selected, aria-labelledby qui pointe vers l’input label

// function focusInSortingMenu(e) {
//   e.preventDefault();
//   let index = focusablesSortingMenu.findIndex(
//     (f) => f === sortingMenu.querySelector(":focus")
//   );
//   // if (e.shiftKey === true) {
//   //   index--;
//   // } else {
//   //   index++;
//   // }
//   // if (index >= focusablesLightbox.length) {
//   //   index = 0;
//   // }
//   // if (index < 0) {
//   //   index = focusablesLightbox.length - 1;
//   // }
//   focusablesSortingMenu[index].focus();
// }
// customSelectClassElmnt.addEventListener("keydown", function (e) {
//   console.log(e.key);
//   // focusInSortingMenu(e);
//   //  ouvrir();
//   //OpenMenuDrop(e);
//   focusInSortingMenu(e);
// });

// utilisation en ressource pour navigation clavier de
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html
// document.addEventListener(
//   "keydown",

//,
// { once: true }
//);

// *** Il y a 3 partie, l'animation dynamique, le sort, la navigation clavier
// ***************** partie variable ******************
let sortingMethodFromList;

// ***************** partie animation dynamique ******************
let customSelectClassElmnt,
  j,
  l,
  ll,
  selectTagElmnt,
  selectedDiv,
  optionsBoxDiv,
  optionDiv;

/*look for element with the class "custom-select":*/
customSelectClassElmnt = document.querySelector(".custom-select");
selectTagElmnt = customSelectClassElmnt.getElementsByTagName("select")[0]; // original options index [0]
ll = selectTagElmnt.length; // number of options :'4'
/*for each element, create a new DIV that will act as the selected item, or the main button:*/
selectedDiv = document.createElement("DIV");
selectedDiv.setAttribute("class", "select-selected");
selectedDiv.setAttribute("role", "button");
selectedDiv.setAttribute("id", "selectedButton");
selectedDiv.setAttribute("aria-haspopup", "listbox"); // indicates the button opens a menu
selectedDiv.setAttribute("aria-labelledby", "labelledSort");
selectedDiv.setAttribute("tabindex", "0");
selectedDiv.setAttribute("aria-controls", "listboxSort");
selectedDiv.innerHTML =
  selectTagElmnt.options[selectTagElmnt.selectedIndex].innerHTML; // fill the div inner HTML with let selecTagElmnt : 'filtr' at first

customSelectClassElmnt.appendChild(selectedDiv);

selectedDiv.addEventListener("click", function (e) {
  /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.nextSibling.setAttribute("aria-expanded", "true");
  this.classList.toggle("select-arrow-active");
});

/* create a new DIV that will contain the options list:*/
optionsBoxDiv = document.createElement("DIV");
optionsBoxDiv.setAttribute("class", "select-items select-hide");
optionsBoxDiv.setAttribute("role", "listbox");
optionsBoxDiv.setAttribute("aria-labelledby", "labelledSort");
optionsBoxDiv.setAttribute("id", "listboxSort");
optionsBoxDiv.setAttribute("tabindex", "-1");

for (j = 1; j < ll; j++) {
  /*for each option in the original select element except the [0] option which is "filtrer",
    create a new DIV that will act as an option item:*/
  optionDiv = document.createElement("DIV");
  optionDiv.setAttribute("role", "option");
  optionDiv.setAttribute("tabindex", "0");

  optionDiv.innerHTML = selectTagElmnt.options[j].innerHTML;

  optionDiv.setAttribute("id", `${optionDiv.innerHTML}`);

  // const RemplaceClickparEnter = function (e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   switch (e.key) {
  //     case "Enter":
  //     case " ":
  //       /*when an item is clicked, update the original select box, and the selected item:*/
  //       let oldSelection, i, originalSelectTag, changeSelectedDiv, sl;
  //       /* this. correspond à l'élément clické, soit la div date, div pop, div titre.*/
  //       originalSelectTag =
  //         this.parentNode.parentNode.getElementsByTagName("select")[0];
  //       console.log(originalSelectTag);

  //       sl = originalSelectTag.length;
  //       changeSelectedDiv = this.parentNode.previousSibling;
  //       /*h est la div contenant .select-items et .select-hide*/
  //       console.log(changeSelectedDiv);
  //       for (i = 0; i < sl; i++) {
  //         if (originalSelectTag.options[i].innerHTML == this.innerHTML) {
  //           console.log(this);
  //           originalSelectTag.selectedIndex = i;
  //           //          console.log(changeSelectedDiv.innerHTML);
  //           changeSelectedDiv.innerHTML = this.innerHTML;
  //           //          console.log(changeSelectedDiv.innerHTML);
  //           changeSelectedDiv.setAttribute(
  //             "aria-activedescendant",
  //             `${this.innerHTML}`
  //           );
  //           sortingMethodFromList =
  //             changeSelectedDiv.innerHTML; /* sortingMFL change à chaque clic */
  //           //console.log(sortingMethodFromList);
  //           /* voici l'information dont j'ai besoin pour jouer mon tri*/
  //           // ternaire :
  //           //s'il y a déjà une class? oui alors je la remove et j'en mets une, non j'en met une
  //           // ternaire

  //           oldSelection = this.parentNode.querySelector(".same-as-selected");
  //           oldSelection !== null
  //             ? oldSelection.removeAttribute("class") &
  //               oldSelection.removeAttribute("aria-selected") &
  //               this.setAttribute("class", "same-as-selected") &
  //               this.setAttribute("aria-selected", "true")
  //             : this.setAttribute("class", "same-as-selected") &
  //               this.setAttribute("aria-selected", "true");
  //           // OK DONE: pour quoi une ternaire ne fait pas le travail ? >>> il ne faut pas mettre
  //           // & mais &&

  //           //this.setAttribute("class", "same-as-selected");
  //           break;
  //         }
  //       }
  //       closeAllSelect();
  //       changeSelectedDiv.click();
  //   }
  // };

  //  optionDiv.addEventListener("click",RemplaceClickparEnter);

  // --- pour simplifer dessous et mettre un keydown listener mardi------
  optionDiv.addEventListener("click", function (e) {
    /*when an item is clicked, update the original select box, and the selected item:*/
    let oldSelection, i, originalSelectTag, changeSelectedDiv, sl;
    /* this. correspond à l'élément clické, soit la div date, div pop, div titre.*/
    originalSelectTag =
      this.parentNode.parentNode.getElementsByTagName("select")[0];
    //    console.log(originalSelectTag); // 'filtrer'
    sl = originalSelectTag.length;
    changeSelectedDiv = this.parentNode.previousSibling;
    //    console.log(changeSelectedDiv);
    /*h est la div contenant .select-items et .select-hide*/
    //  console.log(changeSelectedDiv);
    for (i = 0; i < sl; i++) {
      if (originalSelectTag.options[i].innerHTML == this.innerHTML) {
        originalSelectTag.selectedIndex = i;
        //console.log(changeSelectedDiv.innerHTML);//'filtrer'
        changeSelectedDiv.innerHTML = this.innerHTML;
        //console.log(changeSelectedDiv.innerHTML);//'Popularité'
        changeSelectedDiv.setAttribute(
          "aria-activedescendant",
          `${this.innerHTML}`
        );
        sortingMethodFromList =
          changeSelectedDiv.innerHTML; /* sortingMFL change à chaque clic */
        //console.log(sortingMethodFromList);
        /* voici l'information dont j'ai besoin pour jouer mon tri*/
        // ternaire :
        //s'il y a déjà une class? oui alors je la remove et j'en mets une, non j'en met une
        // ternaire

        oldSelection = this.parentNode.querySelector(".same-as-selected");

        oldSelection !== null
          ? oldSelection.removeAttribute("class") &
            oldSelection.removeAttribute("aria-selected") &
            this.setAttribute("class", "same-as-selected") &
            this.setAttribute("aria-selected", "true")
          : this.setAttribute("class", "same-as-selected") &
            this.setAttribute("aria-selected", "true");
        // OK DONE: pour quoi une ternaire ne fait pas le travail ? >>> il ne faut pas mettre
        // & mais &&

        //this.setAttribute("class", "same-as-selected");
        break;
      }
    }
    console.log(changeSelectedDiv);
    changeSelectedDiv.click();
    closeAllSelect();
  });
  //  optionDiv.addEventListener("keydown", RemplaceClickparEnter);

  optionsBoxDiv.appendChild(optionDiv);
}

customSelectClassElmnt.appendChild(optionsBoxDiv);

function closeAllSelect(elmnt) {
  console.log("ça ferme");
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
      x[i].removeAttribute("aria-expanded");
    }
  }
  sortingMedias();
  console.log("oui ça ferme");
}

/*if the user clicks anywhere outside the select box, then this line close all select boxes:*/
window.addEventListener("click", closeAllSelect);

// ***************** partie Sort ******************
function sortOnPopularity() {
  photographerMedia.sort(function (a, b) {
    let x = a.likes;
    let y = b.likes;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function alphabeticalSortOnTitle() {
  photographerMedia.sort(function (a, b) {
    let x = a.title.toLowerCase();
    let y = b.title.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function sortOnDate() {
  photographerMedia.sort(function (a, b) {
    let x = a.date;
    let y = b.date;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function sortingMedias() {
  if (sortingMethodFromList === "Date") {
    sortOnDate();
    displayMedia(photographerMedia);
  }
  if (sortingMethodFromList === "Titre") {
    alphabeticalSortOnTitle();
    displayMedia(photographerMedia);
  }
  if (sortingMethodFromList === "Popularité") {
    sortOnPopularity();
    displayMedia(photographerMedia);
  } else {
    //ne fait rien
  }
}
// ***************** partie navigation clavier ******************
// utilisation en ressource pour navigation clavier de
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html

// pas utilisé :
function OpenMenuDrop(e) {
  if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
    closeAllSelect(selectedDiv);
    e.preventDefault();
    selectedDiv.nextSibling.classList.remove("select-hide");
    selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
    selectedDiv.classList.add("select-arrow-active");
    focusablesSortingMenu[0].focus();
    //  focusablesSortingMenu[0].style.backgroundColor = "blue";
    //document.removeEventListener("keydown", OpenMenuDrop(e));
  }
  if (e.key === "ArrowUp") {
    closeAllSelect(selectedDiv);
    e.preventDefault();
    selectedDiv.nextSibling.classList.remove("select-hide");
    selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
    selectedDiv.classList.add("select-arrow-active");
    focusablesSortingMenu[2].focus();
    //document.removeEventListener("keydown", OpenMenuDrop(e));

    //    focusablesSortingMenu[2].style.backgroundColor = "red";
  }
}

let focusablesSortingMenu = [];
let optionsSortingMenu = "div[role='option']";
focusablesSortingMenu = Array.from(
  customSelectClassElmnt.querySelectorAll(optionsSortingMenu)
);
console.log(focusablesSortingMenu);

function focusInSortingMenu(e) {
  //if (e.key === "Tab") {
  //} else {
  e.stopPropagation();
  e.preventDefault();
  let index = focusablesSortingMenu.findIndex(
    (f) => f === selectedDiv.nextSibling.querySelector(":focus")
  );
  //    console.log(selectedDiv.nextSibling.querySelector(":focus"));
  // TODO = Y a une erreur dans cette ligne, car une fois que selectedDiv a
  // le focus, il faudrait qu'elle se déplie si on entre et pas que
  // que ça bloque s'il y a le :focus.>>> défaut résolut en rajoutant un ignore
  // sur le "tab", du coup ça ne se bloque plus mais le déploiement est ailleurs
  if (e.key === "ArrowUp") {
    index--;
    if (index < 0) {
      index = focusablesSortingMenu.length - 1;
    }
    focusablesSortingMenu[index].focus();
  }
  if (e.key === "ArrowDown") {
    index++;
    if (index >= focusablesSortingMenu.length) {
      index = 0;
    }
    focusablesSortingMenu[index].focus();
  }
  if (e.key === "Escape" || e.key === "Esc") {
    closeAllSelect();
    selectedDiv.focus();
  }
}

function OpenDropMenu(e) {
  switch (e.key) {
    case "Tab":
      break;
    case " ":
    case "Enter":
    case "ArrowDown":
      e.preventDefault();
      e.stopPropagation();
      selectedDiv.nextSibling.classList.remove("select-hide");
      selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
      selectedDiv.classList.add("select-arrow-active");
      focusablesSortingMenu[0].focus();
      break;
    case "ArrowUp":
      e.stopPropagation();
      e.preventDefault();
      selectedDiv.nextSibling.classList.remove("select-hide");
      selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
      selectedDiv.classList.add("select-arrow-active");
      focusablesSortingMenu[2].focus();
      break;
  }
}

customSelectClassElmnt.addEventListener("focus", function (e) {
  customSelectClassElmnt.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "Tab":
        break;
      case " ":
      case "Enter":
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        selectedDiv.nextSibling.classList.remove("select-hide");
        selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
        selectedDiv.classList.add("select-arrow-active");
        focusablesSortingMenu[0].focus();
        break;
      case "ArrowUp":
        e.stopPropagation();
        e.preventDefault();
        selectedDiv.nextSibling.classList.remove("select-hide");
        selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
        selectedDiv.classList.add("select-arrow-active");
        focusablesSortingMenu[2].focus();
        break;
    }

    // if (e.key === "Tab") {
    // } else {
    //   if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
    //     //        closeAllSelect(selectedDiv);
    //     e.stopPropagation();
    //     e.preventDefault();
    //     selectedDiv.nextSibling.classList.remove("select-hide");
    //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
    //     selectedDiv.classList.add("select-arrow-active");
    //     focusablesSortingMenu[0].focus();
    //   } else if (e.key === "ArrowUp") {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     selectedDiv.nextSibling.classList.remove("select-hide");
    //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
    //     selectedDiv.classList.add("select-arrow-active");
    //     focusablesSortingMenu[2].focus();
    //   }
    // }
    optionsBoxDiv.addEventListener("keydown", focusInSortingMenu(e));
    // est-ce que je dois rajouter dans la fonction
    // focusISM que espace et enter ferme?
    // ou dans la fonction validation?
    // d'ailleurs au click, comment se ferme la selct?
  });
});
