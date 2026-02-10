import { loadContent } from "./dom.js";
import "./styles.css";
import { createWeatherDataObj } from "./weatherData.js";

const contentContainer = document.querySelector("#content");
const input = document.querySelector("#location");
const submitBtn = document.querySelector("#submit");


submitBtn.addEventListener("click", async (e) => {

    contentContainer.innerHTML = "";
    const inputLocation = input.value.trim();

    await loadContent(inputLocation);
    input.value = "";
})