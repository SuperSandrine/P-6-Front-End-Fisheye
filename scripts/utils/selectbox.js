let sortingMethodFromList;
// const bg = document.querySelector("body");

let x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", (e) => {
      console.log("voici la div à rendre magique avec une fonction " + e);
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
            h.innerHTML; /* sortingMFL change à chaque clique */
          console.log(sortingMethodFromList);
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
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
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

  console.log("fin : " + sortingMethodFromList);
  sortingMedias();
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

/* quand je clique sur la popularité, 
l'array photographerMedia se trie 
ensuite ce nouvelle array est injecté dans la présentation de la gallerie
et c'est ce m^me array qui est injecté dans la présentation de la lightbox
*/
const selection = document.querySelector(".custom-select");
selection.addEventListener("click", (e) => console.log(e));

/* -------- SORTING FUNCTIONS -----------*/

// function changeBG() {
//   console.log("this" + sortingMethodFromList);
//   if (sortingMethodFromList === "Date") {
//     bg.style.backgroundColor = "blue";
//   }
// }
// attention à la casse

function sortingMedias() {
  if (sortingMethodFromList === "Date") {
    sortOnDate();
    displayMedia(photographerMedia);
    displayCars();
    // fait un tri par date
  }
  if (sortingMethodFromList === "Titre") {
    alphabeticalSortOnTitle();
    displayMedia(photographerMedia);
    // photographerMedia.title.sort();
    // console.log("sorted array : " + photographerMedia);
    // soit je fais des comparaison pour ranger mon tableau
    // soit je crée un nouveau tableau que je mets dans l'ordre
    // dans ce nouveau tableau je dois aussi mémoriser l'ancien et le nouvel index?

    // fait un tri par Titre
  }
  if (sortingMethodFromList === "Popularité") {
    sortOnPopularity();
    displayMedia(photographerMedia);

    // fait un tri par popularité
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

//affiche sur la console l'array pour le vérifier
// function displayCars() {
//   for (let i = 0; i < photographerMedia.length; i++) {
//     console.log(photographerMedia[i].title + " " + `\n`);
//   }
// }
