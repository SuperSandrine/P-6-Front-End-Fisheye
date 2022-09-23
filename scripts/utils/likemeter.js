// ***************** declared lets, const ******************
let allLikes = []
let totalOfLikes = 0

// ***************** functions ******************
// count all likes of photographer and return a total
export function allLikesForTotal () {
  let countingLikesData = 0
  allLikes = document.querySelectorAll('.likesData')
  for (let i = 0; i < allLikes.length; i++) {
    countingLikesData += parseInt(allLikes[i].innerHTML)
  }
  totalOfLikes = countingLikesData
  return totalOfLikes
}

// Create a span element with the totalOfLikes information
// Add this new span in the Likes/price box using the replaceChild method
function displayAllLikesForTotal () {
  const newChildTotalCount = document.createElement('span')
  const textNodeTotalOfLikes = document.createTextNode(`${totalOfLikes}`)
  newChildTotalCount.appendChild(textNodeTotalOfLikes)
  const paragrapheparent = document.querySelector('.parent')
  const childHasBeen = document.querySelector('.parent span')
  paragrapheparent.replaceChild(newChildTotalCount, childHasBeen)
}

// When there is one click on a heart, there is one incrementation of like
// next to the heart button and in the total of likes down window(price box)

// - In parameter we get the original datas from json: numberofLikes and photoId
// - To compare the innerHTML with the original nbOfLikes, we need same type : number
// - we modify the let nbOfLikesInner and with it, modify the innerHTML number
// - also, we modify the totalOflikes and play the display to increment the price box too
export function addALike (nbOfLikes, photoId) {
  let nbOfLikesInner = parseInt(document.querySelector(`.likes-${photoId} p`).innerHTML)
  if (nbOfLikes === nbOfLikesInner) {
    nbOfLikesInner = nbOfLikesInner + 1
    totalOfLikes++
  } else {
    nbOfLikesInner--
    totalOfLikes--
  }
  document.querySelector(`.likes-${photoId} p`).innerHTML = nbOfLikesInner // change the innerHTML with the new count
  displayAllLikesForTotal()
}

export { totalOfLikes, displayAllLikesForTotal }
