import { createWeatherDataObj } from "./weatherData.js";

function to12HourFormat(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = Number(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
}

function dateFormatter(date) {
  const [year, month, day] = date.split("-");

  if (month === "01") return `${day}-Jan-${year}`;
  if (month === "02") return `${day}-Feb-${year}`;
  if (month === "03") return `${day}-Mar-${year}`;
  if (month === "04") return `${day}-Apr-${year}`;
  if (month === "05") return `${day}-May-${year}`;
  if (month === "06") return `${day}-Jun-${year}`;
  if (month === "07") return `${day}-Jul-${year}`;
  if (month === "08") return `${day}-Aug-${year}`;
  if (month === "09") return `${day}-Sep-${year}`;
  if (month === "10") return `${day}-Oct-${year}`;
  if (month === "11") return `${day}-Nov-${year}`;
  if (month === "12") return `${day}-Dec-${year}`;

}

function getNext12Hours(days, currentHour) {
  const todayHours = days[0].hours.slice(currentHour);
  const remaining = 12 - todayHours.length;

  if (remaining <= 0) {
    return todayHours.slice(0, 12);
  }

  const tomorrowHours = days[1]?.hours.slice(0, remaining) || [];

  return [...todayHours, ...tomorrowHours];
}

function getWeatherIcon(condition) {
  const text = condition.toLowerCase();

  if (text.includes("clear") || text.includes("sunny")) return "☀️";
  if (text.includes("partly") || text.includes("partially")) return "⛅";
  if (text.includes("cloud")) return "☁️";
  if (text.includes("rain") || text.includes("drizzle")) return "🌧️";
  if (text.includes("thunder")) return "⛈️";
  if (text.includes("snow")) return "❄️";
  if (text.includes("fog") || text.includes("mist")) return "🌫️";

  return "🌡️"; // fallback
}

function getInfoIconSVG(key) {
  const icons = {
    Humidity: `
      <svg viewBox="0 0 24 24" class="icon humidity">
        <path d="M12 2C8 7 6 10 6 13a6 6 0 0012 0c0-3-2-6-6-11z"/>
      </svg>
    `,
    "Wind Speed": `
      <svg viewBox="0 0 24 24" class="icon wind">
        <path d="M3 12h13a3 3 0 100-6"/>
        <path d="M3 18h9a3 3 0 110-6"/>
      </svg>
    `,
    Sunrise: `
      <svg viewBox="0 0 24 24" class="icon sunrise">
        <path d="M3 18h18"/>
        <path d="M12 3v9"/>
        <path d="M5 12l2-2"/>
        <path d="M17 12l-2-2"/>
        <path d="M8 18a4 4 0 018 0"/>
      </svg>
    `,
    Sunset: `
      <svg viewBox="0 0 24 24" class="icon sunset">
        <path d="M3 18h18"/>
        <path d="M12 12v9"/>
        <path d="M8 18a4 4 0 018 0"/>
      </svg>
    `,
    "UV Index": `
      <svg viewBox="0 0 24 24" class="icon uv">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      </svg>
    `,
    Precipitation: `
      <svg viewBox="0 0 24 24" class="icon rain">
        <path d="M6 14l-2 4M12 14l-2 4M18 14l-2 4"/>
        <path d="M5 10a7 7 0 0114 0"/>
      </svg>
    `,
    "Max.": `
      <svg viewBox="0 0 24 24" class="icon temperature">
        <path d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z"/>
      </svg>
    `,
    "Min.": `
      <svg viewBox="0 0 24 24" class="icon temperature min">
        <path d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z"/>
      </svg>
    `
  };

  return icons[key] || `
    <svg viewBox="0 0 24 24" class="icon info">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  `;
}

async function loadContent(locationName) {

  const data = await createWeatherDataObj(locationName)
  console.log(data.days);

  const content = document.querySelector("#content");

  const dataContainer = document.createElement("div");
  dataContainer.classList.add("data-container");

  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");

  const bottomContainer = document.createElement("div");
  bottomContainer.classList.add("bottom-container");

  const location = document.createElement("h2");
  location.classList.add("location-name");
  location.textContent = data.place
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");


  const topInfo = document.createElement("div");
  topInfo.classList.add("top-info");

  const topInfoLeft = document.createElement("div");
  const topInfoRight = document.createElement("div");

  const icon = document.createElement("div");
  icon.classList.add("top-info-icon");
  icon.textContent = getWeatherIcon(data.icon);

  const temperature = document.createElement("p");
  temperature.classList.add("temp-text");
  temperature.textContent = `${data.temperature} °C`;

  const condition = document.createElement("p");
  condition.classList.add("condition");
  condition.textContent = `${data.conditions}`;

  data.moreInfo.forEach((info) => {

    const key = Object.keys(info)[0];
    const value = info[key];

    const card = document.createElement("div");
    card.classList.add("card");

    const cardIcon = document.createElement("div");
    cardIcon.classList.add("card-icon");
    cardIcon.innerHTML = getInfoIconSVG(key);

    const cardInfo = document.createElement("div");

    const infoTitle = document.createElement("h3");
    infoTitle.textContent = `${key}`;

    const infoValue = document.createElement("p");
    if (key === "Sunrise" || key === "Sunset") {
      infoValue.textContent = to12HourFormat(value);
    } else {
      infoValue.textContent = `${value}`;
    }

    cardInfo.append(infoTitle, infoValue);
    card.append(cardIcon, cardInfo);
    bottomContainer.append(card);
  });

  topInfoLeft.append(icon);
  topInfoRight.append(temperature, condition);
  topInfo.append(topInfoLeft, topInfoRight)
  topContainer.append(location, topInfo);

  dataContainer.append(topContainer, bottomContainer);

  const hoursCardContainer = document.createElement("div");
  hoursCardContainer.classList.add("hours-card-container");

  const hoursContainerHeading = document.createElement("h2");
  hoursContainerHeading.classList.add("hours-container-heading");
  hoursContainerHeading.textContent = "Next 12 Hours Forecast";

  const currentHour = new Date().getHours();
  const next12Hours = getNext12Hours(data.days, currentHour);

  next12Hours.forEach((hr, index) => {

    const hourCard = document.createElement("div");
    hourCard.classList.add("hour-card");

    const weatherIcon = document.createElement("span");
    weatherIcon.classList.add("hour-card-icon");
    weatherIcon.textContent = getWeatherIcon(hr.conditions);

    // 🔥 mark tomorrow cards
    if (currentHour + index >= 24) {
      hourCard.classList.add("tomorrow-hour");
    }

    if (index === 0) {
      hourCard.classList.add("current-hour");
    }

    const hour24 = (currentHour + index) % 24;

    const hour = document.createElement("h3");
    hour.textContent = index === 0 ? "Now" : to12HourFormat(hr.datetime);

    const hourCondition = document.createElement("p");
    hourCondition.textContent = `${hr.conditions}`;

    const hourTemp = document.createElement("p")
    hourTemp.textContent = `Temp. ${hr.temp} °C`;

    const hourUVIndex = document.createElement("p");
    hourUVIndex.textContent = `UV Index ${hr.uvindex}`;

    hourCard.append(hour, weatherIcon, hourCondition, hourTemp, hourUVIndex);
    hoursCardContainer.append(hourCard);

  })


  const daysCardContainer = document.createElement("div");
  daysCardContainer.classList.add("days-card-container");

  const daysContainerHeading = document.createElement("h2");
  daysContainerHeading.classList.add("days-container-heading");
  daysContainerHeading.textContent = "Next 3 Days Forecast";

  data.days.forEach((d, index) => {

    if (index > 0 && index < 4) {

      const dayCard = document.createElement("div");
      dayCard.classList.add("d-card");

      const dayDate = document.createElement("h3");
      dayDate.textContent = dateFormatter(d.datetime);

      const dCardIcon = document.createElement("span");
      dCardIcon.classList.add("d-card-icon");
      dCardIcon.textContent = getWeatherIcon(d.conditions);

      const dayCondition = document.createElement("p");
      dayCondition.textContent = `${d.conditions}`;

      const dayMaxTemp = document.createElement("p");
      dayMaxTemp.textContent = `Max: ${d.tempmax} °C`;

      const dayMinTemp = document.createElement("p");
      dayMinTemp.textContent = `Min: ${d.tempmin} °C`;

      const sunrise = document.createElement("p");
      sunrise.textContent = `Sunrise: ${to12HourFormat(d.sunrise)}`;

      const sunset = document.createElement("p");
      sunset.textContent = `Sunset: ${to12HourFormat(d.sunset)}`;

      dayCard.append(dayDate, dCardIcon, dayCondition, dayMaxTemp, dayMinTemp, sunrise, sunset);
      daysCardContainer.append(dayCard);

    }

  })

  content.append(dataContainer, hoursContainerHeading, hoursCardContainer, daysContainerHeading, daysCardContainer);

}

export { loadContent }