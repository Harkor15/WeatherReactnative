
import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import MapScreen from './components/MapScreen'
import ForecastScreen from './components/ForecastScreen'
import CurrentWeather from './components/CurrentWeather';
import SettingsScreen from './components/SettingsScreen';
import {AppProvider} from './components/AppContext';

export default class App extends Component {
  title = "Miasto Rzeszów"
  render() {
    return (
      <AppProvider>
        <Router>
          <Scene key="root" tabs>
            <Scene key="screen1" component={CurrentWeather} title="Current" hideNavBar />
            <Scene key="screen2" component={ForecastScreen} title="Forecast" hideNavBar />
            <Scene key="screen3" component={MapScreen} title="Map" hideNavBar />
            <Scene key="settings" component={SettingsScreen} title="Settings" hideNavBar />
          </Scene>

        </Router>
      </AppProvider>
    );
  }
}
