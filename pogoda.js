const inputCity = document.querySelector(".input");
const findCityForm = document.querySelector(".form");
const tempCityLabel = document.querySelector(".temp-label");
const weatherlabel = document.querySelector(".weather-label");
const weatherImage = weatherlabel.querySelector("img");
const cityNameLabel = document.querySelector(".city-label");
const addedCityLabel = document.querySelector(".added-location");
const deleteButton = document.querySelector(".delete-button");

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f&units=metric";

const likeButton = document.querySelector(".unlike-button");
const likeImg = likeButton.querySelector("img");

const likedCity = [];

function likedCityToArray() {
  const cityName = cityNameLabel.textContent;

  const cityCheck = likedCity.includes(cityName);

  if (cityCheck === false) {
    likedCity.push(cityName);
  } else {
    removeLikedCityFromArray();
  }
}

function removeLikedCityElements() {
  const allLikedCity = document.querySelectorAll(".city");

  for (const element of allLikedCity) {
    element.remove();
  }
}

function removeFromArray() {
  const indexOfCity = likedCity.findIndex(
    (city) => city === event.target.previousElementSibling.textContent
  );
  console.log(indexOfCity);
  likedCity.splice(indexOfCity, 1);
}

function removeLikedCityFromArray(event) {
  if (event.target.className === "delete-button") {
    removeFromArray();

    render();
    return;
  }
}

function removeLikedCityFromArray2(event) {
  if (
    (event.target.className === "like-button") &
    (event.target.previousElementSibling.textContent === true)
  ) {
    const indexOfCity = likedCity.findIndex(
      (city) => city === event.target.previousElementSibling.textContent
    );
    console.log(indexOfCity);
    likedCity.splice(indexOfCity, 1);

    return;
  }
}

function createElement() {
  const newLikedCityDiv = document.createElement("div");
  newLikedCityDiv.className = "city";

  const newLikedCityLabel = document.createElement("label");
  newLikedCityLabel.className = "new-liked-city";
  newLikedCityLabel.id = "new-liked-city";
  const newLikedCityButton = document.createElement("button");
  newLikedCityButton.className = "delete-button";

  newLikedCityDiv.insertAdjacentElement("afterbegin", newLikedCityLabel);
  newLikedCityDiv.insertAdjacentElement("beforeend", newLikedCityButton);

  addedCityLabel.appendChild(newLikedCityDiv);

  return newLikedCityLabel;
}

function render() {
  removeLikedCityElements();

  likedCity.forEach((city) => {
    const newLikedCityLabelValue = createElement();
    newLikedCityLabelValue.textContent = city;
  });
  switchLikeButton();
}

function findCity() {
  const cityName = inputCity.value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      const icon = data.weather[0].icon;

      tempCityLabel.textContent = `${temp}°`;
      weatherImage.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
      cityNameLabel.textContent = cityName;

      switchLikeButton();
    });

  inputCity.value = "";
}

function switchLikeButton() {
  const cityName = cityNameLabel.textContent;

  const cityIncluded = likedCity.includes(cityName);

  likeButton.setAttribute("class", "unlike-button");

  if (cityIncluded === true) {
    likeButton.setAttribute("class", "like-button");

    return;
  }
}

window.addEventListener("click", removeLikedCityFromArray);
window.addEventListener("click", function (event) {
  console.log(event.target.className);
});

likeButton.addEventListener("click", function (event) {
  event.preventDefault();

  likedCityToArray();
  removeLikedCityFromArray2;
  render();
});

findCityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  findCity();
});

render();
