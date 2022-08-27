let sortingMethodFromList;

// Function select, use a select to create a dynamic div section and hide the select afterward
// custom select box sourced from W3S
// let x, i, j, l, ll, selElmnt, a, b, c;
// /*look for any elements with the class "custom-select":*/
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /*for each element, create a new DIV that will act as the selected item:*/
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /*for each element, create a new DIV that will contain the option list:*/
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /*for each option in the original select element,
//     create a new DIV that will act as an option item:*/
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", (e) => {
//       console.log(
//         "voici la div à rendre magique avec une fonction " + e.target.value
//       );
//     });
//     c.addEventListener("click", function (e) {
//       /*when an item is clicked, update the original select box,
//         and the selected item:*/
//       let y, i, k, s, h, sl, yl;
//       s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//       /* s est un tableau des options disponibles*/
//       sl = s.length;
//       h = this.parentNode.previousSibling;
//       /*h est la div contenant .select-items et .select-hide*/
//       for (i = 0; i < sl; i++) {
//         if (s.options[i].innerHTML == this.innerHTML) {
//           s.selectedIndex = i;
//           h.innerHTML = this.innerHTML;
//           sortingMethodFromList =
//             h.innerHTML; /* sortingMFL change à chaque clic */
//           //          console.log(sortingMethodFromList);
//           /* voici l'information dont j'ai besoin pour mon tri*/

//           y = this.parentNode.getElementsByClassName("same-as-selected");

//           yl = y.length;
//           for (k = 0; k < yl; k++) {
//             y[k].removeAttribute("class");
//           }
//           this.setAttribute("class", "same-as-selected");
//           break;
//         }
//       }
//       h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function (e) {
//     /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.classList.toggle("select-arrow-active");
//   });
// }
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
//     }
//   }

//   //  console.log("fin : " + sortingMethodFromList);
//   sortingMedias();
// }
// /*if the user clicks anywhere outside the select box, then this line close all select boxes:*/
// document.addEventListener("click", closeAllSelect);

// ------------ nettoyage selectbox, le 27/08/22 ----------------------
let customSelectClassElmnt, j, l, ll, selectTagElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
customSelectClassElmnt = document.querySelector(".custom-select");
//l = customSelectClassElmnt.length;
//console.log(l); // '1'
//for (i = 0; i < l; i++) {
selectTagElmnt = customSelectClassElmnt.getElementsByTagName("select")[0];
console.log(selectTagElmnt); // il s'agit des options
ll = selectTagElmnt.length;
console.log(ll); //'4'
/*for each element, create a new DIV that will act as the selected item:*/
a = document.createElement("DIV");
console.log(a);
a.setAttribute("class", "select-selected");
a.innerHTML = selectTagElmnt.options[selectTagElmnt.selectedIndex].innerHTML;
customSelectClassElmnt.appendChild(a);
console.log(a.innerHTML);
/*for each element, create a new DIV that will contain the option list:*/
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 1; j < ll; j++) {
  /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
  c = document.createElement("DIV");
  c.innerHTML = selectTagElmnt.options[j].innerHTML;
  c.addEventListener("click", (e) => {
    console.log(
      "voici la div à rendre magique avec une fonction " + e.target.value
    );
  });
  c.addEventListener("click", function (e) {
    /*when an item is clicked, update the original select box,
        and the selected item:*/
    let y, i, k, s, h, sl, yl;
    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
    /* s est un tableau des options disponibles*/
    sl = s.length;
    h = this.parentNode.previousSibling;
    /*h est la div contenant .select-items et .select-hide*/
    for (i = 0; i < sl; i++) {
      if (s.options[i].innerHTML == this.innerHTML) {
        s.selectedIndex = i;
        h.innerHTML = this.innerHTML;
        sortingMethodFromList =
          h.innerHTML; /* sortingMFL change à chaque clic */
        //          console.log(sortingMethodFromList);
        /* voici l'information dont j'ai besoin pour mon tri*/

        y = this.parentNode.getElementsByClassName("same-as-selected");

        yl = y.length;
        for (k = 0; k < yl; k++) {
          y[k].removeAttribute("class");
        }
        this.setAttribute("class", "same-as-selected");
        break;
      }
    }
    h.click();
  });
  b.appendChild(c);
}
customSelectClassElmnt.appendChild(b);
a.addEventListener("click", function (e) {
  /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
});

function closeAllSelect(elmnt) {
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
    }
  }

  //  console.log("fin : " + sortingMethodFromList);
  sortingMedias();
}
/*if the user clicks anywhere outside the select box, then this line close all select boxes:*/
document.addEventListener("click", closeAllSelect);

// ----------- plan pour le tri --------//
/* quand je clique sur la popularité, 
l'array photographerMedia se trie 
ensuite ce nouvelle array est injecté dans la présentation de la galerie
et c'est ce même array qui est injecté dans la présentation de la lightbox
*/

const selection = document.querySelector(".custom-select");
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

//Si <select>: Pas d’attribut ARIA supplémentaire nécessaire
//Si listbox ARIA: le trigger du menu a comme attributs
//role=”button”, aria-haspopup=”listbox”, aria-expanded.
// Liste d’options : role=”listbox”, aria-activedescendant,
//aria-selected, aria-labelledby qui pointe vers l’input label
