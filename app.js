const thumbnails = document.querySelectorAll(".thumbnails img"); // array of images
const displayImage = document.getElementById("displayImage"); // an image tag

// function clickLeft(){
//     let container =document.querySelector('#flex-container');
//     container.scrollTo({
//         left:container.scrollLeft - 200,
//         top :0,
//         behavior:"smooth"
//     });

// }
// function clickRight(){
//     console.log("hello");
//     let container =document.querySelector('#flex-container');
//     console.log(container);
//     container.scrollTo({
//         left:container.scrollLeft + 200,
//         top :0,
//         behavior:"smooth"
//     });

// }



// loop through our thumbnails
// add an eventLister to each one
// so when it is clicked
// displayImage is changed

thumbnails.forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    displayImage.src = thumb.src;
    displayImage.alt = thumb.alt;
  });
});
thumbnails.forEach(function (thumb) {
    thumb.addEventListener("focus", function () {
      displayImage.src = thumb.src;
      displayImage.alt = thumb.alt;
    });
  });
// const imgs = document.querySelectorAll('.slider img');
// const dots = document.querySelectorAll('.dot');
// let currentImg = 0; // index of the first image 
// const interval = 3000; // duration(speed) of the slide

// function changeSlide(n) {
//     for (var i = 0; i < imgs.length; i++) { // reset
//       imgs[i].style.opacity = 0;
//       dots[i].className = dots[i].className.replace(' active', '');
//     }
  
//     currentImg = n;
  
//     imgs[currentImg].style.opacity = 1;
//     dots[currentImg].className += ' active';
//   }

// make our API call to unsplash and get images
async function getImages(query) {
  // make a fetch call to unsplash
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=ml6bRDnz2_FsW11E0KfUf9fJ6_Kw0vR2s9laeDaTvIc`
  );

  // turn my response into JSON
  const json = await response.json();
  console.log(json);
  // return the image
  renderImages(json.results);
}

// use the response from unsplash to change the image on the page
function renderImages(data) {
  // remove old images
  document.getElementById("images").innerHTML = "";

  // loop through my results and render an image for each item
  data.forEach(function (imageObj) {
    // create a new img tag
    const img = document.createElement("img");
  
    // set the src and all of my new img tag
    img.src = imageObj.urls.full;
    img.alt = imageObj.alt_description;
    const div = document.createElement("div");
    div.classList.add("grid-item");
    const classes = ["large", "medium", "wide"];
    div.classList.add(classes[Math.floor(Math.random() * 2 )]);
    div.appendChild(img);
    // append my image to the page
    document.getElementById("images").appendChild(div);
  });
}

// take user input to affect the unsplash query
const form = document.getElementById("searchForm");

form.addEventListener("submit", function (event) {
  // the form is automatically passed the event as a param, which gives us access to:
  event.preventDefault();

  const myQuery = event.target.myQuery.value;
  getImages(myQuery);
});


