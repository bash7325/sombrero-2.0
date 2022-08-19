let apiKey = "20d3501773a839af3857d2b0374101f6";
let hatDance = document.getElementById("hat-dance");
let sadTrombone = document.getElementById("sad-trombone");
let sombrero = document.getElementById("sombrero-button");
let sombreroContainer = document.getElementById("sombrero-container");
let sombreroImage = document.createElement("img");
let notSombreroImage = document.createElement("img");
let sombreroWeather = document.createElement("h1");
let notSombreroWeather = document.createElement("h1");
let hide = document.querySelector(".hide");
let weatherButton = document.getElementById("weather-button");
let weatherContainer = document.getElementById("weather-container");
let lat;
let lon;
let hatDanceSound = false;
let SadTromboneSound = false;

//get geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeather();
}

//get weather from openweathermap.org
function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey +
      "&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let temp = data.current.temp;
      let clouds = data.current.clouds;
      let uvIndex = data.current.uvi;
      let today = new Date();
      let date = today.getMonth() + 1 + "/" + today.getDate();

      if ((temp >= 50 && clouds <= 70 && uvIndex >= 3) || date === "5/5") {
        //add h1 to the sombrero-container that says it's sombrero weather
        sombreroWeather.setAttribute("style", "text-align: center");
        sombreroWeather.innerHTML = "It's Sombrero Weather!";
        sombreroWeather.classList.add("sombrero-text");
        sombreroContainer.appendChild(sombreroWeather);
        //add sombrero image to the sombrero-container
        sombreroImage.setAttribute("src", "./assets/images/sombrero-image.jpg");
        sombreroImage.setAttribute("id", "sombrero-image");
        sombreroImage.setAttribute("class", "grid");
        sombreroContainer.appendChild(sombreroImage);
        //play audio of hat dance
        hatDanceSound = true;
        playAudio();
        unhide();
        sombrero.disabled = true;
      } else {
        //add h1 that says it's not sombrero weather
        notSombreroWeather.setAttribute("style", "text-align: center");
        notSombreroWeather.innerHTML = "No, It's Not Sombrero Weather";
        //set image on the sombrero-container to be a sad face
        notSombreroImage.setAttribute(
          "src",
          "./assets/images/sombrero-sad.jpg"
        );
        notSombreroImage.setAttribute("id", "sombrero-image");
        notSombreroImage.setAttribute("class", "grid");
        sombreroContainer.appendChild(notSombreroWeather);
        sombreroContainer.appendChild(notSombreroImage);
        //play audio of sad trombone
        SadTromboneSound = true;
        playAudio();
        unhide();
        sombrero.disabled = true;
      }
      weatherButton.addEventListener("click", function () {
        butWhy(temp, clouds, uvIndex, date);
        weatherButton.disabled = true;
      });
    });
}

//after getweather() unhide hide class
function unhide() {
  hide.classList.remove("hide");
}

//mexican hat dance play audio
function playAudio() {
  if (hatDanceSound) {
    hatDance.play();
  } else if (SadTromboneSound) {
    sadTrombone.play();
  }
}
//on click, get weather
sombrero.addEventListener("click", getLocation);

//but why function
function butWhy(temp, clouds, uvIndex, date) {
  weatherContainer.classList.remove("hide");
  //create element to hold weather
  let weather = document.createElement("h1");
  weather.setAttribute("style", "text-align: center");
  weather.classList.add("weather-text");
  const fireEmoji = String.fromCodePoint(0x1f525);
  const cloudEmoji = String.fromCodePoint(0x1f325);
  if ((temp >= 50 && clouds <= 70 && uvIndex >= 3) || date === "5/5") {
    weather.innerText =
      "Because it is " +
      fireEmoji +
      temp +
      " degrees outside, there is " +
      cloudEmoji +
      clouds +
      "% cloud coverage, and the UV index is " +
      uvIndex +
      ". Now put on your sombrero and dance the hat dance!";
    weatherContainer.appendChild(weather);
  } else {
    weather.innerHTML =
      "Because it is " +
      temp +
      " degrees outside, there is " +
      cloudEmoji +
      clouds +
      "% cloud coverage, and the UV index is " +
      uvIndex +
      ". Sorry Benny...";
    weatherContainer.appendChild(weather);
  }
}

//Modal
// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
  event.preventDefault();
  const modal = document.getElementById(
    event.target.getAttribute("data-target")
  );
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
};

// Is modal open
const isModalOpen = (modal) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
    ? true
    : false;
};

// Open modal
const openModal = (modal) => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${getScrollbarWidth()}px`
    );
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute("open", true);
};

// Close modal
const closeModal = (modal) => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty("--scrollbar-width");
    modal.removeAttribute("open");
  }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event) => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
};
