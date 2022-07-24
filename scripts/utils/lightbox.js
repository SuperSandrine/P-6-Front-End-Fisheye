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
  getIndexofMediasForLightbox(photographerMedia);
  giveLightboxItsMedias(photographerMedia);
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
  completeImgSource = array[indexii].image;
  console.log(completeImgSource);
  const mediaImage = `<img src="/assets/medias-vrac/${completeImgSource}"/>`;
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

  const lightboxMedia = document.querySelector(".lightbox_modal-content");
  lightboxMedia.innerHTML = `${mediaImage}
  <p class="lightbox_modal-content-text">Titre</p>`;
}

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
