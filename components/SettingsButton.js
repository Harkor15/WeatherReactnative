import { Image, TouchableOpacity } from 'react-native';
import React, {PureComponent}from 'react';

class SettingsButton extends PureComponent{
    render(){
        return(
            <view>
                <TouchableOpacity> 
                    <Image source={require('./res/thunderstorm.png')} style={{width:50,height:50}}/>
                </TouchableOpacity>
            </view>
        )
    }
}
export default SettingsButton;