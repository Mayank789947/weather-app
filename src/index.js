import { loadContent } from "./dom.js";
import "./styles.css";
import { createWeatherDataObj } from "./weatherData.js";

const contentContainer = document.querySelector("#content");
const input = document.querySelector("#location");
const submitBtn = document.querySelector("#submit");

const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

submitBtn.addEventListener("click", async (e) => {

    const inputLocation = input.value.trim();

    if (!inputLocation) {
        alert("Please Enter Correct Location");
        return
    }

    try {
        showLoader();
        contentContainer.innerHTML = "";
        await loadContent(inputLocation);
        input.value = "";
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }

})