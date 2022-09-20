// Function select, use a select to create a dynamic div section and hide the select afterward
// custom select box sourced from W3S

// *** Il y a 3 partie, l'animation dynamique, le sort, la navigation clavier
// ***************** partie import ******************
import { photographerMedia, displayMedia } from '../pages/photographer.js'
import { allLikesForTotal, displayAllLikesForTotal } from './likemeter.js'
// ***************** partie variable ******************
let sortingMethodFromList

// ***************** partie animation dynamique ******************
let j,
  optionDiv

/* look for element with the class "custom-select": */
const customSelectClassElmnt = document.querySelector('.custom-select')
const selectTagElmnt = customSelectClassElmnt.getElementsByTagName('select')[0] // original options index [0]
const ll = selectTagElmnt.length // number of options :'4'
/* for each element, create a new DIV that will act as the selected item, or the main button: */
const selectedDiv = document.createElement('DIV')
selectedDiv.setAttribute('class', 'select-selected')
selectedDiv.setAttribute('role', 'button')
selectedDiv.setAttribute('id', 'selectedButton')
selectedDiv.setAttribute('aria-haspopup', 'listbox') // indicates the button opens a menu
selectedDiv.setAttribute('aria-labelledby', 'labelledSort')
selectedDiv.setAttribute('tabindex', '0')
selectedDiv.setAttribute('aria-controls', 'listboxSort')
selectedDiv.innerHTML =
  selectTagElmnt.options[selectTagElmnt.selectedIndex].innerHTML // fill the div inner HTML with let selecTagElmnt : 'filtr' at first

customSelectClassElmnt.appendChild(selectedDiv)

selectedDiv.addEventListener('click', function (e) {
  /* when the select box is clicked, close any other select boxes,
      and open/close the current select box: */
  e.stopPropagation()
  //  closeAllSelect()
  //  closeAllSelect(this)

  //  console.log("bug??")
  this.nextSibling.classList.toggle('select-hide')
  this.nextSibling.setAttribute('aria-expanded', 'true')
  this.classList.toggle('select-arrow-active')
})

/* create a new DIV that will contain the options list: */
const optionsBoxDiv = document.createElement('DIV')
optionsBoxDiv.setAttribute('class', 'select-items select-hide')
optionsBoxDiv.setAttribute('role', 'listbox')
optionsBoxDiv.setAttribute('aria-labelledby', 'labelledSort')
optionsBoxDiv.setAttribute('id', 'listboxSort')
optionsBoxDiv.setAttribute('tabindex', '-1')

for (j = 1; j < ll; j++) {
  /* for each option in the original select element except the [0] option which is "filtrer",
    create a new DIV that will act as an option item: */
  optionDiv = document.createElement('DIV')
  optionDiv.setAttribute('role', 'option')
  optionDiv.setAttribute('tabindex', '0')

  optionDiv.innerHTML = selectTagElmnt.options[j].innerHTML

  optionDiv.setAttribute('id', `${optionDiv.innerHTML}`)

  // --- pour simplifer dessous et mettre un keydown listener mardi------
  optionDiv.addEventListener('click', function (e) {
    /* when an item is clicked, update the original select box, and the selected item: */
    let oldSelection, i
    /* this. correspond à l'élément clické, soit la div date, div pop, div titre. */
    const originalSelectTag =
      this.parentNode.parentNode.getElementsByTagName('select')[0]
    //    console.log(originalSelectTag); // 'filtrer'
    const sl = originalSelectTag.length
    const changeSelectedDiv = this.parentNode.previousSibling
    //    console.log(changeSelectedDiv);
    /* h est la div contenant .select-items et .select-hide */
    //  console.log(changeSelectedDiv);
    for (i = 0; i < sl; i++) {
      if (originalSelectTag.options[i].innerHTML === this.innerHTML) {
        originalSelectTag.selectedIndex = i
        // console.log(changeSelectedDiv.innerHTML);//'filtrer'
        changeSelectedDiv.innerHTML = this.innerHTML
        // console.log(changeSelectedDiv.innerHTML);//'Popularité'
        changeSelectedDiv.setAttribute(
          'aria-activedescendant',
          `${this.innerHTML}`
        )
        sortingMethodFromList =
          changeSelectedDiv.innerHTML /* sortingMFL change à chaque clic */
        // console.log(sortingMethodFromList);
        /* voici l'information dont j'ai besoin pour jouer mon tri */
        oldSelection = this.parentNode.querySelector('.same-as-selected')
        if (oldSelection !== null) {
          oldSelection.removeAttribute('class')
          oldSelection.removeAttribute('aria-selected')
          this.setAttribute('class', 'same-as-selected')
          this.setAttribute('aria-selected', 'true')
        } else {
          this.setAttribute('class', 'same-as-selected')
          this.setAttribute('aria-selected', 'true')
        }
        break
      }
    }
    sortingMedias()
    allLikesForTotal()
    displayAllLikesForTotal()
    changeSelectedDiv.click()
  })

  optionsBoxDiv.appendChild(optionDiv)
}

customSelectClassElmnt.appendChild(optionsBoxDiv)

function closeAllSelect () {
  /* a function that will close all select boxes in the document,
    except the current select box: */
  selectedDiv.classList.remove('select-arrow-active')
  optionsBoxDiv.classList.add('select-hide')
  optionsBoxDiv.removeAttribute('aria-expanded')
  // if (selectedDiv.classList.contains('select-arrow-active')) {
  //   selectedDiv.classList.remove('select-arrow-active')
  //   optionsBoxDiv.classList.add('select-hide')
  //   optionsBoxDiv.removeAttribute('aria-expanded')
  // }
  // }// if else{}
  // } else {
  // selectedDiv.classList.remove('select-arrow-active')
  // }
  // if (arrNo.indexOf(i)) {
  //   optionsBoxDiv.classList.add('select-hide')
  //   optionsBoxDiv.removeAttribute('aria-expanded')
  // }

  //  sortingMedias();
  // console.log('oui ça ferme')
  //  console.log(arrNo)
}

/* if the user clicks anywhere outside the select box, then this line close all select boxes: */
window.addEventListener('click', closeAllSelect)

/// vvv fonction qui marche, comment la siplifier?
// const arrNo = []

// function closeAllSelect (elmnt) {
// //  console.log('ça ferme')
//   /* a function that will close all select boxes in the document,
//   except the current select box: */
//   let i, x, y
//   // const arrNo = []
//   x = document.getElementsByClassName('select-items')
//   y = document.getElementsByClassName('select-selected')
//   console.log(elmnt)
//   // console.log(selectedDiv)
//   for (i = 0; i < y.length; i++) {
//     console.log('y', y)
//     if (elmnt === y[i]) {
//       console.log(elmnt)
//       console.log(y[i])
//       arrNo.push(i)
//       console.log(arrNo)
//     } else {
//       y[i].classList.remove('select-arrow-active')
//     }
//   }
//   for (i = 0; i < x.length; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add('select-hide')
//       x[i].removeAttribute('aria-expanded')
//     }
//   }
//   //  sortingMedias();
//   console.log('oui ça ferme')
// //  console.log(arrNo)
// }

// /* if the user clicks anywhere outside the select box, then this line close all select boxes: */
// window.addEventListener('click', closeAllSelect)

// ***************** partie Sort ******************
function sortOnPopularity () {
  photographerMedia.sort(function (a, b) {
    const x = a.likes
    const y = b.likes
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  })
}

function alphabeticalSortOnTitle () {
  photographerMedia.sort(function (a, b) {
    const x = a.title.toLowerCase()
    const y = b.title.toLowerCase()
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  })
}

function sortOnDate () {
  photographerMedia.sort(function (a, b) {
    const x = a.date
    const y = b.date
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  })
}

function sortingMedias () {
  if (sortingMethodFromList === 'Date') {
    sortOnDate()
    displayMedia(photographerMedia)
  }
  if (sortingMethodFromList === 'Titre') {
    alphabeticalSortOnTitle()
    displayMedia(photographerMedia)
  }
  if (sortingMethodFromList === 'Popularité') {
    sortOnPopularity()
    displayMedia(photographerMedia)
  } else {
    // ne fait rien
  }
}
// ***************** partie navigation clavier ******************
// utilisation en ressource pour navigation clavier de
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html
// action : - quand le focus est sur la select, on peut la déplier
//          - une fois déplier, on peut se déplacer dans le menu
//          - on peut clicker pour choisir notre tri: - ça lance le tri
//                                                    - ferme le menu
//                                                    - remet le :focus sur le bon tabindex

let focusablesSortingMenu = []
const optionsSortingMenu = "div[role='option']"
focusablesSortingMenu = Array.from(
  customSelectClassElmnt.querySelectorAll(optionsSortingMenu)
)
// console.log(focusablesSortingMenu)

customSelectClassElmnt.addEventListener('focus', function (a) {
//  a.preventDefault();
//  console.log("j'ai le focus")
  // console.log(a.target)
  // console.log(this)
  // console.log(this.children[1])
  // THOMAS: c'est marrant, a.target marche mais pas this?
  a.target.addEventListener('keydown', function (e) {
    // console.log("quelq'un a appuyé sur un bouton")
    // console.log(e.target.children[1]) // select-selected
    // console.log(this.children[2]) // 'select items'
    // if (e.key === "Tab") {
    // } else
    if (e.key !== 'Tab') {
      e.preventDefault()
    }

    if (optionsBoxDiv.matches('.select-hide') === true) {
      //      e.preventDefault();
      e.stopImmediatePropagation()
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        this.children[1].nextSibling.classList.remove('select-hide')
        this.children[1].setAttribute('aria-expanded', 'true')
        this.children[1].classList.add('select-arrow-active')
        focusablesSortingMenu[0].focus()
      }
      if (e.key === 'ArrowUp') {
        this.children[1].nextSibling.classList.remove('select-hide')
        this.children[1].setAttribute('aria-expanded', 'true')
        this.children[1].classList.add('select-arrow-active')
        focusablesSortingMenu[2].focus()
      }
    } else if (optionsBoxDiv.matches('.select-hide') === false) {
      e.preventDefault()
      e.stopImmediatePropagation()
      let index = focusablesSortingMenu.findIndex(
        (f) => f === selectedDiv.nextSibling.querySelector(':focus')
      )
      if (e.key === 'ArrowUp') {
        index--
        if (index < 0) {
          index = focusablesSortingMenu.length - 1
        }
        focusablesSortingMenu[index].focus()
      }
      if (e.key === 'ArrowDown') {
        index++
        if (index >= focusablesSortingMenu.length) {
          index = 0
        }
        focusablesSortingMenu[index].focus()
      }
      if (e.key === 'Enter' || e.key === ' ') {
        focusablesSortingMenu[index].click()
        this.focus()
      }
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.children[1].classList.remove('select-arrow-active')
        this.children[1].nextSibling.classList.add('select-hide')
        this.children[1].removeAttribute('aria-expanded')
        this.focus()

        //        console.log(this)
      }
    }
  })
})
