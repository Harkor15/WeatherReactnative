const Realm = require('realm');

const CitySchama = {
    name: 'City',
    properties: {
        city: 'string',
        longitude: 'double',
        latitude: 'double',
        mainCityFlag: 'bool'
    }
}

const SettingsSchema = {
    name: 'Settings',
    properties: {
        temperatureUnit: 'string'
    }
}

export default class RealmDB {
    
    static getMainCity = (saveMainCityToState, showAddCityDialog) => {
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                let cityDB = realm.objects('City').filtered('mainCityFlag = true');
                if (cityDB.length > 0) {
                    let newMainCity = JSON.parse(JSON.stringify(cityDB[0]));
                    saveMainCityToState(newMainCity);
                    console.log("Result mainCity from DB", cityDB[0]);
                } else {
                    showAddCityDialog();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    static addNewCity(newCity) {
        Realm.open({ scheama: [CitySchama, SettingsSchema] })
            .then(realm => {
                realm.write(
                    () => {
                        let toSave = { ...newCity, ...{ mainCityFlag: false } };
                        const myCity = realm.create('City', toSave);
                    }
                )
            })
    }

    static addCityIfNotExist(newCity, newCityAdded) {
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                let cityDB = realm.objects('City').filtered('city=$0', newCity.city);
                if (cityDB.length > 0) {
                    let duplicate = false;
                    for (let i = 0; i < cityDB.length; i++) {
                        let latDiff = cityDB[i].latitude - newCity.latitude;
                        let lonDiff = cityDB[i].longitude - newCity.longitude;
                        if (latDiff < 0.05 && latDiff > -0.05 && lonDiff < 0.05 && lonDiff > -0.05) {
                            duplicate = true;
                        }
                    }
                    if (duplicate == false) {
                        let flag = true;
                        this.addNewCity(newCity);
                        newCityAdded(flag);
                    } else {
                        let flag = false
                        newCityAdded(flag);
                    }
                } else {
                    let flag = true;
                    this.addNewCity(newCity);
                    newCityAdded(flag);
                }
            })
    }

    static setMainCity = (item, getFavouriteCities) => {
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                realm.write(() => {
                    let realmDB = realm.objects('City');
                    for (let i = 0; i < realmDB.length; i++) {
                        if (realmDB[i].city == item.city && realmDB[i].longitude == item.longitude && realmDB[i].latitude == item.latitude) {
                            realmDB[i].mainCityFlag = true;
                        } else {
                            realmDB[i].mainCityFlag = false;
                        }
                    }
                })
            })
            .catch(error => {
                console.log(error);
            }); 
        getFavouriteCities();
    }

    static setTemperatureUnit = (newTemperatureUnit, saveTemperatureUnitToState) => {
        let defaultSettings = {
            temperatureUnit: 'C',
        }
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                realm.write(() => {
                    let settings = realm.objects('Settings')
                    realm.delete(settings);
                    if (settings.length > 0) {
                        defaultSettings = Object.assign(defaultSettings, settings[0]);
                        console.log("defaultSettings:", defaultSettings)
                    }
                    defaultSettings.temperatureUnit = newTemperatureUnit;
                    console.log("defaultSettings:", defaultSettings)
                    realm.create('Settings', defaultSettings);
                    saveTemperatureUnitToState(newTemperatureUnit);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    static getTemperatureUnit = (saveTemperatureUnitToState) => {
        let defaultSettings = {
            temperatureUnit: 'C',
        }
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                let realmDB = realm.objects('Settings');
                if (realmDB.length > 0) {
                    defaultSettings.temperatureUnit = realmDB[0].temperatureUnit;
                }
                saveTemperatureUnitToState(defaultSettings.temperatureUnit)
            })
            .catch(error => {
                console.log(error);
            });
    }

    static getFavouritueCities = (setNewFavouriteCities) => {
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                let realmDB = realm.objects('City');
                if (realmDB.length > 0) {
                    let favouriteList = [];
                    
                    for (let i = 0; i < realmDB.length; i++) {
                        let key="key"+i;
                        favouriteList.push({
                            key:key,
                            city: realmDB[i].city,
                            longitude: realmDB[i].longitude,
                            latitude: realmDB[i].latitude,
                            mainCityFlag: realmDB[i].mainCityFlag,
                        })
                    }
                    setNewFavouriteCities(favouriteList)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    static deleteCity(item, getFavouriteCities) {
        Realm.open({ schema: [CitySchama, SettingsSchema] })
            .then(realm => {
                realm.write(() => {
                    let realmDB = realm.objects('City').filtered('city=$0 AND longitude=$1 AND latitude=$2', item.city, item.longitude, item.latitude);
                    realm.delete(realmDB);
                });
            })
            .catch(error => {
                console.log(error);
            });
        getFavouriteCities();
    }

}
