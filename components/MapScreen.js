import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { AppConsumer } from './AppContext';
import exampleIcon from '../components/res/star_gold.png';

const IS_ANDROID = Platform.OS === 'android';

MapboxGL.setAccessToken("pk.eyJ1IjoiaGFya29yIiwiYSI6ImNqdXdmd3ZydzBjMjY0ZXBwdmE3NnY2YTUifQ.O39Bv04lF2P8vZiFgU1ElQ");
class MapScreen extends PureComponent {
    render() {
        return (
            <AppConsumer>
                {({ mainCity }) => {
                    if (mainCity == 'null') {
                        return null;
                    }
                    return (
                        <View style={{ flex: 1 }}>
                            <MapboxGL.MapView
                                ref={(c) => this._map = c}
                                style={{ flex: 1 }}
                                zoomLevel={10}
                                centerCoordinate={[mainCity.longitude, mainCity.latitude]}>

                                <MapboxGL.ShapeSource
                                    id="exampleShapeSource"
                                    shape={{
                                        type: 'FeatureCollection',
                                        features: [
                                            {
                                                type: 'Feature',
                                                id: 'mianCity',
                                                properties: {
                                                    icon: 'example',
                                                },
                                                geometry: {
                                                    type: 'Point',
                                                    coordinates: [mainCity.longitude, mainCity.latitude],
                                                },
                                            },
                                        ],
                                    }}
                                    images={{ example: exampleIcon, assets: ['pin'] }}
                                >
                                    <MapboxGL.SymbolLayer id="exampleIconName" style={styles.icon} />
                                </MapboxGL.ShapeSource>
                            </MapboxGL.MapView>
                        </View>
                    )
                }}

            </AppConsumer>
        )
    }
}

const styles = MapboxGL.StyleSheet.create({
    icon: {
        iconImage: '{icon}',
        iconSize: MapboxGL.StyleSheet.source(
            [['example', IS_ANDROID ? 1 : 0.5], ['airport-15', 1.2]],
            'icon',
            MapboxGL.InterpolationMode.Categorical,
        ),
    },
});

export default MapScreen;