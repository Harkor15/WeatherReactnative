import React, { Component } from 'react';
import { Alert } from 'react-native';
import RealmDB from './services/RealmDB'
import AxiosController from './services/AxiosController';

const defaults = {
  currentWeather: null,
  temperatureUnit: 'C',
  mainCity: "null",
  favouriteCitys: null,
  weatherData: {
    main: "---",
    main: "---",
    temp: "---",
    pressure: "---",
    humidity: "---",
    wind: "---",
    clouds: "---",
  },
  forecastObject: null
};

const AppContext = React.createContext({
  getWeather: () => null,
  getTemperatureUnit: () => null,
  setTemperatureUnit: () => null,
  addCityToFavourites: () => null,
  getMainCity: () => null,
  setMainCity: () => null,
  updateCity: () => null,
  ...defaults
});

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {

  componentDidMount() {
    this.getTemperatureUnit();
    this.getMainCity(this.saveMainCityToState);
  }
  state = defaults;

  saveMainCityToState = (newMainCity) => {
    this.setState({ mainCity: newMainCity });
    AxiosController.getCurrentWeather(newMainCity.longitude, newMainCity.latitude, this.setWeatherData);
    AxiosController.getForecast(newMainCity.longitude, newMainCity.latitude, this.setForecastData)
  }

  setForecastData = (forecastObject) => {
    this.setState({ forecastObject })
  }

  showAddCityDialog = () => {
    Alert.alert("No citys in database", "Add city from GPS?",
      [{ text: 'OK', onPress: () => this.searchGeolocation() },
      { text: 'Cancel', onPress: () => console.log("Cancel pressed") }])
  }

  setWeatherData = (weatherData) => {
    this.setState({ weatherData });
  }

  searchGeolocation = () => {
    console.log("search geolocation")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(error.message),
      { enableHighAccurancy: false, timeout: 20000, maximumAge: 10000 }
    )
  }

  updateCity = (city) => {
    this.setState({ mainCity: city });
    AxiosController.getCurrentWeather(city.longitude, city.latitude, this.setWeatherData);
    AxiosController.getForecast(city.longitude, city.latitude, this.setForecastData)
  }

  saveTemperatureUnitToState = (newTemperatureUnit) => {
    this.setState({
      temperatureUnit: newTemperatureUnit
    })
  }

  getTemperatureUnit = () => {
    RealmDB.getTemperatureUnit(this.saveTemperatureUnitToState)
  }

  setTemperatureUnit = (newTemperatureUnit) => {
    RealmDB.setTemperatureUnit(newTemperatureUnit, this.saveTemperatureUnitToState);
  }

  getMainCity = () => {
    RealmDB.getMainCity(this.saveMainCityToState, this.showAddCityDialog)
  }

  setMainCity = (newMainCity) => {
    let mainCity = RealmDB.setMainCity(newMainCity, this.saveMainCityToState);
    if (mainCity != null) {
      this.setState({
        mainCity: newMainCity
      })
    }
  }

  render() {
    return (
      <AppContext.Provider value={{
        currentWeather: this.state.currentWeather,
        getWeather: this.getWeather,
        getTemperatureUnit: this.getTemperatureUnit,
        setTemperatureUnit: this.setTemperatureUnit,
        addCityToFavourites: this.addCityToFavourites,
        temperatureUnit: this.state.temperatureUnit,
        mainCity: this.state.mainCity,
        getMainCity: this.getMainCity,
        setMainCity: this.setMainCity,
        weatherData: this.state.weatherData,
        updateCity: this.updateCity,
        forecastObject: this.state.forecastObject,
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
