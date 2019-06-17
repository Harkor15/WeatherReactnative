import React, { PureComponent } from 'react';
import { Text, Image, View, TouchableOpacity, Alert, Context } from 'react-native';
import { AppConsumer } from './AppContext';






class CurrentWeather extends PureComponent {

    calculateTemperatureUnit = (temp, temperatureUnit) => {
        if (temp == "---") {
            return ("---");
        }
        switch (temperatureUnit) {
            case 'K':
                return (temp + "K");
            case 'C':
                let temperatureC = temp - 273.15;
                temperatureC = Math.round(temperatureC);
                return (temperatureC + "°C");
            case "F":
                let temperatureK = (temp * 1.8) - 459.67;
                temperatureK = Math.round(temperatureK);
                return (temperatureK + "°F");
            default:
                return ("---")
        }
    }

    generateWeatherIcon(weatherMain) {
        switch (weatherMain) {
            case '---':
                return <Image source={require('./res/empty.png')} style={styles.iconStyles} />
            case 'Thunderstorm':
                return <Image source={require('./res/thunderstorm.png')} style={styles.iconStyles} />
            case 'Drizzle':
                return <Image source={require('./res/rain.png')} style={styles.iconStyles} />
            case 'Rain':
                return <Image source={require('./res/rain.png')} style={styles.iconStyles} />
            case 'Snow':
                return <Image source={require('./res/snow.png')} style={styles.iconStyles} />
            case 'Clear':
                return <Image source={require('./res/clear.png')} style={styles.iconStyles} />
            case 'Clouds':
                return <Image source={require('./res/clouds.png')} style={styles.iconStyles} />
            default:
                return <Image source={require('./res/atmosphere.png')} style={styles.iconStyles} />

        }
    }

    render() {
        return (
            <AppConsumer>
                {({ mainCity, temperatureUnit, weatherData }) => {
                    return (
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.cityNameStyles}>City: {mainCity.city}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                {this.generateWeatherIcon(weatherData.main)}
                                <Text style={{ fontSize: 20, textAlign: 'right' }}>
                                    Temperature: {this.calculateTemperatureUnit(weatherData.temp, temperatureUnit)}
                                </Text>
                                <Text style={styles.textStyles}>Clouds: {weatherData.clouds} %</Text>
                                <Text style={styles.textStyles}>Pressure: {weatherData.pressure} hPa</Text>
                                <Text style={styles.textStyles}>Humidity: {weatherData.humidity} %</Text>
                                <Text style={styles.textStyles}>Wind: {weatherData.wind} m/s</Text>
                            </View>
                        </View>
                    )
                }}
            </AppConsumer>
        )
    }
}

const styles = {
    textStyles: {
        fontSize: 20
    },
    cityNameStyles: {
        fontSize: 26,
        marginLeft: 10,
    },
    iconStyles: {
        height: 300,
        width: 300,
    }

}
export default CurrentWeather;




