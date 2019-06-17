import { View, Text, Picker, TextInput, TouchableOpacity, FlatList, ToastAndroid, Image } from 'react-native';
import React, { PureComponent } from 'react';
import { AppConsumer } from './AppContext';
import RealmDB from './services/RealmDB';
import AxiosController from './services/AxiosController';





class SettingsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            temperatureUnit: null,
            text: '',
            favouriteCities: null
        };
    }

    componentDidMount() {
        this.getFavouriteCities();
    }

    updateCity = () => { };

    onAddToFavorites = () => {

        if (this.state.text != '') {
            AxiosController.addNewCityFromName(this.state.text.trim(), this.setNewCitiesList)
        }
    }

    setNewCitiesList = (geocodingResponse) => {
        if (geocodingResponse.placesList.length == 0) {
            ToastAndroid.show('City not found', ToastAndroid.SHORT);
        }else {
            let newCity = {
                city: geocodingResponse.placesList[0].name,
                longitude: parseFloat(geocodingResponse.placesList[0].lon),
                latitude: parseFloat(geocodingResponse.placesList[0].lat),
            }
            RealmDB.addCityIfNotExist(newCity, this.newCityAdded);
        }
    }

    newCityAdded = (flag) => {
        if (flag == false) {
            ToastAndroid.show("City not added", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("City added", ToastAndroid.SHORT);
            this.getFavouriteCities();
        }
    }

    getFavouriteCities = () => {
        RealmDB.getFavouritueCities(this.setNewFavouriteCities);
    }

    setNewFavouriteCities = (newFavouriteCities) => {
        this.setState({ favouriteCities: newFavouriteCities })
    }

    deleteFromFavouriteCities = (item) => {
        if(this.state.favouriteCities.length<2){
            ToastAndroid.show("Add another city first", ToastAndroid.SHORT);
        }else{
            RealmDB.deleteCity(item, this.getFavouriteCities)
        }
        
    }

    setMainCity = (item) => {
        RealmDB.setMainCity(item, this.getFavouriteCities);
        this.updateCity(item);
    }

    getMainIcon = (mainFlag) => {
        if (mainFlag) {
            return <Image style={styles.starIcon} source={require('./res/star_gold.png')} />
        } else {
            return <Image style={styles.starIcon} source={require('./res/star_black.png')} />
        }
    }

    render() {
        return (
            <AppConsumer>
                {({ temperatureUnit, getTemperatureUnit, setTemperatureUnit, updateCity }) => {
                    this.getTemperatureUnit = getTemperatureUnit;
                    this.updateCity = updateCity;
                    console.log(this.state.favouriteCities, "favouriteCities");
                    return (
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 25, textAlign: "center", marginBottom: 5 }}>Settings</Text>
                            <View style={styles.rowStyle}>
                                <Text style={styles.textStyle}>Temperature unit:</Text>
                                <Picker selectedValue={temperatureUnit}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTemperatureUnit(itemValue)}
                                    style={{ height: 50, width: 100, marginLeft: 5 }}>
                                    <Picker.Item label="C" value='C' />
                                    <Picker.Item label="K" value='K' />
                                    <Picker.Item label="F" value='F' />
                                </Picker>
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.textStyle}>Add city to favourites:</Text>
                                <TextInput style={{ width: 100 }} placeholder="New city"
                                    onChangeText={(text) => this.setState({ text })} />
                                <TouchableOpacity
                                    style={{
                                        padding: 5, borderWidth: 3, borderColor: 'darkGreen',
                                        borderRadius: 5, backgroundColor: 'green'
                                    }}
                                    onPress={this.onAddToFavorites}>
                                    <Text style={{ color: 'white' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 22 }}>Favourites</Text>

                            </View>
                            <FlatList
                                data={this.state.favouriteCities}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            flexDirection: 'row', margin: 3, fontSize: 20, padding: 5,
                                            borderColor: 'darkGreen', borderWidth: 3, borderRadius: 5
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    flex: 1, flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}
                                                onPress={() => this.setMainCity(item)}>
                                                <Text style={{}}>{item.city}</Text>
                                                {this.getMainIcon(item.mainCityFlag)}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ alignItems: 'center', flex: 0.15 }}
                                                onPress={() => this.deleteFromFavouriteCities(item)}>
                                                <Text style={{ color: 'red' }}> X </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    );
                }}
            </AppConsumer>
        );
    }
}

const styles = {
    textStyle: {
        marginLeft: 5,
        fontSize: 20
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    starIcon: {
        height: 20,
        width: 20
    }
}

export default SettingsScreen;