import { Image, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
const MyContext = React.createContext()

class CurrentWeatherComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = props.context;
    }

    render() {
        return (
            <View>
                <Image source={require('./res/clear.png')} style={styles.imageStyle} />
                <MyContext.Consumer>
                    {weather => <Text style={styles.temperatureText}>{weather.temperature}</Text>}
                </MyContext.Consumer>
                <MyContext.Consumer>
                    {weather => <Text style={styles.textStyles}>{weather.clouds}</Text>}
                </MyContext.Consumer>
                <MyContext.Consumer>
                    {weather => <Text style={styles.textStyles}>{weather.pressure}</Text>}
                </MyContext.Consumer>
                <MyContext.Consumer>
                    {weather => <Text style={styles.textStyles}>{weather.humidity}</Text>}
                </MyContext.Consumer>
                <MyContext.Consumer>
                    {weather => <Text style={styles.textStyles}>{weather.wind}</Text>}
                </MyContext.Consumer>
            </View>
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
    temperatureText: {
        fontSize: 20,
        textAlign: 'right'
    },
    imageStyle: {
        width: 300,
        height: 300
    }
}

export default CurrentWeatherComponent;