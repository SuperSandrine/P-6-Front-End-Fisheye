const lightboxModal = document.getElementById("lightbox_modal");
let idMedia;
let idArray;
let indexIdMedia;
let indexii;
let completeImgSource;

function displayLightboxModal(e) {
  //e.preventDefault();
  lightboxModal.style.display = "block";
  idMedia = e;
  console.log(idMedia);
  //mediaFactory(media);
  getIndexofMediasForLightbox(photographerMedia);
  giveLightboxItsMedias(photographerMedia);
  //getCardLightbox();
  return idMedia;
}
// to close modal
function closeLightboxModal() {
  lightboxModal.style.display = "none";
}

// const names = jungle.map((el) => el.name); // returns ['frog', 'monkey', 'gorilla', 'lion']
// console.log(names.includes("gorilla")); // returns true
// console.log(names.indexOf("lion")); // returns 3 - which corresponds correctly assuming no sorting was done

function getIndexofMediasForLightbox(array) {
  idArray = array.map((el) => el.id);
  console.log(idArray);
  //  console.log(idArray.indexOf(idMedia));
  indexii = idArray.indexOf(idMedia);
  console.log(indexii);
  return indexii;
}

//prendre la valeur de indexii et l'injecter dans la formule ci-dessous
function giveLightboxItsMedias(array) {
  console.log("Voici l'index" + indexii);
  fillMediaSource = array[indexii].image;
  fillMediaVideoSource = array[indexii].video;
  fillMediaTitle = array[indexii].title;
  console.log(fillMediaTitle);
  console.log(fillMediaSource);
  console.log(fillMediaVideoSource);
  const mediaBigImage = `<img src="/assets/medias-vrac/${fillMediaSource}"/>`;
  const mediaBigVideo = `<video controls autoplay >
  <source src="/assets/medias-vrac/${fillMediaVideoSource}" type="video/mp4">
</video>`;
  const bigMedia = fillMediaSource == undefined ? mediaBigVideo : mediaBigImage;
  const lightboxMedia = document.querySelector(".lightbox_modal-content");
  lightboxMedia.innerHTML = `${bigMedia}
     <p class="lightbox_modal-content-text">${fillMediaTitle}</p>`;

  //  printMedia = `array[${index}]["image"]`;
  //const mediaImage = `<img src="/assets/medias-vrac/${printMedia}"/>`;

  //  indexIdMedia = idArray.indexOf(idMedia);
  // printMedia = `array[${index}]["image"]`;
  //const mediaImage = photographerMedia[0]["image"];
  //const mediaImage = `<img src="/assets/medias-vrac/${printMedia}"/>`;
  //const mediaVideo = photographerMedia[0]["video"];
  //const media = photographerMedia[0]["image"] == undefined ? mediaVideo : mediaImage;

  //`<img src="/assets/medias-vrac/min-${image}"/>`;
  //const mediaVideo = `<video >
  //<source src="/assets/medias-vrac/${video}#t=5.0" type="video/mp4">
  //</video>`;
}
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$

//function giveLightboxItsMedias(array) {
//   //const mediaImage = photographerMedia[0]["image"];
//   const mediaImage = `<img src="/assets/medias-vrac/${array[0]["image"]}"/>`;
//   //const mediaVideo = photographerMedia[0]["video"];
//   //const media = photographerMedia[0]["image"] == undefined ? mediaVideo : mediaImage;

//   //`<img src="/assets/medias-vrac/min-${image}"/>`;
//   //const mediaVideo = `<video >
//   //<source src="/assets/medias-vrac/${video}#t=5.0" type="video/mp4">
//   //</video>`;

//   const lightboxMedia = document.querySelector(".lightbox_modal-content");
//   lightboxMedia.innerHTML = `${mediaImage}
//     <p class="lightbox_modal-content-text">Titre</p>`;
// }
