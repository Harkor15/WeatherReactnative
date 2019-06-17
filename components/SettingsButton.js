import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { PureComponent } from 'react';

class SettingsButton extends PureComponent {
    render() {
        return (
            <view>
                <TouchableOpacity>
                    <Image source={require('./res/thunderstorm.png')} style={styles.imageStyle} />
                </TouchableOpacity>
            </view>
        )
    }
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 50,
        height: 50
    }
})
export default SettingsButton;