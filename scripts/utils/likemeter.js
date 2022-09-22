let allLikes = []
let totalOfLikes = 0

export function allLikesForTotal () {
  let countingLikesData = 0
  allLikes = document.querySelectorAll('.likesData')
  // console.log(allLikes)
  for (let i = 0; i < allLikes.length; i++) {
    countingLikesData += parseInt(allLikes[i].innerHTML)
    //    console.log("comptage en cours" + totalOfLikes);
  }
  totalOfLikes = countingLikesData
  return totalOfLikes
}

function displayAllLikesForTotal () {
//  totalOfLikes = await allLikesForTotal()
//  console.log(allLikes)
  const newChild = document.createElement('span')
  const textNode2 = document.createTextNode(`${totalOfLikes}`)
  newChild.appendChild(textNode2)
  const paragrapheparent = document.querySelector('.parent')
  const childHasBeen = document.querySelector('.parent span')
  paragrapheparent.replaceChild(newChild, childHasBeen)
}

// Dans cette fonction, quand on clique sur un coeur, il doit y avoir des ajouts et des
// retraits dans les cartes (nbOfLikes) et dans l'encart du bas de page (totalOfLikes)
// en paramètre, on récupère le nbOfLikes présent dans le fichier json
export function addALike (nbOfLikes, photoId) {
  // let shortClassLikes = document.querySelector(`.likes-${photoId} p`).innerHTML;
  // console.log("short : " + shortClassLikes);

  //  console.log("je check : " + totalOfLikes);
  // TODO: vérifier addAlike
  //  console.log('photoID', photoId)
  let nbOfLikesInner = parseInt(document.querySelector(`.likes-${photoId} p`).innerHTML)
  // console.log('je check le nblikes en inner : ' + nbOfLikesInner)
  // console.log("short : " + shortClassLikes);

  // la const insideCard demande: Est-ce que le nbOfLikes du json égale le nbdeLikes dans le innerHtml? si oui, on rajoute 1,
  // sinon on décrémente.
  //  const insideCard =

  // nbOfLikes === nbOfLikesInner
  //   ? (nbOfLikesInner = nbOfLikesInner + 1) &
  //       totalOfLikes++
  //   : nbOfLikesInner-- &
  //       totalOfLikes--
  if (nbOfLikes === nbOfLikesInner) {
    nbOfLikesInner = nbOfLikesInner + 1
    totalOfLikes++
  } else {
    nbOfLikesInner--
    totalOfLikes--
  }
  // shortClassLikes = insideCard; >>> Thomas >>> Pourquoi ça marche pas?
  // console.log("voici le insideCard" + insideCard);
  // console.log( "nboflikes : " + nbOfLikes)
  // console.log( "nbofinner : " + nbOfLikesInner)

  document.querySelector(`.likes-${photoId} p`).innerHTML = nbOfLikesInner // Là je change le innerHTML
  // document.querySelector(`.likes-${photoId} p`).style.backgroundColor = "blue";
  // console.log( document.querySelector(`.likes-${photoId} p`))
  // if (nbOfLikes > nbOfLikesInner) {
  //   totalOfLikes++;
  // } else {
  //   totalOfLikes--;
  // }

  //  console.log("voici le total après click :" + totalOfLikes);
  console.log(totalOfLikes)

  displayAllLikesForTotal()
}

export { totalOfLikes, displayAllLikesForTotal }
