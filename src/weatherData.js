async function getWeatherData(location) {
    if (!location || !location.trim()) {
        throw new Error("Location is required");
    }

    location = location.trim();

    // Allow only letters and spaces
    const isValid = /^[a-zA-Z\s]+$/.test(location);

    if (!isValid) {
        throw new Error("Enter a Valid City Name (Letters only)");
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=hours%2Ccurrent%2Calerts%2Cdays&key=J9ZSVTFNZX3VEFD6AFYSHA7WQ`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to Fetch Weather Data");
    }

      // Extra validation check
    if (!data.address.toLowerCase().includes(location.toLowerCase())) {
        throw new Error("Location Mismatch");
    }

    return response.json();
}

async function createWeatherDataObj(place) {
    const data = await getWeatherData(place);

    if (!data) {
        throw new Error("No Weather Data received");
    }

    const weatherObj = {
        place: data.address,
        temperature: data.currentConditions.temp,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        days: data.days,
        moreInfo: [
            {
                "Max.": data.days[0].tempmax + " °C"
            },
            {
                "Min.": data.days[0].tempmin + " °C"
            },
            {
                "UV Index": data.currentConditions.uvindex
            },
            {
                "Wind Speed": data.currentConditions.windspeed + " Km",
            },
            {
                "Precipitation": data.currentConditions.precipprob,
            },
            {
                "Sunrise": data.currentConditions.sunrise,
            },
            {
                "Sunset": data.currentConditions.sunset,
            },
            {
                "Humidity": data.currentConditions.humidity + " %"
            },
        ]
    }

    return weatherObj;
}

export { createWeatherDataObj }