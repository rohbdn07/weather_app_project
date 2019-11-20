window.addEventListener("load", () => {
  let long;
  let lat;
  let temperaturedescription = document.querySelector(
    ".temperature-description"
  );
  let temperaturedegreee = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let windspeeddescription = document.querySelector(".windspeed-description");
  let temperatatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature p");
  const images = ["background1", "background2", "background3", "background4"];
  const body = document.querySelector("body");
  let i = 0;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/ae64cab3a26f6b0059183c84bc11cc10/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, windSpeed } = data.currently;
          //set DOM element from the API
          temperaturedegreee.textContent = temperature;
          temperaturedescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          windspeeddescription.textContent = "Wind speed is" + " " + windSpeed;

          //formula for celcius
          let celsius = (temperature - 32) * (5 / 9);

          //change temperature to celcius/fareheith
          temperatatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperaturedegreee.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperaturedegreee.textContent = temperature;
            }
          });
        });
    });
  }

  const change = () => {
    body.className = images[i];
    i = (i + 1) % images.length;
  };

  setInterval(change, 3000);
});
