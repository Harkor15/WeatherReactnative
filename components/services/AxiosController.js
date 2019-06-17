const axios = require('axios');


export default class AxiosController {
    static getCityInfo(lon, lat) {

    }
    static getCityInfo(cityName) {

    }
    static getCurrentWeather = async (lon, lat, setWeatherData) => {

        axios.post(
            'https://api.openweathermap.org/data/2.5/weather?appid=73ce5a6d43a2c4278462796311770958&lat=' + lat + '&lon=' + lon)
            .then(function (response) {
                console.log("R-E-S-P-O-N-S-E", response)

                let weatherObject = {
                    main: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    pressure: response.data.main.pressure,
                    humidity: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    clouds: response.data.clouds.all,

                }
                setWeatherData(weatherObject);
                console.log("Data from response",weatherObject)
            }
            )
            .catch(function (error) {
                console.log('E-R-R-O-R', error)
            })
    }

    static getForecast = async (lon, lat, setForecastData) => {
        axios.post(
            'https://api.openweathermap.org/data/2.5/forecast?appid=73ce5a6d43a2c4278462796311770958&lat=' + lat + '&lon=' + lon)
            .then(function (response) {

                let forecastObject = {
                    weatherList: []
                }
                for (let i = 0; i < 40; i++) {
                    let subTime = response.data.list[i].dt_txt;
                    subTime = subTime.substring(0, 16);
                    
                    let key="key"+i;
                    
                    forecastObject.weatherList.push({
                        key: key,
                        temp: response.data.list[i].main.temp,
                        pressure: response.data.list[i].main.pressure,
                        humidity: response.data.list[i].main.humidity,
                        main: response.data.list[i].weather[0].main,
                        description: response.data.list[i].weather[0].description,
                        clouds: response.data.list[i].clouds.all,
                        wind: response.data.list[i].wind.speed,
                        timeText: subTime,
                    })
                }
                setForecastData(forecastObject);
                //console.log("R_E_S_P_O_N_S_E", forecastObject)
            })
            .catch(function (error) {
                console.log('E_R_R_O_R', error)
            })
    }
    
    static addNewCityFromName = async (name,setNewCitysList)=> {
        axios.post(`https://nominatim.openstreetmap.org/search?format=json&city=${name}`)
            .then(function (response) {
                let responseArray=response.data.length;
                let geocodingResponse = {
                    placesList: []
                }
                for (let i = 0; i < response.data.length; i++) {
                    geocodingResponse.placesList.push({
                        name: name,
                        description: response.data[i].display_name,
                        lat: response.data[i].lat,
                        lon: response.data[i].lon,
                    })
                }
                setNewCitysList(geocodingResponse)
                
            })
            .catch(function (error) {
                console.log('E-R-R-O-R', error)
            })
    }
}
