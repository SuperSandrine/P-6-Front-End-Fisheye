import { displayMedia, photographerMedia } from '../pages/photographer';
// Function select, use a select to create a dynamic div section and hide the select afterward
// custom select box sourced from W3S

// *** Il y a 3 partie, l'animation dynamique, le sort, la navigation clavier
// ***************** partie variable ******************
let sortingMethodFromList;

// ***************** partie animation dynamique ******************
let j;
let optionDiv;

/* look for element with the class "custom-select": */
const customSelectClassElmnt = document.querySelector('.custom-select');
const selectTagElmnt = customSelectClassElmnt.getElementsByTagName('select')[0]; // original options index [0]
const ll = selectTagElmnt.length; // number of options :'4'
/* for each element, create a new DIV that will act as the selected item, or the main button: */
const selectedDiv = document.createElement('DIV');
selectedDiv.setAttribute('class', 'select-selected');
selectedDiv.setAttribute('role', 'button');
selectedDiv.setAttribute('id', 'selectedButton');
selectedDiv.setAttribute('aria-haspopup', 'listbox'); // indicates the button opens a menu
selectedDiv.setAttribute('aria-labelledby', 'labelledSort');
selectedDiv.setAttribute('tabindex', '0');
selectedDiv.setAttribute('aria-controls', 'listboxSort');
selectedDiv.innerHTML = selectTagElmnt.options[selectTagElmnt.selectedIndex].innerHTML;
// fill the div inner HTML with let selecTagElmnt : 'filtr' at first

customSelectClassElmnt.appendChild(selectedDiv);

/* create a new DIV that will contain the options list: */
const optionsBoxDiv = document.createElement('DIV');
optionsBoxDiv.setAttribute('class', 'select-items select-hide');
optionsBoxDiv.setAttribute('role', 'listbox');
optionsBoxDiv.setAttribute('aria-labelledby', 'labelledSort');
optionsBoxDiv.setAttribute('id', 'listboxSort');
optionsBoxDiv.setAttribute('tabindex', '-1');

for (j = 1; j < ll; j++) {
  /* for each option in the original select element except the [0] option which is "filtrer",
    create a new DIV that will act as an option item: */
  optionDiv = document.createElement('DIV');
  optionDiv.setAttribute('role', 'option');
  optionDiv.setAttribute('tabindex', '0');

  optionDiv.innerHTML = selectTagElmnt.options[j].innerHTML;

  optionDiv.setAttribute('id', `${optionDiv.innerHTML}`);

  // --- pour simplifer dessous et mettre un keydown listener mardi------
  optionDiv.addEventListener('click', function (e) {
    /* when an item is clicked, update the original select box, and the selected item: */
    let oldSelection;
    let i;
    let originalSelectTag;
    let changeSelectedDiv;
    let sl;
    /* this. correspond à l'élément clické, soit la div date, div pop, div titre. */
    originalSelectTag = this.parentNode.parentNode.getElementsByTagName('select')[0];
    //    console.log(originalSelectTag); // 'filtrer'
    sl = originalSelectTag.length;
    changeSelectedDiv = this.parentNode.previousSibling;
    //    console.log(changeSelectedDiv);
    /* h est la div contenant .select-items et .select-hide */
    //  console.log(changeSelectedDiv);
    for (i = 0; i < sl; i++) {
      if (originalSelectTag.options[i].innerHTML == this.innerHTML) {
        originalSelectTag.selectedIndex = i;
        // console.log(changeSelectedDiv.innerHTML);//'filtrer'
        changeSelectedDiv.innerHTML = this.innerHTML;
        // console.log(changeSelectedDiv.innerHTML);//'Popularité'
        changeSelectedDiv.setAttribute(
          'aria-activedescendant',
          `${this.innerHTML}`,
        );
        sortingMethodFromList = changeSelectedDiv.innerHTML; /* sortingMFL change à chaque clic */
        // console.log(sortingMethodFromList);
        /* voici l'information dont j'ai besoin pour jouer mon tri */
        // ternaire :
        // s'il y a déjà une class? oui alors je la remove et j'en mets une, non j'en met une
        // ternaire

        oldSelection = this.parentNode.querySelector('.same-as-selected');

        oldSelection !== null
          ? oldSelection.removeAttribute('class')
            & oldSelection.removeAttribute('aria-selected')
            & this.setAttribute('class', 'same-as-selected')
            & this.setAttribute('aria-selected', 'true')
          : this.setAttribute('class', 'same-as-selected')
            & this.setAttribute('aria-selected', 'true');
        // OK DONE: pour quoi une ternaire ne fait pas le travail ? >>> il ne faut pas mettre
        // & mais &&

        break;
      }
    }
    console.log(changeSelectedDiv);
    changeSelectedDiv.click();
  });

  optionsBoxDiv.appendChild(optionDiv);
}

customSelectClassElmnt.appendChild(optionsBoxDiv);

// ***************** partie Sort ******************
function sortOnPopularity() {
  photographerMedia.sort((a, b) => {
    const x = a.likes;
    const y = b.likes;
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
  photographerMedia.sort((a, b) => {
    const x = a.title.toLowerCase();
    const y = b.title.toLowerCase();
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
  photographerMedia.sort((a, b) => {
    const x = a.date;
    const y = b.date;
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
  if (sortingMethodFromList === 'Date') {
    sortOnDate();
    displayMedia(photographerMedia);
  }
  if (sortingMethodFromList === 'Titre') {
    alphabeticalSortOnTitle();
    displayMedia(photographerMedia);
  }
  if (sortingMethodFromList === 'Popularité') {
    sortOnPopularity();
    displayMedia(photographerMedia);
  } else {
    // ne fait rien
  }
}
// ******************************************* /

function closeAllSelect(elmnt) {
  console.log('ça ferme');
  /* a function that will close all select boxes in the document,
  except the current select box: */
  let i;
  let xl;
  let yl;
  const arrNo = [];
  xl = optionsBoxDiv.length;
  yl = selectedDiv.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == selectedDiv[i]) {
      arrNo.push(i);
    } else {
      selectedDiv[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      optionsBoxDiv[i].classList.add('select-hide');
      optionsBoxDiv[i].removeAttribute('aria-expanded');
    }
  }
  sortingMedias();
  console.log('oui ça ferme');
  console.log(arrNo);
}

/* if the user clicks anywhere outside the select box, then this line close all select boxes: */
window.addEventListener('click', closeAllSelect);

selectedDiv.addEventListener('click', function (e) {
  /* when the select box is clicked, close any other select boxes,
      and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle('select-hide');
  this.nextSibling.setAttribute('aria-expanded', 'true');
  this.classList.toggle('select-arrow-active');
});

// ***************** partie navigation clavier ******************
// utilisation en ressource pour navigation clavier de
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html
// action : - quand le focus est sur la select, on peut la déplier
//          - une fois déplier, on peut se déplacer dans le menu
//          - on peut clicker pour choisir notre tri: - ça lance le tri
//                                                    - ferme le menu
//                                                    - remet le :focus sur le bon tabindex

let focusablesSortingMenu = [];
const optionsSortingMenu = "div[role='option']";
focusablesSortingMenu = Array.from(
  customSelectClassElmnt.querySelectorAll(optionsSortingMenu),
);
console.log(focusablesSortingMenu);

customSelectClassElmnt.addEventListener('focus', function (a) {
  console.log("j'ai le focus");
  console.log(a.target);
  console.log(this.children[1]);
  // THOMAS: c'est marrant, a.target marche mais pas this?
  a.target.addEventListener('keydown', function (e) {
    console.log("quelq'un a appuyé sur un bouton");
    console.log(e.target.children[1]);
    console.log(this.children[2]);
    if (e.key === 'Tab') {
    } else if (optionsBoxDiv.matches('.select-hide') == true) {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        this.children[1].nextSibling.classList.remove('select-hide');
        this.children[1].setAttribute('aria-expanded', 'true');
        this.children[1].classList.add('select-arrow-active');
        focusablesSortingMenu[0].focus();
      }
      if (e.key === 'ArrowUp') {
        this.children[1].nextSibling.classList.remove('select-hide');
        this.children[1].setAttribute('aria-expanded', 'true');
        this.children[1].classList.add('select-arrow-active');
        focusablesSortingMenu[2].focus();
      }
    } else if (optionsBoxDiv.matches('.select-hide') == false) {
      e.preventDefault();
      let index = focusablesSortingMenu.findIndex(
        (f) => f === selectedDiv.nextSibling.querySelector(':focus'),
      );
      if (e.key === 'ArrowUp') {
        index--;
        if (index < 0) {
          index = focusablesSortingMenu.length - 1;
        }
        focusablesSortingMenu[index].focus();
      }
      if (e.key === 'ArrowDown') {
        index++;
        if (index >= focusablesSortingMenu.length) {
          index = 0;
        }
        focusablesSortingMenu[index].focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        focusablesSortingMenu[index].click();
      }
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.children[1].classList.remove('select-arrow-active');
        this.children[1].nextSibling.classList.add('select-hide');
        this.children[1].removeAttribute('aria-expanded');

        this.focus();
      }
    }
  });
});

// customSelectClassElmnt.addEventListener("focus", function (e) {
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     // switch (e.key) {
//     //   case "Tab":
//     //     break;
//     //   case " ":
//     //   case "Enter":
//     //   case "ArrowDown":
//     //     e.preventDefault();
//     //     e.stopPropagation();
//     //     selectedDiv.nextSibling.classList.remove("select-hide");
//     //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     //     selectedDiv.classList.add("select-arrow-active");
//     //     focusablesSortingMenu[0].focus();
//     //     break;
//     //   case "ArrowUp":
//     //     e.stopPropagation();
//     //     e.preventDefault();
//     //     selectedDiv.nextSibling.classList.remove("select-hide");
//     //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     //     selectedDiv.classList.add("select-arrow-active");
//     //     focusablesSortingMenu[2].focus();
//     //     break;
//     // }

//     if (e.key === "Tab") {
//     } else {
//       if (e.key === " " || e.key === "Enter") {
//         //e.key === "ArrowDown" ||
//         //        closeAllSelect(selectedDiv);
//         e.stopPropagation();
//         e.preventDefault();
//         selectedDiv.nextSibling.classList.remove("select-hide");
//         selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         selectedDiv.classList.add("select-arrow-active");
//         focusablesSortingMenu[0].focus();
//         // } else if (e.key === "ArrowUp") {
//         //   e.stopPropagation();
//         //   e.preventDefault();
//         //   selectedDiv.nextSibling.classList.remove("select-hide");
//         //   selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         //   selectedDiv.classList.add("select-arrow-active");
//         //   focusablesSortingMenu[2].focus();
//         // }
//       }
//       optionsBoxDiv.addEventListener("keydown", focusInSortingMenu(e));
//       // est-ce que je dois rajouter dans la fonction
//       // focusISM que espace et enter ferme?
//       // ou dans la fonction validation?
//       // d'ailleurs au click, comment se ferme la selct?
//     }
//   });
// });

// pas utilisé
// function focusInSortingMenu(e) {
//   //if (e.key === "Tab") {
//   //} else {
//   //e.stopPropagation();
//   // e.preventDefault();
//   if (e.key === "Tab") {
//   }
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
//   }
// }

// pas utilisé
// function openDropMenuOnKey(e) {
//   /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//   console.log(e);
//   console.log(this.nextSibling);

//   e.stopPropagation();
//   e.preventDefault();
//   //  closeAllSelect(this);
//   console.log(this);
//   if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
//     focusablesSortingMenu[0].focus();
//     if (e.key === "ArrowUp") {
//       console.log("ne bouge pas cette fois");
//     }
//   }
//   if (e.key === "ArrowUp") {
//     focusablesSortingMenu[2].focus();
//   }
//   this.nextSibling.classList.remove("select-hide");
//   this.nextSibling.setAttribute("aria-expanded", "true");
//   this.classList.add("select-arrow-active");
// }

// let deployed = false; à la place j'utilise matches:
// si false = deployed
// si true = hide
// optionsBoxDiv.matches(".select-hide")

// corrigé, partiellement utilise à réécrire
// customSelectClassElmnt.addEventListener("focus", function (e) {
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     // switch (e.key) {
//     //   case "Tab":
//     //     break;
//     //   case " ":
//     //   case "Enter":
//     //   case "ArrowDown":
//     //     e.preventDefault();
//     //     e.stopPropagation();
//     //     selectedDiv.nextSibling.classList.remove("select-hide");
//     //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     //     selectedDiv.classList.add("select-arrow-active");
//     //     focusablesSortingMenu[0].focus();
//     //     break;
//     //   case "ArrowUp":
//     //     e.stopPropagation();
//     //     e.preventDefault();
//     //     selectedDiv.nextSibling.classList.remove("select-hide");
//     //     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     //     selectedDiv.classList.add("select-arrow-active");
//     //     focusablesSortingMenu[2].focus();
//     //     break;
//     // }

//     if (e.key === "Tab") {
//     } else {
//       if (e.key === " " || e.key === "Enter") {
//         //e.key === "ArrowDown" ||
//         //        closeAllSelect(selectedDiv);
//         e.stopPropagation();
//         e.preventDefault();
//         selectedDiv.nextSibling.classList.remove("select-hide");
//         selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         selectedDiv.classList.add("select-arrow-active");
//         focusablesSortingMenu[0].focus();
//         // } else if (e.key === "ArrowUp") {
//         //   e.stopPropagation();
//         //   e.preventDefault();
//         //   selectedDiv.nextSibling.classList.remove("select-hide");
//         //   selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//         //   selectedDiv.classList.add("select-arrow-active");
//         //   focusablesSortingMenu[2].focus();
//         // }
//       }
//       optionsBoxDiv.addEventListener("keydown", focusInSortingMenu(e));
//       // est-ce que je dois rajouter dans la fonction
//       // focusISM que espace et enter ferme?
//       // ou dans la fonction validation?
//       // d'ailleurs au click, comment se ferme la selct?
//     }
//   });
// });

// pas utilisé :
// function OpenMenuDrop(e) {
//   if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
//     closeAllSelect(selectedDiv);
//     e.preventDefault();
//     selectedDiv.nextSibling.classList.remove("select-hide");
//     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     selectedDiv.classList.add("select-arrow-active");
//     focusablesSortingMenu[0].focus();
//     //  focusablesSortingMenu[0].style.backgroundColor = "blue";
//     //document.removeEventListener("keydown", OpenMenuDrop(e));
//   }
//   if (e.key === "ArrowUp") {
//     closeAllSelect(selectedDiv);
//     e.preventDefault();
//     selectedDiv.nextSibling.classList.remove("select-hide");
//     selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//     selectedDiv.classList.add("select-arrow-active");
//     focusablesSortingMenu[2].focus();
//     //document.removeEventListener("keydown", OpenMenuDrop(e));

//     //    focusablesSortingMenu[2].style.backgroundColor = "red";
//   }
// }

// pas utilise:
// function OpenDropMenu(e) {
//   switch (e.key) {
//     case "Tab":
//       break;
//     case " ":
//     case "Enter":
//     case "ArrowDown":
//       e.preventDefault();
//       e.stopPropagation();
//       selectedDiv.nextSibling.classList.remove("select-hide");
//       selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//       selectedDiv.classList.add("select-arrow-active");
//       focusablesSortingMenu[0].focus();
//       break;
//     case "ArrowUp":
//       e.stopPropagation();
//       e.preventDefault();
//       selectedDiv.nextSibling.classList.remove("select-hide");
//       selectedDiv.nextSibling.setAttribute("aria-expanded", "true");
//       selectedDiv.classList.add("select-arrow-active");
//       focusablesSortingMenu[2].focus();
//       break;
//   }
// }

// customSelectClassElmnt.addEventListener("focus", function (e) {
//   console.log("j'ai le focus");
//   customSelectClassElmnt.addEventListener("keydown", function (e) {
//     console.log("quelq'un a appuyé sur un bouton");

//     openDropMenuOnKey(e);

//     focusInSortingMenu(e);
//   });
// });
