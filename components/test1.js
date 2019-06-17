import React, { PureComponent } from 'react';
import { Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux'

class Test1 extends PureComponent{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topBar}> 
                    <Text style={{fontSize:20}}>Miasto: Rzeszów</Text>
                </View>
        <View style={styles.tabHost}>
          <View style={styles.tabsList}>
            <Text style={styles.tabItem}>Tab1</Text>
            <Text style={styles.tabItem}>Tab2</Text>
            <Text style={styles.tabItem}>Tab3</Text>          
          </View>

          <TouchableOpacity onPress={()=>{Actions.screen2()}}  style={{backgroundColor:'lightblue'}}> 
          <Text>asdfasdfasd</Text>
          </TouchableOpacity>
          <Text>TabHost</Text>
        </View> 
      </View>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF0000',
    },
    topBar: {
      width:'100%',
      justifyContent:'flex-start',
      textAlign: 'left',
      flex:1,
      backgroundColor:"#00FF00",
    },
    tabHost: {
      textAlign: 'center',
      color: '#333333',
      flex:18,  
    },
    tabsList:{
      justifyContent: 'space-around',
      flex:1,
      width:'100%',
      flexDirection:'row',
    },
    tabItem:{
      flex:1,
      backgroundColor:'skyblue',
    },
  });
  
export default Test1;