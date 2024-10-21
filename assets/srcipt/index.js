var popularCities = ['New Delhi' , 'Paris', 'London', 'New York'];

function loadPopularCities(){
    popularCities.forEach(async(city)=>{
        const sideBar = document.querySelector("#commonCities");
        var data = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0d217eb3844fedd0cab62a1f5a493874`);
        var dataJson = await data.json();
        console.log(dataJson);
        var outerBox = document.createElement('div');
        outerBox.setAttribute('id','outerBox');
        outerBox.addEventListener('click',()=>{
            document.querySelector('#inputHolder').value=city;
            loadMainArea();
        });
        
        var headerBox = document.createElement('div');
        headerBox.setAttribute('id','headerBox');

        var weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src',`assets/images/${dataJson.weather[0].main}.png`);
        headerBox.appendChild(weatherIcon);

        var cityName = document.createElement('h1');
        cityName.innerText = dataJson.name;
        headerBox.appendChild(cityName);
        
        var temp = document.createElement('h2');
        temp.innerText = Math.round(dataJson.main.temp)+" °C";
        headerBox.appendChild(temp);
        
        var innerbox = document.createElement('div');
        innerbox.setAttribute('id','innerBox');
        
        var minTemp = document.createElement('p');
        minTemp.innerText="Min Temp : "+Math.round(dataJson.main.temp_min)+ " °C";
        innerbox.appendChild(minTemp);

        var maxTemp = document.createElement('p');
        maxTemp.innerText="Max Temp : "+ Math.round(dataJson.main.temp_max)+ " °C";
        innerbox.appendChild(maxTemp);

        var humidity = document.createElement('p');
        humidity.innerText="Humidity : "+Math.round(dataJson.main.humidity)+ " %";
        innerbox.appendChild(humidity);

        var windSpeed = document.createElement('p');
        windSpeed.innerText="Wind Speed : "+Math.round(dataJson.wind.speed)+ " kmph";
        innerbox.appendChild(windSpeed);
        

        outerBox.appendChild(headerBox);
        outerBox.appendChild(innerbox);
        sideBar.appendChild(outerBox);

    });
}


async function loadMainArea() {
    var currentCity = document.querySelector("#currentCity");
    currentCity.innerHTML='';

    var currentWeather = document.createElement('div');
    currentWeather.setAttribute('id','upperDiv');

    var city = (document.querySelector("#inputHolder").value);
    document.querySelector("#inputHolder").value='';
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=ef13fefba849482297764456242110&q=${city}&aqi=yes`)
    const dataJson = await data.json();
    console.log(dataJson);

    const cityName = document.createElement('h1');
    cityName.innerText=dataJson.location.name+', '+dataJson.location.region +', '+dataJson.location.country;
    currentWeather.appendChild(cityName);

    const innerBox = document.createElement('div');
    innerBox.setAttribute('id','currentWeatherInnerBox');


    // inner partition divs
    const leftInnerBox = document.createElement('div');
    leftInnerBox.setAttribute('id','leftInnerBox');

    const weatherIcon = document.createElement('img'); 
    weatherIcon.setAttribute('src',`${dataJson.current.condition.icon}`);
    leftInnerBox.appendChild(weatherIcon);

    const temp = document.createElement('h2');
    temp.innerHTML = dataJson.current.temp_c+"°C";
    leftInnerBox.appendChild(temp);

    const feelsLike = document.createElement('p');
    feelsLike.innerText= "Feels like - "+ dataJson.current.feelslike_c+" °C";
    leftInnerBox.appendChild(feelsLike);

    const rightInnerBox = document.createElement('div');
    rightInnerBox.setAttribute('id','rightInnerBox');

    const condition = document.createElement('h2');
    condition.innerText = "Condition : "+dataJson.current.condition.text;
    rightInnerBox.appendChild(condition);

    const humidity = document.createElement('p');
    humidity.innerText = "Humidity : "+ dataJson.current.humidity + "%";
    rightInnerBox.appendChild(humidity); 
    
    const precipitaion = document.createElement('p');
    precipitaion.innerText = "Precipitaion : "+ dataJson.current.precip_in + " in";
    rightInnerBox.appendChild(precipitaion); 

    const uv = document.createElement('p');
    uv.innerText = "UV Index : "+ dataJson.current.uv;
    rightInnerBox.appendChild(uv); 

    const visibility = document.createElement('p');
    visibility.innerText = "Visibility : "+ dataJson.current.vis_km + " km";
    rightInnerBox.appendChild(visibility); 

    const wind = document.createElement('h3');
    wind.innerText = "Wind :";
    rightInnerBox.appendChild(wind); 

    const windSpeed = document.createElement('p');
    windSpeed.innerText = "Wind Speed : "+ dataJson.current.wind_kph + " kph";
    rightInnerBox.appendChild(windSpeed); 

    const windDirection = document.createElement('p');
    windDirection.innerText = "Wind Direction : "+ dataJson.current.wind_dir ;
    rightInnerBox.appendChild(windDirection); 

    const windDegree = document.createElement('p');
    windDegree.innerText = "Wind Degree : "+ dataJson.current.wind_degree + "°";
    rightInnerBox.appendChild(windDegree); 

    innerBox.appendChild(leftInnerBox);
    innerBox.appendChild(rightInnerBox);

    currentWeather.appendChild(innerBox);
    currentCity.appendChild(currentWeather);

    // ForeCast
    const forecast = await fetch('http://api.weatherapi.com/v1/forecast.json?key=ef13fefba849482297764456242110&q=London&days=5&aqi=no&alerts=no');
    const forecastJson = await forecast.json();
    console.log(forecastJson);

    const forecastWeather = document.createElement('div');
    forecastWeather.setAttribute('id','forecastOuterBox');
    currentCity.appendChild(forecastWeather);

    const heading = document.createElement('h2');
    heading.innerText = "5 Days Forecast";
    forecastWeather.appendChild(heading);

    const outerForecastBox = document.createElement('div');
    outerForecastBox.setAttribute('id',"outerForecastBox");
    forecastWeather.appendChild(outerForecastBox);

    const forecastArray = await forecastJson.forecast.forecastday;
    await forecastArray.forEach((nextDay)=>{
        const innerBox = document.createElement('div');
        innerBox.setAttribute('id','forecastInnerBox');
        outerForecastBox.appendChild(innerBox);

        const date = document.createElement('h2');
        date.innerText = nextDay.date;
        innerBox.appendChild(date);

        const weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src',nextDay.day.condition.icon);
        innerBox.appendChild(weatherIcon);

        const temp = document.createElement('h2');
        temp.innerText = nextDay.day.avgtemp_c+" °C";
        innerBox.appendChild(temp);

        const humidity = document.createElement('p');
        humidity.innerText = "Humidity : " + nextDay.day.avghumidity+ "%";
        innerBox.appendChild(humidity);

        const visibility = document.createElement('p');
        visibility.innerText = "Visibility : " + nextDay.day.avgvis_km+ " km";
        innerBox.appendChild(visibility);

        const rainChances = document.createElement('p');
        rainChances.innerText = "Rain chances : " + nextDay.day.daily_chance_of_rain+ "%";
        innerBox.appendChild(rainChances);

        const windSpeed = document.createElement('p');
        windSpeed.innerText = "Wind Speed : " + nextDay.day.maxwind_kph+ " km";
        innerBox.appendChild(windSpeed);
        
    });

}

var searchButton = document.querySelector("#searchButton");
searchButton.addEventListener('click',loadMainArea);


loadPopularCities();

document.querySelector('#locator').addEventListener('click',async()=>{
    navigator.geolocation.getCurrentPosition(showPosition);

    async function showPosition(position){
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat, lon);

        var data = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0d217eb3844fedd0cab62a1f5a493874`);
        var dataJson = await data.json();
        document.querySelector('#inputHolder').value = dataJson.name;
        await loadMainArea();
}
});