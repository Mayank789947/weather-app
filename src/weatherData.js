async function getWeatherData(location = "London") {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=J9ZSVTFNZX3VEFD6AFYSHA7WQ`;

    const response = await fetch(url);
    const weatherData = await response.json();

    console.log(weatherData);
    console.log(weatherData.currentConditions);

    return weatherData;
}

async function createWeatherDataObj(place) {
    const data = await getWeatherData(place);

    const weatherObj = {
        place: data.address,
        description: data.description,
        conditions: data.currentConditions.conditions,
        temperature: data.currentConditions.temp,
        humidity: data.currentConditions.humidity,
        precipitation: data.currentConditions.precipprob,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        windSpeed: data.currentConditions.windspeed,
        uvIndex: data.currentConditions.uvindex
    }

    return weatherObj;
}

export { createWeatherDataObj }