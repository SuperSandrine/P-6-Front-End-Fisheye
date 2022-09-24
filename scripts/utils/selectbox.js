// Function select, use a select to create a dynamic div section and hide the select afterward
// custom select box sourced from W3S : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_custom_select

// ***************** import ******************
import { photographerMedia, displayMedia } from '../pages/photographer.js'
import { allLikesForTotal, displayAllLikesForTotal } from './likemeter.js'

// ***************** declared lets, const ******************
let sortingMethodFromList
let j,
  optionDiv

// DOM
const customSelectClassElmnt = document.querySelector('.custom-select')
const selectTagElmnt = customSelectClassElmnt.getElementsByTagName('select')[0]
const ll = selectTagElmnt.length
/* for each element, create a new DIV
selected Div will act as the main button inside which the sorting name is shown: */
const selectedDiv = document.createElement('DIV')
selectedDiv.setAttribute('class', 'select-selected')
selectedDiv.setAttribute('role', 'button')
selectedDiv.setAttribute('id', 'selectedButton')
selectedDiv.setAttribute('aria-haspopup', 'listbox') // indicates the button opens a menu
selectedDiv.setAttribute('aria-labelledby', 'labelledSort')
selectedDiv.setAttribute('tabindex', '0')
selectedDiv.setAttribute('aria-controls', 'listboxSort')
selectedDiv.innerHTML =
  selectTagElmnt.options[selectTagElmnt.selectedIndex].innerHTML // fill the div inner HTML with let selecTagElmnt : 'filter' at first
customSelectClassElmnt.appendChild(selectedDiv)

/* create a new DIV that will contain the options list: */
const optionsBoxDiv = document.createElement('DIV')
optionsBoxDiv.setAttribute('class', 'select-items select-hide')
optionsBoxDiv.setAttribute('role', 'listbox')
optionsBoxDiv.setAttribute('aria-labelledby', 'labelledSort')
optionsBoxDiv.setAttribute('id', 'listboxSort')
optionsBoxDiv.setAttribute('tabindex', '-1')

/* for each option in the original select element (except the [0] option which is "filtrer"),
create a new DIV that will act as an option item: */
for (j = 1; j < ll; j++) {
  optionDiv = document.createElement('DIV')
  optionDiv.setAttribute('role', 'option')
  optionDiv.setAttribute('tabindex', '0')
  optionDiv.innerHTML = selectTagElmnt.options[j].innerHTML
  optionDiv.setAttribute('id', `${optionDiv.innerHTML}`)
  /* when an item is clicked, update the original select box, and the selected item: */
  optionDiv.addEventListener('click', function (e) {
    let oldSelection, i
    const originalSelectTag =
      this.parentNode.parentNode.getElementsByTagName('select')[0] // 'filtrer'
    const sl = originalSelectTag.length
    const changeSelectedDiv = this.parentNode.previousSibling
    for (i = 0; i < sl; i++) {
      if (originalSelectTag.options[i].innerHTML === this.innerHTML) {
        originalSelectTag.selectedIndex = i
        changeSelectedDiv.innerHTML = this.innerHTML // the clicked tag appear
        changeSelectedDiv.setAttribute(
          'aria-activedescendant',
          `${this.innerHTML}`
        )
        sortingMethodFromList =
          changeSelectedDiv.innerHTML // SMFL will active the sorting medias function
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
  selectedDiv.classList.remove('select-arrow-active')
  optionsBoxDiv.classList.add('select-hide')
  optionsBoxDiv.removeAttribute('aria-expanded')
}

// ***************** Sorting part ******************
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
    // do nothing
  }
}

// ************************* open/close dropdown part ****************** /

/* if the user clicks anywhere outside the select box, then this line close select box: */
window.addEventListener('click', closeAllSelect)

/* when the select box is clicked
  open/close the current select box */
selectedDiv.addEventListener('click', function (e) {
  e.stopPropagation()
  this.nextSibling.classList.toggle('select-hide')
  this.nextSibling.setAttribute('aria-expanded', 'true')
  this.classList.toggle('select-arrow-active')
})

// ***************** keyboard navigation part ******************
// source for the keyboard navigation
// https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html
// action : - When focus is on the main sorting button, we can deploy the menu choices
//          - once deployed, we can move inside menu choices
//          - we can activate our choice with keyboard: - sort media
//                                                      - close the menu
//                                                      - put the :focus where it was (on main button)

let focusablesSortingMenu = []
const optionsSortingMenu = "div[role='option']"
focusablesSortingMenu = Array.from(
  customSelectClassElmnt.querySelectorAll(optionsSortingMenu)
)

// Here we focus in the sorting main button, once there, there is different
// possibilities: not open with 'Tab', open dropdown with ArrowUp or ArrowDown,
// Enter and Space.
// Once opened, move inside the dropdown with ArrowUp, Down, Enter or Space
// imitate a click action, and escape close the dropdown.
customSelectClassElmnt.addEventListener('focus', function (a) {
  a.target.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') {
      e.preventDefault()
    }
    if (optionsBoxDiv.matches('.select-hide') === true) {
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
      }
    }
  })
})
