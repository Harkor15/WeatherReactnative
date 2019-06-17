import React, { PureComponent } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { AppConsumer } from './AppContext';


class ForecastScreen extends PureComponent {

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

    render() {
        return (
            <AppConsumer>
                {({ temperatureUnit,forecastObject }) => {
                    if(forecastObject==null){
                        return null;
                    }
                    return (
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={{ flex: 1 }} data={forecastObject.weatherList}
                                    renderItem={({ item }) =>
                                    <View style={{ width: '100%', borderBottomWidth: 3, borderColor: 'red' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: "flex-start" }}>
                                                {this.generateWeatherIcon(item.main)}
                                            </View>
                                            <View style={{ flex: 1, justifyContent: "center" }}>
                                                <Text> Temperature {this.calculateTemperatureUnit(item.temp, temperatureUnit)}</Text>
                                                <Text> Clouds {item.clouds} %</Text>
                                                <Text> Pressure {item.pressure} hPa</Text>
                                                <Text> Humidity {item.humidity} %</Text>
                                                <Text> Wind {item.wind} m/s</Text>
                                                <Text> Time {item.timeText}</Text>
                                            </View>
                                        </View>
                                    </View>}
                            />
                        </View>
                    )
                }}
            </AppConsumer>
        )
    }
}

const styles = {
    iconStyles: {
        height: 150,
        width: 150,
    }

}

export default ForecastScreen;