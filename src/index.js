import { loadContent } from "./dom.js";
import "./styles.css";

const contentContainer = document.querySelector("#content");
const input = document.querySelector("#location");
const myForm = document.querySelector("form");

const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
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
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "No Data Found. Try Again...";
        contentContainer.appendChild(errorMessage);
        console.log(error);
    } finally {
        hideLoader();
    }

})